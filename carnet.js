/*
  ============================================================
  CARNET D’ATELIER – le fichier à compléter après chaque séance
  ============================================================

  Chaque séance est un bloc { ... }. La plus récente s’affiche en premier.
  Pour ajouter une séance : copiez un bloc, collez-le en haut de la liste,
  changez la date, le titre, le texte, puis listez vos photos.

  Les photos vont dans le dossier « images » (par exemple atelier-005.jpg).
  Pour chaque photo, écrivez une légende courte en français et en anglais.
  Le champ  montre  (facultatif) relie la séance à une montre de montres.js.
*/

const CARNET = [

  {
    date: "2026-11",
    titre: { fr: "Une séance d’assemblage", en: "An assembly session" },
    texte: {
      fr: "Les étapes d’une séance à l’établi, de la préparation jusqu’à l’ajustement de la tige. Les montres elles-mêmes restent secrètes pour l’instant…",
      en: "The steps of a session at the workbench, from preparation to fitting the stem. The watches themselves stay secret for now…"
    },
    photos: [
      { src: "images/atelier-005.jpg", portrait: true,
        legende: { fr: "Avant de commencer : les doigtiers pour ne laisser aucune trace, le coussin de mouvement, la brucelle, et le mouvement NH35A encore dans son sachet.",
                   en: "Before starting: finger cots to leave no marks, the movement cushion, the tweezers, and the NH35A movement still in its bag." } },
      { src: "images/atelier-001.jpg",
        legende: { fr: "Le mouvement NH35A posé sur son coussin d’horloger, côté cadran, avec son disque de date. La petite couronne bleue est un capuchon de protection, en attendant la vraie couronne.",
                   en: "The NH35A movement resting on its watchmaker’s cushion, dial side up, with its date disc. The small blue crown is a protective cap, until the real crown is fitted." } },
      { src: "images/atelier-002.jpg",
        legende: { fr: "Couper les pieds d’un cadran à la pince coupante de précision, sur un papier de soie pour ne pas le rayer. Quand les pieds ne tombent pas en face des trous du mouvement, on les retire et le cadran se fixe autrement.",
                   en: "Cutting the feet off a dial with precision flush cutters, on tissue paper so as not to scratch it. When the feet don’t line up with the movement’s holes, they are removed and the dial is fixed another way." } },
      { src: "images/atelier-013.jpg",
        legende: { fr: "Les pose-aiguilles en plastique, aux embouts de tailles différentes, pour enfoncer les aiguilles bien droit sans marquer le cadran. À l’arrière-plan, le mouvement attend sur son coussin.",
                   en: "Plastic hand setters, with tips of different sizes, to press the hands on straight without marking the dial. In the background, the movement waits on its cushion." } },
      { src: "images/atelier-010.jpg",
        legende: { fr: "La tige de remontoir et la couronne, encore séparées. La tige est livrée trop longue : il faudra l’ajuster au boîtier.",
                   en: "The winding stem and the crown, still separate. The stem comes too long: it will have to be fitted to the case." } },
      { src: "images/atelier-011.jpg",
        legende: { fr: "La tige vissée dans la couronne, pour une première présentation.",
                   en: "The stem screwed into the crown, for a first trial fit." } },
      { src: "images/atelier-003.jpg",
        legende: { fr: "Le mouvement emboîté, vu à travers le fond transparent : on lit « NH35A Twenty-four jewels » sur le rotor. À côté, la tige et sa couronne attendent d’être ajustées.",
                   en: "The cased movement, seen through the see-through case back: “NH35A Twenty-four jewels” can be read on the rotor. Next to it, the stem and its crown are waiting to be fitted." } },
      { src: "images/atelier-004.jpg",
        legende: { fr: "Au pied à coulisse, on mesure la tige entre le boîtier et la couronne : 4,3 mm. C’est ce qui guide la coupe. La règle : couper peu, essayer, recommencer.",
                   en: "With a caliper, measuring the stem between the case and the crown: 4.3 mm. That guides the cut. The rule: cut a little, test, repeat." } },
      { src: "images/atelier-006.jpg", portrait: true,
        legende: { fr: "Des repères au feutre noir sur le filetage indiquent où couper la tige.",
                   en: "Black marker lines on the thread show where to cut the stem." } },
      { src: "images/atelier-007.jpg", portrait: true,
        legende: { fr: "Une fois coupée, la tige est ébavurée à la lime, pour que la couronne se visse sans abîmer son filetage.",
                   en: "Once cut, the stem is deburred with a file, so the crown screws on without damaging its thread." } },
      { src: "images/atelier-009.jpg", portrait: true,
        legende: { fr: "Coupée et ébavurée, la tige est prête à être vissée dans la couronne, dont on aperçoit l’intérieur fileté. On distingue aussi le frein-filet : il solidarise la tige et la couronne pour qu’elles ne se desserrent pas, tout en permettant de les démonter plus tard si besoin.",
                   en: "Cut and deburred, the stem is ready to be screwed into the crown, whose threaded inside can be seen. The threadlocker is visible too: it secures the stem to the crown so they don’t work loose, while still allowing them to be taken apart later if needed." } },
      { src: "images/atelier-012.jpg",
        legende: { fr: "Le moment de vérité : la tige ajustée et sa couronne remises en place dans le mouvement emboîté. Reste à vérifier que la couronne vient bien en appui et que les crans sont nets.",
                   en: "The moment of truth: the fitted stem and its crown back in the cased movement. All that remains is to check that the crown sits flush and the clicks are crisp." } },
    ]
  },

  {
    date: "2026-11",
    titre: { fr: "Mon établi", en: "My workbench" },
    texte: {
      fr: "Les outils avec lesquels je travaille aujourd’hui. Leur rôle est expliqué dans la page <a href=\"fabrication.html#outils\">Comment naît une montre</a>.",
      en: "The tools I work with today. What each one does is explained on the <a href=\"making.html#outils\">How a watch is born</a> page."
    },
    photos: [
      { src: "images/atelier-008.jpg", portrait: true,
        legende: { fr: "Le coffret d’outils (brucelles, tournevis, pose-aiguilles, clé de fond, loupe ×3, poire soufflante), deux presses, des supports de mouvement, une boule pour dévisser les fonds, une boîte à pièces sous cloche, une lime, un pied à coulisse, des tournevis d’horloger, deux pinces coupantes, le coussin et la brucelle, sur le tapis d’établi.",
                   en: "The tool case (tweezers, screwdrivers, hand setter, case back wrench, ×3 loupe, air blower), two presses, movement holders, a ball for unscrewing case backs, a domed parts box, a file, a caliper, watchmaker’s screwdrivers, two cutters, the cushion and the tweezers, on the bench mat." } },
    ]
  },

];
