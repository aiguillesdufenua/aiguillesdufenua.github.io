# Mode d’emploi : ajouter une montre

Tout se passe dans un seul fichier : **montres.js**. Les pages françaises et anglaises se mettent à jour toutes seules.

## Ajouter une nouvelle montre

1. Sur GitHub, ouvrez `montres.js` et cliquez sur le crayon (« Edit this file »).
2. Copiez un bloc existant, de `{` jusqu’à `},` inclus.
3. Collez-le à la fin de la liste, juste avant le `];` final.
4. Changez le numéro (`numero: 3`), la date (`"2026-05"`) et les textes.
5. Cliquez sur « Commit changes ». Le site est à jour après une ou deux minutes.

## Ajouter des photos

1. Ouvrez le dossier `images` du dépôt, puis « Add file » et « Upload files ».
2. Nommez vos photos simplement, par exemple `montre-003-1.jpg`, `montre-003-2.jpg` (sans espace ni accent).
3. Dans `montres.js`, ajoutez-les dans la liste `photos` de la montre :

```js
photos: [
  { src: "images/montre-003-1.jpg", alt: { fr: "La montre vue de face", en: "The watch, front view" } },
  { src: "images/montre-003-2.jpg", alt: { fr: "Le dos de la montre", en: "The back of the watch" } },
],
```

La première photo sert de vignette dans la galerie. Conseil : des photos verticales, d’environ 1200 pixels de haut, pas trop lourdes (moins de 500 Ko).

## Le QR code pour la carte

Ouvrez la fiche de la montre en ajoutant `&qr` à la fin de l’adresse, par exemple :

`https://aiguillesdufenua.github.io/montre.html?n=3&qr`

Un QR code apparaît en bas de la page. Enregistrez l’image et imprimez-la au dos de la carte. Les visiteurs normaux ne voient pas cette section.

## Adresses utiles

- Galerie : `https://aiguillesdufenua.github.io/montres.html` (anglais : `watches.html`)
- Fiche de la montre n° 3 : `https://aiguillesdufenua.github.io/montre.html?n=3` (anglais : `watch.html?n=3`)

## Relier une montre au lexique

Dans `montres.js`, ajoutez une ligne `lexique` à la montre, avec les identifiants des fiches qui la concernent :

```js
lexique: ["automatique", "verre-saphir", "plongee"],
```

La fiche de la montre affiche alors ces mots, cliquables, et chaque fiche du lexique liste automatiquement les montres concernées.

Identifiants disponibles (voir `lexique.js`) :

- Mouvements : `automatique`, `manuel`, `quartz`
- Verres : `verre-saphir`, `verre-mineral`, `verre-acrylique`
- Types de montres : `plongee`, `field`, `dress`, `gmt`, `chronographe`, `pilote`
- Vocabulaire : `boitier`, `cadran`, `index`, `rehaut`, `trotteuse`, `couronne`, `lunette`, `cornes`, `entrecornes`, `fond`, `rotor`, `reserve-de-marche`, `stop-seconde`, `luminescence`, `etancheite`, `calibre`

## Ajouter un mot au lexique

Ouvrez `lexique.js`, copiez une fiche `{ id: ..., }` dans la bonne catégorie et changez l’identifiant et les textes. L’identifiant doit être en minuscules, sans espace ni accent.
