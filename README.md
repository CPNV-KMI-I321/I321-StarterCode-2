# Foodtruck — Starter 2

Dépôt : `I321-StarterCode-2`. La branche `main` contient le starter. Ce dossier est un point de départ à compléter, pas le corrigé.
Installer Node.js **24 LTS** et Git. Le cours et les consignes restent en français.

## Démarrer

```sh
git clone https://github.com/CPNV-KMI-I321/I321-StarterCode-2.git
cd I321-StarterCode-2
```

```sh
npm ci
npm start
```

API : http://localhost:3000 ; Swagger : http://localhost:3000/docs.
`npm run dev` redémarre le serveur lors des modifications.

Les routes et leur JSON attendu sont décrits dans Swagger. Les bases SQLite sont créées automatiquement.
Pour personnaliser la configuration, copier le `.env.example` de chaque application vers `.env` dans le même dossier.
Les chemins de base sont relatifs au dossier de l'application. Ne pas reprendre une base ou un `.env` d'une autre étape.

## À réaliser

Le CRUD Pizzas de l'étape 1 est fourni et doit continuer à fonctionner.
La table ingredients et ses routes sont prêtes ; ses opérations répondent **501**.
Utiliser les fichiers Pizzas comme exemple.

1. Compléter `src/entities/Ingredient.js` : lister, consulter, créer, modifier, supprimer.
2. Compléter `src/controllers/ingredientsController.js` et réutiliser `validateIngredient` et `validateId`.
3. Retourner les mêmes codes HTTP que pour les pizzas : 200, 201, 204, 400 et 404.
4. Garder les ingrédients indépendants des pizzas pour cette étape.
5. Dessiner le diagramme de classes et le MLD des deux tables sans association.

```json
{"name":"Mozzarella","price":2}
```

## Vérifier son travail

```sh
npm test
npm run test:acceptance
```

`npm test` vérifie uniquement que le point de départ et les fonctionnalités précédemment acquises fonctionnent.
Ces tests ne valident pas la nouvelle étape.
`npm run test:acceptance` vérifie le résultat à atteindre : ses échecs sont attendus avant de terminer les TODO.
Ne pas modifier les assertions pour les faire passer. Avancer fonctionnalité par fonctionnalité et tester aussi avec Swagger.
À l'étape 5, les tests d'acceptation nécessitent Docker démarré.

Le diagramme demandé peut être produit dans `docs/a-completer.puml`.
Ce starter possède un historique indépendant du corrigé. Le corrigé sera publié par l'enseignant en fin de séance.

## Consulter le corrigé

Quand l’enseignant aura publié la branche `solution` :

```sh
git fetch origin
git switch solution
```

Conserver son travail dans des commits avant de changer de branche.
