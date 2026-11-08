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

## Mettre à jour ma progression

Tout est dans `progression.js`. Quand un objectif est atteint :

1. Passez son `statut` à `"atteint"`.
2. Ajoutez la date (`date: "2026-06"`) et le numéro de la montre (`montres: [2]`).
3. Passez l’objectif suivant à `"prochain"` (ou `"encours"` si vous y travaillez déjà).

La page Progression et l’aperçu de l’accueil se mettent à jour tout seuls.

## Après chaque nouvelle montre : les pages de partage

Pour que le lien d’une montre s’affiche avec sa photo sur WhatsApp, Messenger ou Instagram, lancez depuis le dossier du dépôt :

```bash
python3 generer_partages.py
git add partage
```

Le script crée `partage/montre-002.html`, etc. Le bouton « Partager cette montre » des fiches utilise ces pages.

## Google

Le plan du site (`sitemap.xml`) et `robots.txt` aident Google à trouver toutes les pages. Si vous ajoutez une nouvelle page au site, pensez à l’ajouter au plan du site.

## Les fiches techniques des calibres

Elles sont dans `calibres.js`. Une montre affiche automatiquement la fiche de son calibre quand le nom du calibre (par exemple `NH35A`) figure dans son champ `mouvement`, dans `montres.js`. Pour un nouveau calibre, copiez un bloc dans `calibres.js` et changez les valeurs. Les fiches apparaissent aussi en bas du lexique, avec les montres qui les utilisent.

## Les infobulles

Elles sont automatiques. Les mots déclencheurs de chaque fiche sont listés dans le champ `termes` de `lexique.js`. Pour qu’un nouveau mot affiche une infobulle, ajoutez-le à cette liste, en français et en anglais.

## Le carnet d’atelier

Tout est dans `carnet.js`. Après une séance :

1. Réduisez vos photos (1 800 pixels de large suffisent) et déposez-les dans `images`, par exemple `atelier-005.jpg`.
2. Copiez un bloc de séance, collez-le en haut de la liste, et changez la date, le titre, le texte et les photos.
3. Chaque photo a sa légende, en français et en anglais.

Pour relier une séance à une de vos montres, ajoutez `montre: 2` (le numéro de la montre). Pensez à ne pas publier les photos des montres qui doivent rester une surprise !
