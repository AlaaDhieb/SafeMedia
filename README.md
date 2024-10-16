# SafeMedia - Un réseau social sécurisé pour les jeunes et adolescents

## Description du projet

SafeMedia est une application web conçue pour offrir un environnement de réseau social sûr et bienveillant, spécialement adapté aux jeunes et aux adolescents. Notre mission est de créer un espace en ligne où les utilisateurs peuvent interagir, partager et apprendre en toute sécurité, à l'abri des contenus inappropriés et des comportements toxiques.

### Caractéristiques principales

- Filtrage automatique des contenus inappropriés
- Interface utilisateur intuitive et adaptée aux jeunes
- Contrôles parentaux robustes
- Outils éducatifs intégrés
- Système de modération proactif
- Respect strict de la confidentialité des données des utilisateurs

## Architecture technique

SafeMedia est construit sur une architecture moderne et évolutive, utilisant les technologies suivantes :

### Backend

- **Node.js** avec **Express.js** pour le serveur API
- **MongoDB** pour la base de données
- Intégration de l'**API OpenAI** pour le filtrage avancé du contenu

### Frontend

- **React Native** pour l'interface utilisateur
- **Redux** pour la gestion de l'état

### Sécurité

- Utilisation de **JSON Web Tokens (JWT)** pour l'authentification
- Chiffrement des données sensibles avec **bcrypt**
- Protection contre les attaques CSRF, XSS, et injection SQL
- Mise en œuvre de **rate limiting** pour prévenir les abus

### Déploiement

- Conteneurisation avec **Docker**
- Déploiement sur **AWS** (Amazon Web Services)
- CI/CD via **GitHub Actions**

## Configuration de l'environnement de développement

1. Cloner le repository :

git clone https://github.com/AlaaDhieb/SafeMedia


2. Installer les dépendances :

cd safemedia
npm install


3. Configurer les variables d'environnement :
Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/safemedia
JWT_SECRET=votre_secret_jwt
OPENAI_API_KEY=votre_cle_api_openai


4. Lancer l'application en mode développement :

npm run dev


## Tests

Nous utilisons **Jest** pour les tests unitaires et **Supertest** pour les tests d'intégration.

Pour exécuter les tests :

npm test


## Déploiement

Le déploiement en production est géré via notre pipeline CI/CD sur GitHub Actions. Chaque push sur la branche `main` déclenche automatiquement :

1. L'exécution des tests
2. WIP

## Contribution

Nous accueillons favorablement les contributions à SafeMedia. Veuillez consulter notre fichier `CONTRIBUTING.md` pour les directives de contribution.

## Licence

SafeMedia est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Pour toute question ou suggestion, veuillez contacter notre équipe à support@safemedia.com
