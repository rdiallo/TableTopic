🎙️ Toastmasters - Table Topics Master & Live Voting

Application web interactive pour animer les sessions d'improvisation (Table Topics) Toastmasters en projection grand écran, avec système de vote en direct par QR Code pour le public.

📁 Contenu du dépôt

index.html : Application web complète prête à l'emploi (aucun build nécessaire).

README.md : Guide d'utilisation et de déploiement.

🚀 Guide de mise en ligne sur GitHub (rdiallo)

Méthode 1 : Directement dans le navigateur (Sans terminal)

Rendez-vous sur github.com/new.

Nommez le dépôt toastmasters-table-topics (laissez en Public et cliquez sur Create repository).

Cliquez sur « creating a new file » :

Nom : index.html

Collez le code de index.html

Cliquez sur Commit changes...

Répétez l'opération pour README.md.

Méthode 2 : En ligne de commande (Terminal)

Placez les fichiers index.html et README.md dans un dossier local, puis lancez :

# 1. Initialiser le dépôt local
git init

# 2. Ajouter les fichiers
git add index.html README.md

# 3. Créer le premier commit
git commit -m "feat: Table Topics presenter app with live QR code voting"

# 4. Branche main
git branch -M main

# 5. Connecter à votre dépôt GitHub
git remote add origin https://github.com/rdiallo/toastmasters-table-topics.git

# 6. Pousser vers GitHub
git push -u origin main


⚡ Déploiement gratuit en 1 clic sur Vercel

Rendez-vous sur vercel.com et connectez-vous avec votre compte GitHub rdiallo.

Cliquez sur Add New... > Project.

Importez le projet toastmasters-table-topics.

Laissez tous les paramètres par défaut et cliquez sur Deploy.

Votre application sera instantanément accessible via une URL du type :
👉 https://toastmasters-table-topics.vercel.app

🎯 Fonctionnalités clés

Format 16:9 sans défilement (Zero-scroll) : 6 cartes mystères visibles simultanément sur le vidéoprojecteur.

Support bilingue instantané : Basculez à tout moment entre Anglais (EN) et Français (FR).

Chronomètre Toastmasters officiel : Vert à 1:00, Jaune à 1:30, Rouge à 2:00 (grâce à 2:30).

Mode Éditeur & Verrouillage : Personnalisez le thème et les 6 cartes avant la séance.

Vote interactif par QR Code :

Projetez le QR Code en fin de séance.

Le public scanne et vote en direct depuis son smartphone.

Bouton « Révéler le Vainqueur 🏆 » avec lancer de confettis.

Export Google Form : Bouton pour copier les noms dans l'ordre et éditer votre formulaire existant.

Nettoyage de séance : Réinitialise les orateurs pour la prochaine réunion tout en conservant les sujets.
