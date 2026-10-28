/*
  ============================================================
  LE PETIT LEXIQUE HORLOGER
  ============================================================

  Chaque fiche a un identifiant (id), par exemple "verre-saphir".
  C’est cet identifiant que vous indiquez dans montres.js, dans la
  liste  lexique: [...]  d’une montre, pour la relier à la fiche.

  Pour ajouter une fiche : copiez un bloc { id: ..., } dans la bonne
  catégorie et changez les textes. Les champs  plus, moins, voir  et
  illustration  sont facultatifs (les illustrations sont dans
  illustrations.js).
*/

const LEXIQUE = [

  {
    id: "mouvements",
    nom: { fr: "Les mouvements", en: "Movements" },
    intro: {
      fr: "Le mouvement, aussi appelé calibre, est le moteur de la montre : c’est lui qui fait tourner les aiguilles. Il en existe trois grandes familles.",
      en: "The movement, also called the calibre, is the engine of the watch: it’s what turns the hands. There are three main families."
    },
    fiches: [
      {
        id: "automatique",
        nom: { fr: "Mouvement automatique", en: "Automatic movement" },
        texte: {
          fr: "Un mouvement mécanique qui se remonte tout seul quand on le porte. Un rotor, demi-disque monté sur roulement, tourne au moindre geste du poignet et remonte le ressort de barillet. Posée, la montre fonctionne pendant sa réserve de marche, souvent autour de 40 heures, puis s’arrête.\n\nCe sont les mouvements les plus courants dans les montres que l’on assemble soi-même, comme les Seiko NH35 ou les Miyota 8215.",
          en: "A mechanical movement that winds itself while you wear it. A rotor, a half-disc on a bearing, spins with the slightest movement of the wrist and winds the mainspring. Once taken off, the watch runs for its power reserve, often around 40 hours, then stops.\n\nThese are the most common movements in self-assembled watches, such as the Seiko NH35 or the Miyota 8215."
        },
        plus: {
          fr: ["Aucune pile à changer", "La trotteuse glisse au lieu de sauter", "Le plaisir d’une mécanique vivante"],
          en: ["No battery to replace", "The seconds hand sweeps instead of ticking", "The joy of a living mechanism"]
        },
        moins: {
          fr: ["Moins précis qu’un quartz", "S’arrête si on ne le porte pas", "Demande une révision de temps en temps"],
          en: ["Less accurate than quartz", "Stops if not worn", "Needs a service now and then"]
        },
        voir: ["rotor", "reserve-de-marche", "manuel"]
      },
      {
        id: "manuel",
        nom: { fr: "Mouvement à remontage manuel", en: "Hand-wound movement" },
        texte: {
          fr: "Le plus ancien des mouvements mécaniques. Il n’a pas de rotor : on le remonte soi-même en tournant la couronne, généralement une fois par jour ou tous les deux jours. Ce petit rituel matinal fait partie de son charme.\n\nComme il n’a pas de rotor, il est souvent plus fin, et son dos transparent laisse mieux voir la mécanique.",
          en: "The oldest kind of mechanical movement. It has no rotor: you wind it yourself by turning the crown, usually once a day or every other day. This little morning ritual is part of its charm.\n\nWithout a rotor, it is often thinner, and a see-through case back shows off the mechanism better."
        },
        plus: {
          fr: ["Montre plus fine", "Mécanique bien visible", "Un lien quotidien avec sa montre"],
          en: ["Thinner watch", "Clearly visible mechanism", "A daily bond with your watch"]
        },
        moins: {
          fr: ["Il faut penser à la remonter", "Attention à ne pas forcer en fin de remontage"],
          en: ["You have to remember to wind it", "Don’t force it once fully wound"]
        },
        voir: ["automatique", "couronne"]
      },
      {
        id: "quartz",
        nom: { fr: "Mouvement à quartz", en: "Quartz movement" },
        texte: {
          fr: "Un mouvement électronique alimenté par une pile. Un petit cristal de quartz vibre à une fréquence très stable, 32 768 fois par seconde, et un circuit transforme ces vibrations en impulsions qui font avancer les aiguilles. On le reconnaît à sa trotteuse qui saute d’une seconde à l’autre.",
          en: "An electronic movement powered by a battery. A tiny quartz crystal vibrates at a very stable frequency, 32,768 times per second, and a circuit turns these vibrations into pulses that move the hands. You can recognize it by its seconds hand jumping from one second to the next."
        },
        plus: {
          fr: ["Très précis", "Fonctionne même sans être porté", "Robuste et abordable"],
          en: ["Very accurate", "Runs even when not worn", "Sturdy and affordable"]
        },
        moins: {
          fr: ["Pile à remplacer tous les quelques années", "Moins de magie mécanique"],
          en: ["Battery to replace every few years", "Less mechanical magic"]
        },
        voir: ["automatique"]
      }
    ]
  },

  {
    id: "verres",
    nom: { fr: "Les verres", en: "Crystals" },
    intro: {
      fr: "Le verre protège le cadran. On parle aussi de « glace ». Trois matériaux dominent, chacun avec son caractère.",
      en: "The crystal protects the dial. Three materials dominate, each with its own character."
    },
    tableau: {
      colonnes: { fr: ["", "Saphir", "Minéral", "Acrylique"], en: ["", "Sapphire", "Mineral", "Acrylic"] },
      lignes: [
        { fr: ["Résistance aux rayures", "Excellente", "Moyenne", "Faible"], en: ["Scratch resistance", "Excellent", "Average", "Low"] },
        { fr: ["Résistance aux chocs", "Bonne, mais peut se fendre", "Bonne", "Excellente"], en: ["Shock resistance", "Good, but can crack", "Good", "Excellent"] },
        { fr: ["Rayures réparables", "Non", "Difficilement", "Oui, par polissage"], en: ["Scratches repairable", "No", "Hardly", "Yes, by polishing"] },
        { fr: ["Prix", "Élevé", "Modéré", "Bas"], en: ["Price", "High", "Moderate", "Low"] }
      ]
    },
    fiches: [
      {
        id: "verre-saphir",
        nom: { fr: "Verre saphir", en: "Sapphire crystal" },
        texte: {
          fr: "Un cristal de saphir synthétique, fabriqué en laboratoire. C’est l’un des matériaux les plus durs qui existent, juste après le diamant : il est pratiquement inrayable au quotidien. Il est souvent associé à un traitement antireflet, qui évite les reflets et donne cette impression de verre invisible.",
          en: "A synthetic sapphire crystal, grown in a laboratory. It’s one of the hardest materials there is, just behind diamond: in everyday life it is practically scratch-proof. It often comes with an anti-reflective coating, which cuts glare and gives that invisible-glass look."
        },
        plus: { fr: ["Pratiquement inrayable", "Reste comme neuf pendant des années"], en: ["Practically scratch-proof", "Stays like new for years"] },
        moins: { fr: ["Plus cher", "Peut se fendre sur un choc très violent", "Reflète beaucoup sans antireflet"], en: ["More expensive", "Can crack under a very hard impact", "Very reflective without a coating"] },
        voir: ["verre-mineral", "verre-acrylique"]
      },
      {
        id: "verre-mineral",
        nom: { fr: "Verre minéral", en: "Mineral crystal" },
        texte: {
          fr: "Du verre trempé, traité pour être plus résistant que le verre ordinaire. C’est un bon compromis entre prix, solidité et résistance aux rayures. Certaines marques le durcissent encore davantage, comme le Hardlex de Seiko.",
          en: "Tempered glass, treated to be stronger than ordinary glass. It’s a good balance of price, strength and scratch resistance. Some brands harden it further, such as Seiko’s Hardlex."
        },
        plus: { fr: ["Bon rapport qualité-prix", "Résiste bien aux chocs"], en: ["Good value for money", "Handles shocks well"] },
        moins: { fr: ["Se raye plus facilement que le saphir", "Rayures difficiles à effacer"], en: ["Scratches more easily than sapphire", "Scratches are hard to remove"] },
        voir: ["verre-saphir", "verre-acrylique"]
      },
      {
        id: "verre-acrylique",
        nom: { fr: "Verre acrylique", en: "Acrylic crystal" },
        texte: {
          fr: "Un plastique transparent, aussi appelé plexiglas ou hésalite. C’était le verre de la plupart des montres jusqu’aux années 1970. Il se raye facilement, mais les rayures s’effacent avec une pâte à polir. Il est souvent bombé, ce qui donne un charme vintage et des reflets chaleureux.",
          en: "A clear plastic, also called plexiglass or hesalite. It was the crystal on most watches until the 1970s. It scratches easily, but scratches can be removed with polishing paste. It is often domed, which gives a vintage charm and warm reflections."
        },
        plus: { fr: ["Ne se brise pas en éclats", "Rayures faciles à polir", "Look vintage bombé"], en: ["Doesn’t shatter", "Scratches are easy to polish out", "Domed vintage look"] },
        moins: { fr: ["Se raye très facilement", "Moins prestigieux"], en: ["Scratches very easily", "Less prestigious"] },
        voir: ["verre-saphir", "verre-mineral"]
      }
    ]
  },

  {
    id: "types",
    nom: { fr: "Les types de montres", en: "Types of watches" },
    intro: {
      fr: "Chaque grande famille de montres est née d’un usage précis, qui a façonné son allure.",
      en: "Each major family of watches was born from a specific use, which shaped its look."
    },
    fiches: [
      {
        id: "plongee",
        illustration: "plongee",
        nom: { fr: "Montre de plongée", en: "Dive watch" },
        texte: {
          fr: "Conçue pour mesurer le temps passé sous l’eau. On la reconnaît à sa lunette tournante graduée sur 60 minutes, qui ne tourne que dans un sens par sécurité, à ses index très lumineux et à sa couronne vissée. La norme ISO 6425 exige au moins 100 mètres d’étanchéité ; beaucoup de modèles annoncent 200 mètres ou plus.\n\nAu fenua, c’est la montre du lagon par excellence.",
          en: "Designed to time a dive. You can recognize it by its rotating bezel marked over 60 minutes, which only turns one way for safety, its very bright indices and its screw-down crown. The ISO 6425 standard requires at least 100 metres of water resistance; many models are rated to 200 metres or more.\n\nIn the fenua, it’s the lagoon watch par excellence."
        },
        voir: ["lunette", "luminescence", "etancheite"]
      },
      {
        id: "field",
        illustration: "field",
        nom: { fr: "Montre de terrain (field)", en: "Field watch" },
        texte: {
          fr: "Héritée des montres militaires. Tout est pensé pour la lisibilité et la robustesse : grands chiffres arabes, souvent une échelle de 13 à 24 heures, cadran mat, boîtier simple et bracelet en toile ou en cuir. Une montre de tous les jours, sans chichis.",
          en: "Inherited from military watches. Everything is designed for legibility and toughness: large Arabic numerals, often a 13 to 24-hour scale, matte dial, simple case and a canvas or leather strap. An everyday watch, no fuss."
        },
        voir: ["cadran", "index"]
      },
      {
        id: "dress",
        illustration: "dress",
        nom: { fr: "Montre habillée (dress)", en: "Dress watch" },
        texte: {
          fr: "Fine, élégante et discrète, pensée pour glisser sous une manche de chemise. Cadran épuré, souvent sans trotteuse ni date, boîtier de diamètre modéré et bracelet en cuir.",
          en: "Thin, elegant and discreet, designed to slip under a shirt cuff. Clean dial, often without a seconds hand or date, a moderately sized case and a leather strap."
        },
        voir: ["manuel", "cadran"]
      },
      {
        id: "gmt",
        illustration: "gmt",
        nom: { fr: "Montre GMT", en: "GMT watch" },
        texte: {
          fr: "Elle affiche un deuxième fuseau horaire grâce à une aiguille supplémentaire qui fait le tour du cadran en 24 heures, souvent associée à une lunette graduée de 1 à 24. Idéale pour garder l’heure de Tahiti en voyage, ou suivre celle de proches à l’autre bout du monde.",
          en: "It shows a second time zone thanks to an extra hand that goes around the dial once every 24 hours, often paired with a bezel marked 1 to 24. Perfect for keeping Tahiti time while travelling, or following loved ones on the other side of the world."
        },
        voir: ["lunette"]
      },
      {
        id: "chronographe",
        illustration: "chronographe",
        nom: { fr: "Chronographe", en: "Chronograph" },
        texte: {
          fr: "Une montre avec une fonction chronomètre. Deux poussoirs, de part et d’autre de la couronne, permettent de démarrer, arrêter et remettre à zéro, et de petits compteurs sur le cadran affichent les minutes et heures écoulées. À ne pas confondre avec « chronomètre », qui désigne une montre certifiée pour sa précision.",
          en: "A watch with a stopwatch function. Two pushers, on either side of the crown, start, stop and reset it, and small sub-dials show the elapsed minutes and hours. Not to be confused with “chronometer”, which means a watch certified for its accuracy."
        },
        voir: ["couronne", "calibre"]
      },
      {
        id: "pilote",
        illustration: "pilote",
        nom: { fr: "Montre d’aviateur", en: "Pilot watch" },
        texte: {
          fr: "Née dans les cockpits. Grand boîtier, cadran noir très contrasté, grands chiffres lumineux et souvent un triangle à midi pour s’orienter d’un coup d’œil. La couronne est volumineuse, à l’origine pour pouvoir la manipuler avec des gants.",
          en: "Born in the cockpit. Large case, high-contrast black dial, big luminous numerals and often a triangle at twelve for quick orientation. The crown is oversized, originally so it could be operated with gloves on."
        },
        voir: ["couronne", "luminescence"]
      }
    ]
  },

  {
    id: "vocabulaire",
    nom: { fr: "Le vocabulaire", en: "Vocabulary" },
    intro: {
      fr: "Les petits mots de l’horlogerie, pour s’y retrouver quand on parle d’une montre.",
      en: "The small words of watchmaking, to find your way when talking about a watch."
    },
    schemas: [
      { illustration: "anatomie-face",
        legende: { fr: "Une montre vue de face. Cliquez sur un nom souligné pour ouvrir sa fiche.", en: "A watch seen from the front. Click an underlined name to open its entry." } },
      { illustration: "anatomie-coupe",
        legende: { fr: "La même montre vue en coupe : ce qui se cache sous le verre et derrière le cadran.", en: "The same watch in cross-section: what hides under the crystal and behind the dial." } }
    ],
    fiches: [
      { id: "boitier", nom: { fr: "Boîtier", en: "Case" },
        texte: { fr: "L’enveloppe de la montre, qui protège le mouvement. Il est souvent en acier inoxydable, parfois en titane, en bronze ou en céramique. Son diamètre, en millimètres, donne la taille de la montre.", en: "The housing of the watch, protecting the movement. It is usually stainless steel, sometimes titanium, bronze or ceramic. Its diameter, in millimetres, gives the size of the watch." },
        voir: ["fond", "cornes"] },
      { id: "cadran", nom: { fr: "Cadran", en: "Dial" },
        texte: { fr: "Le visage de la montre, la plaque sur laquelle on lit l’heure. C’est souvent lui qui donne tout son caractère à une pièce : couleur, texture, finition.", en: "The face of the watch, the plate on which you read the time. It often gives a piece its whole character: color, texture, finish." },
        voir: ["index", "rehaut"] },
      { id: "index", nom: { fr: "Index", en: "Indices" },
        texte: { fr: "Les repères des heures sur le cadran, qui remplacent ou accompagnent les chiffres : bâtons, points, triangles… Ils sont souvent recouverts de matière luminescente.", en: "The hour markers on the dial, replacing or accompanying the numerals: batons, dots, triangles… They are often coated with luminous material." },
        voir: ["cadran", "luminescence"] },
      { id: "rehaut", nom: { fr: "Rehaut", en: "Chapter ring" },
        texte: { fr: "L’anneau qui fait la transition entre le cadran et le verre, sur le pourtour. Il porte parfois une échelle des minutes ou des secondes.", en: "The ring that bridges the dial and the crystal, around the edge. It sometimes carries a minutes or seconds scale." },
        voir: ["cadran"] },
      { id: "trotteuse", nom: { fr: "Trotteuse", en: "Seconds hand" },
        texte: { fr: "L’aiguille des secondes. Sur un mouvement mécanique, elle glisse en continu ; sur un quartz, elle saute d’une seconde à l’autre.", en: "The seconds hand. On a mechanical movement it sweeps continuously; on a quartz it jumps from one second to the next." },
        voir: ["stop-seconde", "quartz"] },
      { id: "couronne", nom: { fr: "Couronne", en: "Crown" },
        texte: { fr: "Le petit bouton sur le côté du boîtier. Selon sa position, elle sert à remonter le mouvement, régler la date ou régler l’heure. Une couronne vissée améliore l’étanchéité.", en: "The small knob on the side of the case. Depending on its position, it winds the movement, sets the date or sets the time. A screw-down crown improves water resistance." },
        voir: ["etancheite", "manuel"] },
      { id: "lunette", nom: { fr: "Lunette", en: "Bezel" },
        texte: { fr: "L’anneau qui entoure le verre, au-dessus du boîtier. Elle peut être fixe et décorative, ou tournante et graduée, pour mesurer un temps écoulé ou suivre un second fuseau horaire.", en: "The ring around the crystal, on top of the case. It can be fixed and decorative, or rotating and graduated, to measure elapsed time or track a second time zone." },
        voir: ["plongee", "gmt"] },
      { id: "cornes", nom: { fr: "Cornes", en: "Lugs" },
        texte: { fr: "Les quatre petites pattes du boîtier qui tiennent le bracelet, grâce à des barrettes à ressort.", en: "The four small arms of the case that hold the strap, using spring bars." },
        voir: ["entrecornes", "boitier"] },
      { id: "entrecornes", nom: { fr: "Entrecornes", en: "Lug width" },
        texte: { fr: "La distance entre les cornes, en millimètres : 18, 20, 22 mm… C’est la mesure indispensable pour choisir un bracelet qui s’adapte à la montre.", en: "The distance between the lugs, in millimetres: 18, 20, 22 mm… It’s the essential measurement for choosing a strap that fits the watch." },
        voir: ["cornes"] },
      { id: "fond", nom: { fr: "Fond de boîte", en: "Case back" },
        texte: { fr: "L’arrière du boîtier, contre le poignet. Il peut être plein, vissé ou clipsé, ou transparent avec un verre saphir pour admirer le mouvement.", en: "The back of the case, against the wrist. It can be solid, screwed or snapped on, or see-through with a sapphire crystal to admire the movement." },
        voir: ["boitier", "verre-saphir"] },
      { id: "rotor", nom: { fr: "Rotor", en: "Rotor" },
        texte: { fr: "La masse oscillante en forme de demi-disque d’un mouvement automatique. Elle tourne avec les gestes du poignet et remonte le ressort.", en: "The half-disc oscillating weight of an automatic movement. It spins with the movements of the wrist and winds the spring." },
        voir: ["automatique"] },
      { id: "reserve-de-marche", nom: { fr: "Réserve de marche", en: "Power reserve" },
        texte: { fr: "La durée pendant laquelle une montre mécanique continue de fonctionner une fois complètement remontée, sans être portée ni remontée. Souvent autour de 40 heures, parfois bien plus.", en: "How long a mechanical watch keeps running once fully wound, without being worn or wound again. Often around 40 hours, sometimes much more." },
        voir: ["automatique", "manuel"] },
      { id: "stop-seconde", nom: { fr: "Stop-seconde", en: "Hacking seconds" },
        texte: { fr: "Une fonction qui arrête la trotteuse quand on tire la couronne pour régler l’heure. Pratique pour synchroniser sa montre à la seconde près.", en: "A feature that stops the seconds hand when you pull the crown to set the time. Handy for synchronizing your watch to the second." },
        voir: ["trotteuse", "couronne"] },
      { id: "luminescence", nom: { fr: "Luminescence", en: "Lume" },
        texte: { fr: "La matière déposée sur les aiguilles et les index, qui emmagasine la lumière et brille dans le noir. La plus connue s’appelle Super-LumiNova.", en: "The material applied to the hands and indices, which stores light and glows in the dark. The best known is called Super-LumiNova." },
        voir: ["index", "plongee"] },
      { id: "etancheite", nom: { fr: "Étanchéité", en: "Water resistance" },
        texte: { fr: "La résistance de la montre à l’eau, exprimée en mètres ou en ATM. Attention, c’est une pression de test, pas une profondeur de plongée : une montre « 30 m » supporte les éclaboussures, pas la baignade. Comptez 100 m pour nager sereinement, et 200 m pour plonger.", en: "How well the watch resists water, expressed in metres or ATM. Careful, it’s a test pressure, not a diving depth: a “30 m” watch handles splashes, not swimming. Count on 100 m to swim with peace of mind, and 200 m for diving." },
        voir: ["couronne", "plongee"] },
      { id: "calibre", nom: { fr: "Calibre", en: "Calibre" },
        texte: { fr: "Un autre mot pour désigner un modèle de mouvement, souvent suivi de sa référence : calibre NH35, calibre 8215…", en: "Another word for a movement model, often followed by its reference: NH35 calibre, 8215 calibre…" },
        voir: ["automatique"] }
    ]
  }

];
