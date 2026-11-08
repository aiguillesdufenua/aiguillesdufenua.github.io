/* Affichage de la galerie et des fiches montres. Inutile de modifier ce fichier. */
(function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

  var T = {
    fr: {
      fiche: 'montre.html', galerie: 'montres.html', autreFiche: 'watch.html', autreGalerie: 'watches.html',
      locale: 'fr-FR', numero: 'N°', modele: 'Modèle', mouvement: 'Mouvement', date: 'Date',
      composants: 'Les composants', histoire: 'Son histoire', appris: 'Ce que j’ai appris avec cette montre',
      precedente: 'Montre précédente', suivante: 'Montre suivante', retour: 'Toutes mes montres',
      introuvable: 'Cette montre est introuvable.', photoAVenir: 'Photo à venir',
      vide: 'Les premières montres arrivent bientôt.', voirPhoto: 'Voir la photo',
      lexique: 'lexique.html', autreLexique: 'glossary.html', dansLexique: 'Dans le lexique', mesMontres: 'Mes montres concernées',
      voirAussi: 'Voir aussi', plus: 'Les plus', moins: 'Les moins', rechercher: 'Rechercher un mot…', aucun: 'Aucun mot ne correspond à votre recherche.',
      qrTitre: 'QR code pour la carte de cette montre', partager: 'Partager cette montre', copie: 'Lien copié !',
      qrAide: 'Enregistrez l’image (clic droit ou appui long), puis imprimez-la au dos de la carte. Cette section n’apparaît que si l’adresse se termine par &qr.'
    },
    en: {
      fiche: 'watch.html', galerie: 'watches.html', autreFiche: 'montre.html', autreGalerie: 'montres.html',
      locale: 'en-GB', numero: 'No.', modele: 'Model', mouvement: 'Movement', date: 'Date',
      composants: 'Components', histoire: 'Its story', appris: 'What I learned with this watch',
      precedente: 'Previous watch', suivante: 'Next watch', retour: 'All my watches',
      introuvable: 'This watch could not be found.', photoAVenir: 'Photo coming soon',
      vide: 'The first watches are coming soon.', voirPhoto: 'Show photo',
      lexique: 'glossary.html', autreLexique: 'lexique.html', dansLexique: 'In the glossary', mesMontres: 'My watches with this',
      voirAussi: 'See also', plus: 'Pros', moins: 'Cons', rechercher: 'Search for a word…', aucun: 'No word matches your search.',
      qrTitre: 'QR code for this watch’s card', partager: 'Share this watch', copie: 'Link copied!',
      qrAide: 'Save the image (right-click or long press), then print it on the back of the card. This section only appears when the address ends with &qr.'
    }
  }[lang];

  var EMBLEME = '<svg viewBox="66 66 368 368" aria-hidden="true"><defs><clipPath id="ce{id}"><circle cx="250" cy="250" r="172"/></clipPath></defs><circle cx="250" cy="250" r="184" fill="#0F2C33"/><circle cx="250" cy="250" r="176" fill="none" stroke="#C9A467" stroke-width="5"/><g clip-path="url(#ce{id})"><path d="M60,300 L118,300 C150,290 176,252 200,229 C212,218 220,214 228,222 C236,230 242,238 250,232 C262,222 272,196 288,190 C300,186 310,200 322,222 C340,254 360,286 400,300 L440,300 Z" fill="#1F4B53"/><rect x="60" y="300" width="380" height="140" fill="#12363D"/><path d="M70,322 q15,-8 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0" fill="none" stroke="#C9A467" stroke-width="4" stroke-linecap="round"/></g><g transform="translate(250 250) rotate(-55)"><polygon points="0,-92 -12,-12 0,18 12,-12" fill="#F4ECDD" stroke="#0B2227" stroke-width="2"/></g><g transform="translate(250 250) rotate(60)"><polygon points="0,-134 -11,-14 0,20 11,-14" fill="#C9A467" stroke="#0B2227" stroke-width="2"/></g><circle cx="250" cy="250" r="9" fill="#C9A467"/></svg>';
  var VAGUES = '<svg class="vagues" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0,40 C120,20 240,20 360,40 C480,60 600,60 720,40 C840,20 960,20 1080,40 C1200,60 1320,60 1440,40 L1440,70 L0,70 Z" fill="var(--fond)"/><path d="M0,40 C120,20 240,20 360,40 C480,60 600,60 720,40 C840,20 960,20 1080,40 C1200,60 1320,60 1440,40" fill="none" stroke="#C9A467" stroke-width="1.5" opacity=".6"/></svg>';
  var compteur = 0;
  function embleme() { compteur++; return EMBLEME.replace(/\{id\}/g, compteur); }

  function t(v) { return (v && typeof v === 'object') ? (v[lang] || v.fr || '') : (v || ''); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function paragraphes(texte) {
    return t(texte).split(/\n\s*\n/).filter(function (p) { return p.trim(); })
      .map(function (p) { return '<p>' + esc(p.trim()) + '</p>'; }).join('');
  }
  function num(n) { return String(n).padStart(3, '0'); }
  function dateLisible(d) {
    if (!d) return '';
    var p = String(d).split('-');
    try {
      return new Intl.DateTimeFormat(T.locale, { month: 'long', year: 'numeric' })
        .format(new Date(parseInt(p[0], 10), (parseInt(p[1], 10) || 1) - 1, 1));
    } catch (e) { return d; }
  }

  var liste = (typeof MONTRES !== 'undefined' ? MONTRES : []).slice()
    .sort(function (a, b) { return a.numero - b.numero; });

  var params = new URLSearchParams(location.search);
  var lienLangue = document.getElementById('lienLangue');

  /* ---------- Galerie ---------- */
  var galerie = document.getElementById('galerie');
  if (galerie) {
    if (lienLangue) lienLangue.href = T.autreGalerie;
    if (!liste.length) { galerie.outerHTML = '<p class="doux">' + esc(T.vide) + '</p>'; return; }
    galerie.innerHTML = liste.map(function (m) {
      var photo = m.photos && m.photos[0];
      var visuel = photo
        ? '<img src="' + esc(photo.src) + '" alt="' + esc(t(photo.alt)) + '" loading="lazy">'
        : '<div class="sans-photo">' + embleme() + '<span>' + esc(T.photoAVenir) + '</span></div>';
      return '<li><a class="vignette" href="' + T.fiche + '?n=' + m.numero + '">' +
        '<div class="visuel">' + visuel + '</div>' +
        '<p class="vignette__num">' + T.numero + ' ' + num(m.numero) + '</p>' +
        '<h2>' + esc(t(m.modele)) + '</h2>' +
        '<p class="vignette__date">' + esc(dateLisible(m.date)) + '</p>' +
        '</a></li>';
    }).join('');
  }

  /* ---------- Fiche d’une montre ---------- */
  var fiche = document.getElementById('fiche');
  if (fiche) {
    var n = parseInt(params.get('n'), 10);
    var i = liste.findIndex(function (m) { return m.numero === n; });
    if (lienLangue) lienLangue.href = T.autreFiche + (isNaN(n) ? '' : '?n=' + n);

    if (i < 0) {
      fiche.innerHTML = '<div class="conteneur section"><p class="titre-moyen">' + esc(T.introuvable) +
        '</p><p><a class="lien-fleche" href="' + T.galerie + '">← ' + esc(T.retour) + '</a></p></div>';
      return;
    }

    var m = liste[i];
    var prec = liste[i - 1], suiv = liste[i + 1];
    document.title = T.numero + ' ' + num(m.numero) + ' ' + t(m.modele) + ' – Les Aiguilles du Fenua';

    var photos = m.photos || [];
    var blocPhotos;
    if (photos.length) {
      blocPhotos = '<figure class="photo-principale"><img id="photoPrincipale" src="' + esc(photos[0].src) +
        '" alt="' + esc(t(photos[0].alt)) + '"></figure>';
      if (photos.length > 1) {
        blocPhotos += '<div class="miniatures">' + photos.map(function (p, k) {
          return '<button type="button" class="miniature" data-k="' + k + '" aria-label="' + esc(T.voirPhoto) + ' ' + (k + 1) + '"' +
            (k === 0 ? ' aria-current="true"' : '') + '><img src="' + esc(p.src) + '" alt=""></button>';
        }).join('') + '</div>';
      }
    } else {
      blocPhotos = '<div class="photo-principale sans-photo">' + embleme() + '<span>' + esc(T.photoAVenir) + '</span></div>';
    }

    function champ(label, valeur) {
      return '<div class="champ"><dt>' + esc(label) + '</dt><span class="points" aria-hidden="true"></span><dd>' + esc(valeur) + '</dd></div>';
    }

    var composants = (m.composants || []).map(function (c) {
      return '<div><dt>' + esc(t(c.nom)) + '</dt><dd>' + esc(t(c.valeur)) + '</dd></div>';
    }).join('');

    fiche.innerHTML =
      '<header class="entete entete--fiche"><div class="conteneur">' +
        '<a class="lien-fleche lien-fleche--clair" href="' + T.galerie + '">← ' + esc(T.retour) + '</a>' +
        '<p class="fiche__num">' + T.numero + ' ' + num(m.numero) + '</p>' +
        '<h1>' + esc(t(m.modele)) + '</h1>' +
        '<p class="entete__intro">' + esc(dateLisible(m.date)) + '</p>' +
      '</div>' + VAGUES + '</header>' +

      '<div class="conteneur section fiche-corps">' +
        '<div class="photos">' + blocPhotos + '</div>' +
        '<div class="infos">' +
          '<dl class="carte-fiche">' +
            champ(T.numero, num(m.numero)) +
            champ(T.modele, t(m.modele)) +
            champ(T.mouvement, t(m.mouvement)) +
            champ(T.date, dateLisible(m.date)) +
          '</dl>' +
          (m.histoire ? '<h2 class="titre-moyen">' + esc(T.histoire) + '</h2><div class="prose-fiche">' + paragraphes(m.histoire) + '</div>' : '') +
          (composants ? '<h2 class="titre-moyen">' + esc(T.composants) + '</h2><dl class="composants">' + composants + '</dl>' : '') +
          '<div id="ficheLexique"></div>' +
        '</div>' +
      '</div>' +

      '<div id="ficheCalibre"></div>' +
      (m.appris ? '<section class="appris"><div class="conteneur"><h2 class="titre-moyen">' + esc(T.appris) +
        '</h2><blockquote>' + paragraphes(m.appris) + '</blockquote></div></section>' : '') +

      '<nav class="conteneur suite" aria-label="' + esc(T.retour) + '">' +
        (prec ? '<a class="lien-fleche" href="' + T.fiche + '?n=' + prec.numero + '">← ' + esc(T.precedente) +
          '<span>' + T.numero + ' ' + num(prec.numero) + ' ' + esc(t(prec.modele)) + '</span></a>' : '<span></span>') +
        (suiv ? '<a class="lien-fleche suite__droite" href="' + T.fiche + '?n=' + suiv.numero + '">' + esc(T.suivante) +
          ' →<span>' + T.numero + ' ' + num(suiv.numero) + ' ' + esc(t(suiv.modele)) + '</span></a>' : '<span></span>') +
      '</nav>' +
      '<div class="conteneur partage"><button type="button" class="bouton-partage" id="boutonPartage">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>' +
        esc(T.partager) + '</button></div>' +

      (params.has('qr') ? '<section class="conteneur qr"><h2 class="titre-moyen">' + esc(T.qrTitre) +
        '</h2><div id="qrCode" class="qr__code"></div><p class="doux">' + esc(T.qrAide) + '</p></section>' : '');

    fiche.querySelectorAll('.miniature').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = photos[parseInt(b.dataset.k, 10)];
        var img = document.getElementById('photoPrincipale');
        img.src = p.src; img.alt = t(p.alt);
        fiche.querySelectorAll('.miniature').forEach(function (x) { x.removeAttribute('aria-current'); });
        b.setAttribute('aria-current', 'true');
      });
    });

    if (m.lexique && m.lexique.length) {
      avecLexique(function () {
        var pastilles = m.lexique.map(function (id) {
          var f = INDEX_LEXIQUE[id];
          return f ? '<li><a class="pastille" href="' + T.lexique + '#' + id + '">' + esc(t(f.nom)) + '</a></li>' : '';
        }).join('');
        if (pastilles) {
          document.getElementById('ficheLexique').innerHTML =
            '<h2 class="titre-moyen titre-lexique">' + esc(T.dansLexique) + '</h2><ul class="pastilles">' + pastilles + '</ul>';
        }
      });
    }

    avecScript('illustrations.js', 'ILLUSTRATIONS', function () { avecScript('calibres.js', 'CALIBRES', function () {
      var cal = calibreDe(m);
      if (cal) document.getElementById('ficheCalibre').innerHTML =
        '<section class="calibre-section"><div class="conteneur">' + carteCalibre(cal, false) + '</div></section>';
    }); });

    var bp = document.getElementById('boutonPartage');
    if (bp) bp.addEventListener('click', function () {
      var lien = location.origin + location.pathname.replace(/[^\/]*$/, '') + 'partage/montre-' + num(m.numero) + '.html';
      var titre = T.numero + ' ' + num(m.numero) + ' ' + t(m.modele) + ' – Les Aiguilles du Fenua';
      if (navigator.share) { navigator.share({ title: titre, url: lien }).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(lien).then(function () {
        var avant = bp.lastChild.textContent; bp.lastChild.textContent = T.copie;
        setTimeout(function () { bp.lastChild.textContent = avant; }, 2000);
      });
    });

    if (params.has('qr')) {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      s.onload = function () {
        // Le QR code pointe toujours vers la fiche en français ; le visiteur peut changer de langue ensuite.
        var adresse = location.origin + location.pathname.replace(/[^\/]*$/, '') + 'montre.html?n=' + m.numero;
        new QRCode(document.getElementById('qrCode'), {
          text: adresse, width: 220, height: 220, colorDark: '#0F2C33', colorLight: '#ffffff'
        });
      };
      document.head.appendChild(s);
    }
  }


  /* ---------- Calibres ---------- */
  var C_TXT = {
    fr: { titre: 'Fiche technique du calibre', type: 'Type', rubis: 'Rubis', freq: 'Fréquence', reserve: 'Réserve de marche', stop: 'Stop-seconde',
          manuel: 'Remontage manuel', date: 'Date', dim: 'Diamètre × hauteur', precision: 'Précision annoncée', aiguilles: 'Trous des aiguilles',
          oui: 'Oui', non: 'Non', heures: 'heures', alt: 'alternances/heure', montres: 'Mes montres équipées de ce calibre', section: 'Les calibres de mes montres',
          note: 'Valeurs du fabricant. En pratique, un mouvement bien réglé fait souvent bien mieux que la précision annoncée.' },
    en: { titre: 'Calibre specifications', type: 'Type', rubis: 'Jewels', freq: 'Frequency', reserve: 'Power reserve', stop: 'Hacking seconds',
          manuel: 'Hand-winding', date: 'Date', dim: 'Diameter × height', precision: 'Rated accuracy', aiguilles: 'Hand hole sizes',
          oui: 'Yes', non: 'No', heures: 'hours', alt: 'beats/hour', montres: 'My watches with this calibre', section: 'The calibres in my watches',
          note: 'Manufacturer figures. In practice, a well-regulated movement often does much better than its rated accuracy.' }
  }[lang];
  function avecScript(src, nom, suite) {
    var existe = (nom === 'CALIBRES' && typeof CALIBRES !== 'undefined') || (nom === 'ILLUSTRATIONS' && typeof ILLUSTRATIONS !== 'undefined');
    if (existe) { suite(); return; }
    var sc = document.createElement('script'); sc.src = src; sc.onload = suite; document.head.appendChild(sc);
  }
  function calibreDe(m) {
    if (typeof CALIBRES === 'undefined') return null;
    var mvt = (m.calibre || t(m.mouvement) || '').replace(/\s+/g, '').toUpperCase();
    return CALIBRES.filter(function (c) { return mvt.indexOf(c.id.replace(/\s+/g, '').toUpperCase()) >= 0; })[0] || null;
  }
  function nombre(x, dec) { return Number(x).toLocaleString(T.locale, { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }); }
  function carteCalibre(c, avecMontres) {
    var tuiles = [
      [C_TXT.type, t(c.type)],
      [C_TXT.rubis, c.rubis],
      [C_TXT.freq, nombre(c.alternances) + '<small>' + C_TXT.alt + ' · ' + nombre(c.alternances / 7200, 0) + ' Hz</small>'],
      [C_TXT.reserve, '≈ ' + c.reserve + ' ' + C_TXT.heures],
      [C_TXT.stop, c.stop ? C_TXT.oui : C_TXT.non],
      [C_TXT.manuel, c.manuel ? C_TXT.oui : C_TXT.non],
      [C_TXT.date, esc(t(c.date))],
      [C_TXT.dim, nombre(c.diametre, 1) + ' × ' + nombre(c.hauteur, 2) + ' mm'],
      [C_TXT.precision, esc(t(c.precision))]
    ];
    if (c.aiguilles) tuiles.push([C_TXT.aiguilles, esc(t(c.aiguilles))]);
    var liees = '';
    if (avecMontres) {
      liees = liste.filter(function (m) { var x = calibreDe(m); return x && x.id === c.id; }).map(function (m) {
        return '<li><a class="pastille pastille--montre" href="' + T.fiche + '?n=' + m.numero + '">' + T.numero + ' ' + num(m.numero) + ' ' + esc(t(m.modele)) + '</a></li>';
      }).join('');
    }
    var dessin = (typeof ILLUSTRATIONS !== 'undefined' && ILLUSTRATIONS['calibre-' + c.id]) ? ILLUSTRATIONS['calibre-' + c.id](lang) : '';
    return '<article class="calibre' + (dessin ? ' calibre--illustre' : '') + '" id="calibre-' + c.id + '"><div class="calibre__texte"><p class="calibre__sur">' + esc(C_TXT.titre) + '</p><h2 class="calibre__nom">' + esc(c.nom) + '</h2>' +
      '<p class="calibre__fab">' + esc(t(c.fabricant)) + '</p>' + paragraphes(c.texte) +
      '<dl class="calibre__tuiles">' + tuiles.map(function (x) { return '<div><dt>' + esc(x[0]) + '</dt><dd>' + x[1] + '</dd></div>'; }).join('') + '</dl>' +
      (liees ? '<p class="lex-sous">' + esc(C_TXT.montres) + '</p><ul class="pastilles">' + liees + '</ul>' : '') +
      '<p class="calibre__note">' + esc(C_TXT.note) + '</p></div>' +
      (dessin ? '<figure class="calibre__dessin">' + dessin + '<figcaption>' + esc(t(c.legende)) + '</figcaption></figure>' : '') + '</article>';
  }

  var listeCalibres = document.getElementById('calibres-liste');
  if (listeCalibres) {
    avecScript('illustrations.js', 'ILLUSTRATIONS', function () { avecScript('calibres.js', 'CALIBRES', function () {
      listeCalibres.innerHTML = '<div class="calibres-grille">' + CALIBRES.map(function (c) { return carteCalibre(c, true); }).join('') + '</div>';
      if (location.hash) { var cible = document.getElementById(location.hash.slice(1)); if (cible) cible.scrollIntoView(); }
    }); });
  }

  /* ---------- Lexique ---------- */
  var INDEX_LEXIQUE; // rempli par indexer()
  function indexer() {
    INDEX_LEXIQUE = {};
    (typeof LEXIQUE !== 'undefined' ? LEXIQUE : []).forEach(function (c) {
      (c.fiches || []).forEach(function (f) { INDEX_LEXIQUE[f.id] = f; });
    });
  }
  function avecLexique(suite) {
    if (typeof LEXIQUE !== 'undefined') { indexer(); suite(); return; }
    var sc = document.createElement('script');
    sc.src = 'lexique.js';
    sc.onload = function () { indexer(); suite(); };
    document.head.appendChild(sc);
  }
  function sansAccents(x) { return String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

  var lexique = document.getElementById('lexique');
  if (lexique) {
    if (lienLangue) lienLangue.href = T.autreLexique + location.hash;
    window.addEventListener('hashchange', function () { if (lienLangue) lienLangue.href = T.autreLexique + location.hash; });
    indexer();
    var cats = typeof LEXIQUE !== 'undefined' ? LEXIQUE : [];

    function liste_(arr) { return '<ul>' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }

    var html = '<nav class="lex-outils" aria-label="' + esc(T.dansLexique) + '"><ul class="lex-cats">' +
      cats.map(function (c) { return '<li><a href="#' + c.id + '">' + esc(t(c.nom)) + '</a></li>'; }).join('') +
      '</ul><input id="lexRecherche" class="lex-recherche" type="search" placeholder="' + esc(T.rechercher) + '" aria-label="' + esc(T.rechercher) + '"></nav>';

    html += cats.map(function (c) {
      var tableau = '';
      if (c.tableau) {
        var col = t(c.tableau.colonnes);
        tableau = '<div class="lex-tableau"><table><thead><tr>' + col.map(function (x) { return '<th scope="col">' + esc(x) + '</th>'; }).join('') +
          '</tr></thead><tbody>' + c.tableau.lignes.map(function (l) {
            var v = t(l);
            return '<tr><th scope="row">' + esc(v[0]) + '</th>' + v.slice(1).map(function (x) { return '<td>' + esc(x) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      }
      return '<section class="lex-cat" id="' + c.id + '"><h2 class="lex-cat__titre">' + esc(t(c.nom)) + '</h2>' +
        (c.intro ? '<p class="lex-cat__intro">' + esc(t(c.intro)) + '</p>' : '') + tableau +
        (c.schemas && typeof ILLUSTRATIONS !== 'undefined' ? c.schemas.map(function (sc) {
          var dessin = ILLUSTRATIONS[sc.illustration];
          return dessin ? '<figure class="lex-schema">' + dessin(lang) + (sc.legende ? '<figcaption>' + esc(t(sc.legende)) + '</figcaption>' : '') + '</figure>' : '';
        }).join('') : '') +
        '<div class="lex-grille">' + (c.fiches || []).map(function (f) {
          var montresLiees = liste.filter(function (m) { return (m.lexique || []).indexOf(f.id) >= 0; });
          var plus = t(f.plus), moins = t(f.moins);
          return '<article class="lex-fiche" id="' + f.id + '" data-texte="' + esc(sansAccents(t(f.nom) + ' ' + t(f.texte))) + '">' +
            (f.illustration && typeof ILLUSTRATIONS !== 'undefined' && ILLUSTRATIONS[f.illustration] ?
              '<figure class="lex-illu">' + ILLUSTRATIONS[f.illustration](lang) +
              (f.illustrationLegende ? '<figcaption>' + esc(t(f.illustrationLegende)) + '</figcaption>' : '') + '</figure>' : '') +
            '<h3>' + esc(t(f.nom)) + '</h3>' + paragraphes(f.texte) +
            ((plus && plus.length) || (moins && moins.length) ? '<div class="lex-pm">' +
              (plus && plus.length ? '<div><p class="lex-pm__titre lex-pm__titre--plus">' + esc(T.plus) + '</p>' + liste_(plus) + '</div>' : '') +
              (moins && moins.length ? '<div><p class="lex-pm__titre lex-pm__titre--moins">' + esc(T.moins) + '</p>' + liste_(moins) + '</div>' : '') +
            '</div>' : '') +
            (montresLiees.length ? '<p class="lex-sous">' + esc(T.mesMontres) + '</p><ul class="pastilles">' + montresLiees.map(function (m) {
              return '<li><a class="pastille pastille--montre" href="' + T.fiche + '?n=' + m.numero + '">' + T.numero + ' ' + num(m.numero) + ' ' + esc(t(m.modele)) + '</a></li>';
            }).join('') + '</ul>' : '') +
            (f.voir && f.voir.length ? '<p class="lex-voir">' + esc(T.voirAussi) + ' : ' + f.voir.filter(function (id) { return INDEX_LEXIQUE[id]; }).map(function (id) {
              return '<a href="#' + id + '">' + esc(t(INDEX_LEXIQUE[id].nom)) + '</a>';
            }).join(', ') + '</p>' : '') +
            '</article>';
        }).join('') + '</div></section>';
    }).join('');
    html += '<p id="lexAucun" class="doux" hidden>' + esc(T.aucun) + '</p>';
    lexique.innerHTML = html;

    if (location.hash) {
      var cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (cible) setTimeout(function () { cible.scrollIntoView(); }, 0);
    }

    document.getElementById('lexRecherche').addEventListener('input', function () {
      var q = sansAccents(this.value.trim());
      var total = 0;
      lexique.querySelectorAll('.lex-cat').forEach(function (sec) {
        if (!sec.querySelector('.lex-fiche')) { sec.hidden = !!q; return; }
        var vis = 0;
        sec.querySelectorAll('.lex-fiche').forEach(function (a) {
          var ok = !q || a.dataset.texte.indexOf(q) >= 0;
          a.hidden = !ok; if (ok) vis++;
        });
        sec.hidden = vis === 0; total += vis;
      });
      document.getElementById('lexAucun').hidden = total > 0;
    });
  }

  /* ---------- Ma progression ---------- */
  var P = {
    fr: { atteint: 'Atteint', encours: 'En cours', prochain: 'Prochaine étape', avenir: 'À venir', sur: 'sur', objectifs: 'objectifs atteints',
          objectif: 'objectif atteint', prochaine: 'Prochaine étape', voir: 'Voir ma progression →', montre: 'Montre' },
    en: { atteint: 'Achieved', encours: 'In progress', prochain: 'Next step', avenir: 'Coming later', sur: 'of', objectifs: 'goals achieved',
          objectif: 'goal achieved', prochaine: 'Next step', voir: 'See my progress →', montre: 'Watch' }
  }[lang];
  var progressionPage = lang === 'en' ? 'progress.html' : 'progression.html';
  var objectifs = typeof OBJECTIFS !== 'undefined' ? OBJECTIFS : [];
  var nbAtteints = objectifs.filter(function (o) { return o.statut === 'atteint'; }).length;
  var suivant = objectifs.filter(function (o) { return o.statut === 'prochain' || o.statut === 'encours'; })[0];

  function repere(o, i) {
    if (o.statut === 'atteint') return '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#C9A467"/><polyline points="14,25 21,32 34,17" fill="none" stroke="#0B2227" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var dernier = i === objectifs.length - 1;
    var contenu = dernier
      ? '<path d="M24 12 L27 21 L36 21 L29 27 L31.5 36 L24 30.5 L16.5 36 L19 27 L12 21 L21 21 Z" fill="currentColor"/>'
      : '<text x="24" y="30" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="600" font-size="19" fill="currentColor">' + (i + 1) + '</text>';
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="var(--fond)" stroke="currentColor" stroke-width="2.5"' +
      (o.statut === 'avenir' ? ' stroke-dasharray="4 3"' : '') + '/>' + contenu + '</svg>';
  }

  var progression = document.getElementById('progression');
  if (progression && objectifs.length) {
    var pct = Math.round(nbAtteints / objectifs.length * 100);
    progression.innerHTML =
      '<div class="prog-resume"><p class="prog-resume__chiffre"><strong>' + nbAtteints + '</strong> ' + P.sur + ' ' + objectifs.length + '</p>' +
      '<p class="prog-resume__texte">' + esc(nbAtteints > 1 ? P.objectifs : P.objectif) + '</p>' +
      '<div class="prog-barre" role="img" aria-label="' + pct + ' %"><span style="width:' + pct + '%"></span></div></div>' +
      '<ol class="chemin">' + objectifs.map(function (o, i) {
        var montres = (o.montres || []).map(function (n) {
          var m = liste.filter(function (x) { return x.numero === n; })[0];
          return '<li><a class="pastille pastille--montre" href="' + T.fiche + '?n=' + n + '">' + T.numero + ' ' + num(n) + (m ? ' ' + esc(t(m.modele)) : '') + '</a></li>';
        }).join('');
        var statut = P[o.statut] + (o.statut === 'atteint' && o.date ? ' · ' + esc(dateLisible(o.date)) : '');
        return '<li class="jalon jalon--' + o.statut + (i === objectifs.length - 1 ? ' jalon--dernier' : '') + '">' +
          '<div class="jalon__repere">' + repere(o, i) + '</div>' +
          '<div class="jalon__carte">' +
            '<p class="jalon__statut">' + statut + (o.etiquette ? '<span class="jalon__etiquette">' + esc(t(o.etiquette)) + '</span>' : '') + '</p>' +
            '<h2>' + esc(t(o.titre)) + '</h2>' + paragraphes(o.texte) +
            (o.note ? '<p class="jalon__note">' + esc(t(o.note)) + '</p>' : '') +
            (montres ? '<ul class="pastilles">' + montres + '</ul>' : '') +
          '</div></li>';
      }).join('') + '</ol>';
  }

  var apercu = document.getElementById('progression-apercu');
  if (apercu && objectifs.length) {
    apercu.innerHTML =
      '<ol class="apercu-points">' + objectifs.map(function (o, i) {
        return '<li class="apercu-point apercu-point--' + o.statut + '" title="' + esc(t(o.titre)) + '"><span>' + (o.statut === 'atteint' ? '✓' : (i + 1)) + '</span></li>';
      }).join('') + '</ol>' +
      '<p class="apercu-texte"><strong>' + nbAtteints + ' ' + P.sur + ' ' + objectifs.length + '</strong> ' + esc(nbAtteints > 1 ? P.objectifs : P.objectif) +
      (suivant ? '. ' + esc(P.prochaine) + (lang === 'en' ? ': ' : ' : ') + '<em>' + esc(t(suivant.titre)) + '</em>' : '') + '</p>' +
      '<a class="bouton" href="' + progressionPage + '">' + esc(P.voir) + '</a>';
  }

  /* ---------- Carnet d’atelier ---------- */
  var carnet = document.getElementById('carnet');
  if (carnet && typeof CARNET !== 'undefined') {
    var CT = lang === 'en' ? { fermer: 'Close', agrandir: 'Enlarge photo', montre: 'Watch', vide: 'The first notes are coming soon.' }
                           : { fermer: 'Fermer', agrandir: 'Agrandir la photo', montre: 'Montre', vide: 'Les premières notes arrivent bientôt.' };
    var seances = CARNET.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    if (!seances.length) { carnet.innerHTML = '<p class="doux">' + esc(CT.vide) + '</p>'; }
    else {
      carnet.innerHTML = '<ol class="carnet">' + seances.map(function (e, k) {
        var lien = '';
        if (typeof e.montre === 'number') {
          var mm = liste.filter(function (x) { return x.numero === e.montre; })[0];
          if (mm) lien = '<a class="pastille pastille--montre" href="' + T.fiche + '?n=' + mm.numero + '">' + T.numero + ' ' + num(mm.numero) + ' ' + esc(t(mm.modele)) + '</a>';
        }
        return '<li class="seance"><p class="seance__date">' + esc(dateLisible(e.date)) + '</p><h2 class="seance__titre">' + esc(t(e.titre)) + '</h2>' +
          (e.texte ? '<div class="seance__texte">' + t(e.texte).split(/\n\s*\n/).map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' : '') + (lien ? '<p>' + lien + '</p>' : '') +
          '<ol class="etapes-photos">' + (e.photos || []).map(function (ph, i) {
            return '<li><button type="button" class="vignette-photo' + (ph.portrait ? ' vignette-photo--portrait' : '') + '" data-src="' + esc(ph.src) + '" data-legende="' + esc(t(ph.legende)) + '" aria-label="' + esc(CT.agrandir) + '">' +
              '<img src="' + esc(ph.src) + '" alt="' + esc(t(ph.legende)) + '" loading="lazy"><span class="etape-num">' + (i + 1) + '</span></button>' +
              '<p>' + esc(t(ph.legende)) + '</p></li>';
          }).join('') + '</ol></li>';
      }).join('') + '</ol>';
      var dlg = document.createElement('dialog');
      dlg.className = 'visionneuse';
      dlg.innerHTML = '<button type="button" class="visionneuse__fermer" aria-label="' + esc(CT.fermer) + '">×</button><img alt=""><p></p>';
      document.body.appendChild(dlg);
      carnet.addEventListener('click', function (ev) {
        var b = ev.target.closest('.vignette-photo'); if (!b) return;
        dlg.querySelector('img').src = b.dataset.src; dlg.querySelector('img').alt = b.dataset.legende;
        dlg.querySelector('p').textContent = b.dataset.legende;
        if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      });
      dlg.querySelector('.visionneuse__fermer').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); });
    }
  }
})();
