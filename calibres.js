/*
  ============================================================
  MES CALIBRES – fiches techniques des mouvements que j’utilise
  ============================================================

  Une montre est reliée automatiquement à son calibre quand le nom
  du calibre (par exemple « NH35A ») apparaît dans son mouvement,
  dans montres.js. Pour ajouter un calibre, copiez un bloc et
  changez les valeurs. Sources : fiches techniques du fabricant.
*/

const CALIBRES = [

  {
    id: "NH35A",
    nom: "Seiko NH35A",
    fabricant: { fr: "Seiko Instruments (TMI), Japon et Malaisie", en: "Seiko Instruments (TMI), Japan and Malaysia" },
    type: { fr: "Automatique, remontage manuel possible", en: "Automatic, can also be hand-wound" },
    rubis: 24,
    alternances: 21600,
    reserve: 41,
    stop: true,
    manuel: true,
    date: { fr: "Oui, guichet à 3 h, correction rapide", en: "Yes, window at 3 o’clock, quick-set" },
    diametre: 27.4,
    hauteur: 5.32,
    precision: { fr: "−20 à +40 s par jour", en: "−20 to +40 s per day" },
    aiguilles: { fr: "1,50 / 0,90 / 0,20 mm", en: "1.50 / 0.90 / 0.20 mm" },
    legende: { fr: "Côté cadran : le disque de date fait tout le tour du mouvement, la minuterie entraîne les aiguilles au centre.", en: "Dial side: the date disc runs all around the movement, the motion works drive the hands at the centre." },
    texte: {
      fr: "Le grand classique des montres que l’on assemble soi-même : robuste, simple à régler, et compatible avec un choix immense de cadrans, d’aiguilles et de boîtiers. Son rotor remonte le ressort dans les deux sens, et un amortisseur protège l’axe du balancier contre les chocs.",
      en: "The great classic of self-assembled watches: sturdy, easy to adjust, and compatible with a huge choice of dials, hands and cases. Its rotor winds the spring in both directions, and a shock absorber protects the balance staff."
    }
  },

  {
    id: "NH70A",
    nom: "Seiko NH70A",
    fabricant: { fr: "Seiko Instruments (TMI), Japon et Malaisie", en: "Seiko Instruments (TMI), Japan and Malaysia" },
    type: { fr: "Automatique squelette, remontage manuel possible", en: "Automatic skeleton, can also be hand-wound" },
    rubis: 24,
    alternances: 21600,
    reserve: 41,
    stop: true,
    manuel: true,
    date: { fr: "Non", en: "No" },
    diametre: 27.4,
    hauteur: 5.32,
    precision: { fr: "−20 à +40 s par jour", en: "−20 to +40 s per day" },
    legende: { fr: "Ponts ajourés et cœur ouvert : on voit le rouage tourner et le balancier battre.", en: "Openworked bridges and an open heart: you can see the gear train turn and the balance beat." },
    texte: {
      fr: "La version squelette de la même famille : ses ponts sont ajourés pour laisser voir le rouage et le balancier, à travers un cadran transparent ou ouvert. Il partage la mécanique du NH35A, mais renonce à la date pour dégager la vue.",
      en: "The skeleton version of the same family: its bridges are openworked to reveal the gear train and the balance, through a transparent or open dial. It shares the NH35A’s mechanics, but gives up the date to clear the view."
    }
  },

];
