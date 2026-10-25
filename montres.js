/*
  ============================================================
  MES MONTRES – le seul fichier à modifier pour ajouter une montre
  ============================================================

  Pour ajouter une montre :
  1. Copiez un bloc { ... } ci-dessous (de l’accolade ouvrante à
     l’accolade fermante suivie d’une virgule).
  2. Collez-le à la fin de la liste, avant le crochet final ].
  3. Changez le numéro et les textes.
  4. Déposez les photos dans le dossier « images » du dépôt.

  Règles simples :
  - Un texte identique en français et en anglais s’écrit une seule
    fois :  mouvement: "Miyota 8215"
  - Un texte différent selon la langue s’écrit ainsi :
      modele: { fr: "Lagon", en: "Lagoon" }
  - La date s’écrit "AAAA-MM", par exemple "2026-03" pour mars 2026.
  - Pour séparer deux paragraphes, écrivez \n\n dans le texte.
  - Laissez  photos: []  tant que vous n’avez pas de photo :
    le site affichera « Photo à venir ».

  Les deux montres ci-dessous sont des EXEMPLES : remplacez leurs
  textes par ceux de vos vraies montres.
*/

const MONTRES = [

    {
    numero: 0,
    date: "2025-09",
    modele: { fr: "DIY Watch Club DWC-D02", en: "DIY Watch Club DWC-D02" },
    mouvement: { fr: "Seiko NH70A", en: "Seiko NH70A" },
    photos: [
      { src: "images/montre-000-1.jpg", alt: { fr: "La montre vue de face", en: "The watch, front view" } },
      // { src: "images/montre-001-2.jpg", alt: { fr: "Le dos de la montre", en: "The back of the watch" } },
    ],
    composants: [
      { nom: { fr: "Boîtier", en: "Case" },      valeur: { fr: "Acier, 40 mm", en: "Steel, 40 mm" } },
      { nom: { fr: "Cadran", en: "Dial" },       valeur: { fr: "Transparent", en: "Transparent" } },
      { nom: { fr: "Aiguilles", en: "Hands" },   valeur: { fr: "Argent", en: "Silver" } },
      { nom: { fr: "Bracelet", en: "Strap" },    valeur: { fr: "Acier", en: "Stainless Steel" } },
    ],
    histoire: {
      fr: "Ma toute première montre. Je voulais une pièce intéressante pour mon premier assemblage mais aussi qualitative.\n\nTout est parti de l’idée de créer moi-même mes montres et d'apprendre progressivement, c'est donc mon modèle 0.",
      en: "My first watch. I wanted an interesting piece for my first watchmaking experience but I wanted quality parts.\n\nEverything has started from the idea to create and build my watches myself, learning progressively and continuously. That's my model 0."
    },
    appris: {
      fr: "Découvertes des étapes d'assemblage, des outils et des techniques de pose des aiguilles.",
      en: "Watchmaking steps discovery, learning of tools and hands assembly."
    }
  },
  {
    numero: 1,
    date: "2025-10",
    modele: { fr: "Miti Nui", en: "Miti Nui" },
    mouvement: { fr: "Seiko NH35A", en: "Seiko NH35A" },
    photos: [
      { src: "images/montre-001-1.jpg", alt: { fr: "La montre vue de face dans son élement océan.", en: "The watch, front view." } },
      { src: "images/montre-001-2.jpg", alt: { fr: "La montre dans l'élément du Fenua.", en: "The watch, front view in Fenua nature." } },
      { src: "images/montre-001-3.jpg", alt: { fr: "Le dos de la montre.", en: "The watch, back view." } },
    ],
    composants: [
      { nom: { fr: "Boîtier", en: "Case" },      valeur: { fr: "Acier, 40 mm", en: "Steel, 40 mm" } },
      { nom: { fr: "Cadran", en: "Dial" },       valeur: { fr: "Bleu texturé océan", en: "Blue ocean textured" } },
      { nom: { fr: "Aiguilles", en: "Hands" },   valeur: { fr: "Argentées", en: "Silver" } },
      { nom: { fr: "Bracelet", en: "Strap" },    valeur: { fr: "Acier", en: "Stainless Steel" } },
    ],
    histoire: {
      fr: "La première montre pour laquelle j'ai choisi les composants, aiguilles et cadran.\n\nPour rendre hommage à l'immensité de l'océan, ses trésors et ses couleurs. Miti Nui signifie grande mer en tahitien.",
      en: "The very first watch for which I have chosen all components, hands and dial.\n\Tribute to the immensity of the ocean, its treasures and colors. Miti Nui means great sea in tahitian."
    },
    appris: {
      fr: "Choisir des composants compatibles entre eux et ajuster la longueur de tige de remontoir au boitier.",
      en: "Select compatible components and winding stem adjustement to fit watch case."
    }
  },

];
