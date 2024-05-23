# Enigmatique

Enigmatique est un jeu captivant qui teste votre logique et votre capacité de déduction à travers la découverte de mots cachés. Chaque jour, un nouveau mot secret est généré et proposé aux joueurs pour un défi renouvelé.

## Fonctionnalités

> _Défi Quotidien_: Un mot secret est généré chaque jour, offrant un nouveau challenge aux joueurs.

> _Feedback Visuel Immédiat_: À chaque tentative de deviner le mot secret, des indices visuels sont fournis pour guider le joueur :
>
> - Vert pour les lettres correctes et bien placées.
> - Orange pour les lettres correctes mais mal placées.
> - Gris pour les lettres incorrectes.

> _Intégration de l'IA de Chat GPT d'OpenAI_: Utilisation de l'intelligence artificielle pour la génération des mots du jour et la gestion des interactions avec les joueurs.

> _Comment Jouer_:
>
> - Lancer le Jeu: Accédez à la plateforme de jeu via [URL du jeu].
> - Entrer un Mot: Proposez un mot de la même longueur que le mot secret.
> - Analyser les Indices: Utilisez les indices visuels pour ajuster vos prochaines propositions.
> - _Répéter_: Continuez à proposer des mots jusqu'à découvrir le mot secret du jour.

## Technologie

Le jeu Enigmatique utilise les technologies suivantes :

**Frontend** : Remix (React framework) pour une interface utilisateur réactive, et TailwindCSS pour le style.

**Backend** : Laravel utilisé pour développer l'API qui gère la logique côté serveur.

**Base de Données** : Base de données MySQl.

## Installation

Pour installer et lancer le jeu localement, suivez les étapes ci-dessous:

```bash
# Copier le code
git clone https://github.com/votreRepo/enigmatique.git
cd enigmatique
npm install
npm run dev
```

## Utilisation de l'API

Le jeu utilise une API développée avec Laravel pour récupérer et traiter les mots du jour :

_Récupération des Mots_ : Chaque jour, une requête est envoyée à l'API pour obtenir un nouveau mot.

_Traitement de la Réponse_ : La réponse de l'API est traitée pour déterminer le mot du jour.

_Stockage_ : Le mot est ensuite stocké dans une base de données locale pour utilisation durant la journée.

_Gestion des Erreurs_ : Les erreurs sont gérées de manière à assurer une expérience utilisateur fluide et continue.

## Contribution

Les contributions au projet sont bienvenues. Pour contribuer, veuillez suivre les étapes suivantes:

### Forker le projet

> Créer une nouvelle branche
> `bash (git checkout -b feature/amazingFeature)`
>
> Commit vos modifications
> `bash (git commit -m 'Add some amazingFeature')`
>
> Push sur la branche
> `bash (git push origin feature/amazingFeature)`
>
> Ouvrir une Pull Request

## Licence

Distribué sous la licence MIT. Voir LICENSE pour plus d'informations.

Tous droits réservés © 2024 Theo Michellon

---

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
