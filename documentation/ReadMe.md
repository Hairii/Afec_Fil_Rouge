# GameFinder 🎮

Application web de découverte et notation de jeux vidéo.
Les utilisateurs peuvent parcourir un catalogue de jeux, les noter, laisser des commentaires et signaler du contenu inapproprié.
Les administrateurs disposent d'un tableau de bord de gestion.

## Prérequis

- Node.js v18+
- MySQL 8+
- npm

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/Hairii/Afec_Fil_Rouge.git
cd gamefinder
```

2. Installez les dépendances backend :
```bash
cd backend
npm install
```

3. Configurez les variables d'environnement — créez un fichier `.env` dans `/backend` :
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gamefinder
JWT_SECRET=votre_secret_jwt
JWT_REFRESH_SECRET=votre_secret_refresh
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

4. Importez la base de données :
```bash
mysql -u root -p gamefinder < bdd/gamefinder.sql
```

5. Lancez le serveur :
```bash
npm run dev
```

6. Ouvrez le navigateur sur `http://localhost:3000`

## Technologies utilisées

**Backend**
- Node.js / Express
- MySQL + pool de connexions
- JWT (access token 15min + refresh token 7j)
- Argon2 (hachage des mots de passe)
- Joi (validation des données)
- Helmet / CORS / Cookie-parser

**Frontend**
- HTML / CSS / Vanilla JavaScript (pattern MVC)
- Tailwind CSS

## Fonctionnalités

- Parcourir un catalogue de jeux avec recherche, tri et filtres par genre
- Consulter le détail d'un jeu (description, date de sortie, note moyenne)
- Notation des jeux de 1 à 5 étoiles (modifiable)
- Commentaires sur les jeux (ajout, signalement)
- Authentification sécurisée (inscription / connexion / déconnexion)
- Refresh token automatique — session maintenue sans reconnexion
- Espace admin : ajout, modification et suppression de jeux
- Modération des commentaires signalés

## Arborescence

```
Afec_Fil_Rouge/
├── Bdd/
│   └── gamefinder.sql
├── backend/
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── admin.controller.js
│       │   ├── auth.controller.js
│       │   ├── comments.controller.js
│       │   ├── game.controller.js
│       │   ├── genre.controller.js
│       │   └── rating.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── refresh.middleware.js
│       ├── models/
│       │   ├── admin.model.js
│       │   ├── auth.model.js
│       │   ├── comments.model.js
│       │   ├── game.model.js
│       │   ├── genre.model.js
│       │   └── rating.model.js
│       ├── routes/
│       │   ├── admin.routes.js
│       │   ├── auth.routes.js
│       │   ├── comments.routes.js
│       │   ├── game.routes.js
│       │   ├── genre.routes.js
│       │   └── rating.routes.js
│       └── validations/
│           ├── auth.validation.js
│           └── rating.validation.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── css/
│   │   ├── main.css
│   │   └── output.css
│   ├── pages/
│   │   ├── admin.html
│   │   ├── admin_comments.html
│   │   ├── detail.html
│   │   ├── liste_jeux.html
│   │   └── login.html
│   ├── public/
│   │   └── image/
│   └── js/
│       ├── api/
│       │   ├── admin.api.js
│       │   ├── auth.api.js
│       │   ├── comment.api.js
│       │   ├── fetch.js
│       │   ├── game.api.js
│       │   ├── genre.api.js
│       │   └── rating.api.js
│       ├── components/
│       │   ├── footer.js
│       │   └── header.js
│       ├── controller/
│       │   ├── admin.game.controller.js
│       │   ├── admin_comments.controller.js
│       │   ├── detail.controller.js
│       │   ├── index.controller.js
│       │   ├── liste.controller.js
│       │   └── login.controller.js
│       └── view/
│           ├── detail.view.js
│           ├── index.view.js
│           └── liste.view.js
└── documentation/
    ├── README.md
    └── swagger.yaml
