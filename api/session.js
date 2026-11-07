// Vercel Serverless Function - Gestion des sessions Table Topics avec Upstash Redis
// Expiration automatique après 7 jours (604 800 secondes)
const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;

export default async function handler(req, res) {
  // En-têtes CORS pour autoriser les requêtes client
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérification des variables d'environnement Upstash KV de Vercel
  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(503).json({
      error: 'Upstash Redis non configuré sur Vercel. Variables KV_REST_API_URL et KV_REST_API_TOKEN manquantes.',
      fallback: true
    });
  }

  const redisFetch = async (command, ...args) => {
    const url = `${redisUrl}/${command}/${args.map(a => encodeURIComponent(typeof a === 'object' ? JSON.stringify(a) : a)).join('/')}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${redisToken}`
      }
    });
    return response.json();
  };

  const sanitizeRoom = (str) => {
    return (str || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const room = sanitizeRoom(req.query.room || (req.body && req.body.room));
  if (!room || room.length < 3) {
    return res.status(400).json({ error: 'Nom de session invalide (au moins 3 caractères alphanumériques).' });
  }

  const redisKey = `tm_session:${room}`;

  try {
    // 1. GET : Récupérer la session par son nom unique
    if (req.method === 'GET') {
      const data = await redisFetch('get', redisKey);
      if (!data || !data.result) {
        return res.status(404).json({ exists: false, message: 'Session introuvable ou expirée.' });
      }
      
      let parsed = data.result;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch (e) {}
      }
      
      return res.status(200).json({ exists: true, room, data: parsed });
    }

    // 2. POST : Sauvegarder avec TTL de 7 jours (EX 604800)
    if (req.method === 'POST') {
      const payload = req.body;
      if (!payload || !payload.data) {
        return res.status(400).json({ error: 'Données de session manquantes dans le corps de la requête.' });
      }

      // SET key value EX 604800
      const saveRes = await redisFetch('set', redisKey, JSON.stringify(payload.data), 'EX', SEVEN_DAYS_SECONDS);
      
      return res.status(200).json({
        success: true,
        room,
        ttlDays: 7,
        result: saveRes
      });
    }

    // 3. DELETE : Clore et supprimer la session
    if (req.method === 'DELETE') {
      const delRes = await redisFetch('del', redisKey);
      return res.status(200).json({
        success: true,
        room,
        deleted: delRes.result > 0
      });
    }

    return res.status(405).json({ error: 'Méthode non autorisée.' });
  } catch (error) {
    console.error('Erreur Redis API:', error);
    return res.status(500).json({ error: 'Erreur interne lors de la communication avec Redis.', details: error.message });
  }
}