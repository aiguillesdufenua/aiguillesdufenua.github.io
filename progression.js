/*
  ============================================================
  MA PROGRESSION – le fichier à modifier quand j’atteins un objectif
  ============================================================

  Pour chaque objectif, le champ  statut  peut valoir :
    "atteint"   objectif réussi (indiquez la date et la ou les montres)
    "encours"   je suis en train d’y travailler
    "prochain"  la prochaine étape que je vise
    "avenir"    plus tard

  montres : les numéros des montres liées à cet objectif, par exemple [0] ou [1, 2].
  date    : "AAAA-MM", le mois où l’objectif a été atteint.
  note    : un petit mot facultatif, affiché sous la description.
*/

const OBJECTIFS = [

  {
    statut: "atteint", date: "2025-09", montres: [0],
    titre: { fr: "Assembler une montre en kit", en: "Assemble a watch kit" },
    texte: {
      fr: "Un kit complet, des pièces prévues pour aller ensemble et une notice : la meilleure façon de découvrir les gestes de base, les outils et l’ordre des étapes.",
      en: "A complete kit, parts designed to fit together and instructions: the best way to discover the basic skills, the tools and the order of the steps."
    }
  },

  {
    statut: "atteint", date: "2025-10", montres: [1],
    titre: { fr: "Assembler une montre dont j’ai choisi les composants", en: "Assemble a watch with parts I chose myself" },
    texte: {
      fr: "Choisir moi-même le mouvement, le boîtier, le cadran et les aiguilles, vérifier qu’ils sont compatibles, et ajuster la tige de remontoir à la bonne longueur.",
      en: "Choosing the movement, case, dial and hands myself, checking they are compatible, and cutting the winding stem to the right length."
    },
    note: { fr: "Atteint, et je continue à me perfectionner à chaque nouvelle montre.", en: "Achieved, and I keep improving with every new watch." }
  },

  {
    statut: "prochain",
    titre: { fr: "Assembler une montre de poche", en: "Assemble a pocket watch" },
    texte: {
      fr: "Changer d’échelle et de style : un boîtier de gousset, un mouvement plus grand, une chaîne, et l’élégance des montres d’autrefois.",
      en: "A change of scale and style: a pocket watch case, a larger movement, a chain, and the elegance of watches from another age."
    }
  },

  {
    statut: "avenir",
    titre: { fr: "Assembler une montre avec un cadran fait maison", en: "Assemble a watch with a homemade dial" },
    texte: {
      fr: "Dessiner et fabriquer mon propre cadran : découpe, couleur, index… et pourquoi pas, un jour, un peu de nacre du fenua.",
      en: "Designing and making my own dial: cutting, color, indices… and perhaps one day, a touch of mother-of-pearl from the fenua."
    }
  },

  {
    statut: "avenir", etiquette: { fr: "Le grand défi", en: "The big challenge" },
    titre: { fr: "Démonter et remonter un mouvement complet", en: "Take apart and reassemble a complete movement" },
    texte: {
      fr: "Démonter chaque roue et chaque pont, nettoyer, huiler, tout remonter… et voir le balancier repartir.",
      en: "Taking apart every wheel and every bridge, cleaning, oiling, putting it all back together… and watching the balance start beating again."
    }
  },

  {
    statut: "avenir", etiquette: { fr: "L’horizon", en: "The horizon" },
    titre: { fr: "Restaurer une montre ancienne", en: "Restore a vintage watch" },
    texte: {
      fr: "Redonner vie à une montre qui a déjà une histoire : la diagnostiquer, la réviser et la remettre à l’heure, en respectant ce qu’elle a été.",
      en: "Bringing back to life a watch that already has a story: diagnosing it, servicing it and setting it ticking again, while respecting what it once was."
    }
  },

];
