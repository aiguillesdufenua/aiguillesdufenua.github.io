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
      qrTitre: 'QR code pour la carte de cette montre',
      qrAide: 'Enregistrez l’image (clic droit ou appui long), puis imprimez-la au dos de la carte. Cette section n’apparaît que si l’adresse se termine par &qr.'
    },
    en: {
      fiche: 'watch.html', galerie: 'watches.html', autreFiche: 'montre.html', autreGalerie: 'montres.html',
      locale: 'en-GB', numero: 'No.', modele: 'Model', mouvement: 'Movement', date: 'Date',
      composants: 'Components', histoire: 'Its story', appris: 'What I learned with this watch',
      precedente: 'Previous watch', suivante: 'Next watch', retour: 'All my watches',
      introuvable: 'This watch could not be found.', photoAVenir: 'Photo coming soon',
      vide: 'The first watches are coming soon.', voirPhoto: 'Show photo',
      qrTitre: 'QR code for this watch’s card',
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
        '</div>' +
      '</div>' +

      (m.appris ? '<section class="appris"><div class="conteneur"><h2 class="titre-moyen">' + esc(T.appris) +
        '</h2><blockquote>' + paragraphes(m.appris) + '</blockquote></div></section>' : '') +

      '<nav class="conteneur suite" aria-label="' + esc(T.retour) + '">' +
        (prec ? '<a class="lien-fleche" href="' + T.fiche + '?n=' + prec.numero + '">← ' + esc(T.precedente) +
          '<span>' + T.numero + ' ' + num(prec.numero) + ' ' + esc(t(prec.modele)) + '</span></a>' : '<span></span>') +
        (suiv ? '<a class="lien-fleche suite__droite" href="' + T.fiche + '?n=' + suiv.numero + '">' + esc(T.suivante) +
          ' →<span>' + T.numero + ' ' + num(suiv.numero) + ' ' + esc(t(suiv.modele)) + '</span></a>' : '<span></span>') +
      '</nav>' +

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

})();
