/*
  Infobulles du lexique : les mots techniques des pages sont soulignés
  discrètement ; au survol (ou d’un toucher sur téléphone), une bulle
  affiche leur définition, avec un lien vers la fiche complète.
  Une seule infobulle par mot et par page. Inutile de modifier ce fichier.
*/
(function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  var PAGE_LEXIQUE = lang === 'en' ? 'glossary.html' : 'lexique.html';
  var TXT = lang === 'en' ? { voir: 'Read the full entry →', fermer: 'Close' } : { voir: 'Lire la fiche complète →', fermer: 'Fermer' };
  // zones où l’on ne pose jamais d’infobulle
  var EXCLUS = 'a, button, summary, h1, h2, h3, h4, h5, h6, nav, header, footer, svg, figcaption, script, style, label, input, select, textarea, .terme, .bulle, .barre, .pastilles, .carte-fiche, .champ, .lex-fiche, .calibre__tuiles dd, .calibre__sur';

  function charger(suite) {
    if (typeof LEXIQUE !== 'undefined') { suite(); return; }
    var s = document.createElement('script');
    s.src = 'lexique.js';
    s.onload = suite;
    document.head.appendChild(s);
  }

  function t(v) { return v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] || v.fr || '') : (v || ''); }
  function echapperRegex(x) { return x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function resume(texte) {
    var premier = t(texte).split(/\n\s*\n/)[0];
    var phrases = premier.match(/[^.!?]+[.!?]+/g) || [premier];
    var r = phrases[0];
    if (r.length < 90 && phrases[1]) r += phrases[1];
    if (r.length > 230) r = r.slice(0, 227).replace(/\s+\S*$/, '') + '…';
    return r.trim();
  }

  function styles() {
    var css = document.createElement('style');
    css.textContent =
      '.terme { text-decoration: underline dotted #C9A467; text-decoration-thickness: 1.5px; text-underline-offset: .22em; cursor: help; border-radius: 2px; }' +
      '.terme:hover, .terme:focus-visible, .terme[aria-expanded="true"] { background: rgba(201,164,103,.16); outline: none; }' +
      '.bulle { position: absolute; z-index: 80; width: min(300px, calc(100vw - 24px)); padding: .9rem 1.05rem 1rem; border-radius: 12px;' +
      ' background: #0B2227; color: #D7CBB1; border: 1px solid rgba(201,164,103,.5); box-shadow: 0 18px 40px -16px rgba(0,0,0,.6);' +
      ' font-family: Jost, "Helvetica Neue", Arial, sans-serif; font-size: .93rem; line-height: 1.5; text-align: left;' +
      ' opacity: 0; transform: translateY(4px); transition: opacity .15s ease, transform .15s ease; pointer-events: none; }' +
      '.bulle.visible { opacity: 1; transform: none; pointer-events: auto; }' +
      '.bulle strong { display: block; font-family: "Cormorant Garamond", Georgia, serif; font-weight: 600; font-size: 1.25rem; line-height: 1.15; color: #F1E2C2; margin: 0 1.4rem .35rem 0; }' +
      '.bulle p { margin: 0 0 .6rem; }' +
      '.bulle a { color: #C9A467; text-decoration: none; font-weight: 500; }' +
      '.bulle a:hover { text-decoration: underline; text-underline-offset: .2em; }' +
      '.bulle button { position: absolute; top: .45rem; right: .5rem; width: 1.6rem; height: 1.6rem; border: 0; border-radius: 50%; background: none; color: #AFC0BD; font-size: 1.1rem; line-height: 1; cursor: pointer; }' +
      '.bulle button:hover { color: #F1E2C2; }' +
      '.bulle::before { content: ""; position: absolute; left: var(--fleche, 24px); width: 10px; height: 10px; background: #0B2227; border: solid rgba(201,164,103,.5); transform: rotate(45deg); }' +
      '.bulle.dessous::before { top: -6px; border-width: 1px 0 0 1px; }' +
      '.bulle.dessus::before { bottom: -6px; border-width: 0 1px 1px 0; }' +
      '@media (prefers-reduced-motion: reduce) { .bulle { transition: none; } }';
    document.head.appendChild(css);
  }

  function preparer() {
    if (typeof LEXIQUE === 'undefined') return;
    var fiches = {};
    var motifs = [];
    LEXIQUE.forEach(function (c) {
      (c.fiches || []).forEach(function (f) {
        fiches[f.id] = f;
        var termes = f.termes ? (f.termes[lang] || []) : [];
        termes.forEach(function (m) { motifs.push({ mot: m, id: f.id }); });
      });
    });
    if (!motifs.length) return;
    motifs.sort(function (a, b) { return b.mot.length - a.mot.length; });
    var parId = {};
    motifs.forEach(function (m) { (parId[m.mot.toLowerCase()] = m.id); });
    var lettres = 'A-Za-zÀ-ÖØ-öø-ÿŒœ';
    var regex = new RegExp('(^|[^' + lettres + '\\-’\'])(' + motifs.map(function (m) { return echapperRegex(m.mot); }).join('|') + ')(?![' + lettres + '\\-])', 'i');
    var dejaVus = {};
    var zone = document.querySelector('main') || document.body;

    var marcheur = document.createTreeWalker(zone, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest(EXCLUS)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var noeuds = [];
    while (marcheur.nextNode()) noeuds.push(marcheur.currentNode);

    noeuds.forEach(function (noeud) {
      var texte = noeud.nodeValue, debut = 0, morceaux = [], trouve = false;
      while (true) {
        var reste = texte.slice(debut), m = regex.exec(reste);
        if (!m) break;
        var id = parId[m[2].toLowerCase()];
        var pos = debut + m.index + m[1].length;
        if (!id || dejaVus[id]) { debut = pos + m[2].length; continue; }
        dejaVus[id] = true; trouve = true;
        morceaux.push(document.createTextNode(texte.slice(0, pos).slice(morceaux.consomme || 0)));
        var span = document.createElement('span');
        span.className = 'terme'; span.tabIndex = 0; span.dataset.id = id;
        span.setAttribute('role', 'button'); span.setAttribute('aria-expanded', 'false');
        span.textContent = m[2];
        morceaux.push(span);
        morceaux.consomme = pos + m[2].length;
        debut = morceaux.consomme;
      }
      if (!trouve) return;
      morceaux.push(document.createTextNode(texte.slice(morceaux.consomme)));
      var frag = document.createDocumentFragment();
      morceaux.forEach(function (x) { frag.appendChild(x); });
      noeud.parentNode.replaceChild(frag, noeud);
    });

    if (!document.querySelector('.terme')) return;
    styles();

    var bulle = document.createElement('div');
    bulle.className = 'bulle'; bulle.setAttribute('role', 'tooltip'); bulle.id = 'bulle-lexique';
    document.body.appendChild(bulle);
    var actif = null, minuterie = null, ouvertA = 0;

    function placer(el) {
      var r = el.getBoundingClientRect(), bw = bulle.offsetWidth, bh = bulle.offsetHeight;
      var x = Math.min(Math.max(12, r.left + window.scrollX + r.width / 2 - 28), window.scrollX + document.documentElement.clientWidth - bw - 12);
      var dessous = r.bottom + bh + 14 < window.innerHeight || r.top < bh + 14;
      var y = dessous ? r.bottom + window.scrollY + 10 : r.top + window.scrollY - bh - 10;
      bulle.classList.toggle('dessous', dessous); bulle.classList.toggle('dessus', !dessous);
      bulle.style.left = x + 'px'; bulle.style.top = y + 'px';
      bulle.style.setProperty('--fleche', Math.min(Math.max(14, r.left + window.scrollX + r.width / 2 - x - 5), bw - 24) + 'px');
    }
    function ouvrir(el) {
      clearTimeout(minuterie);
      if (actif === el) return;
      if (actif) actif.setAttribute('aria-expanded', 'false');
      var f = fiches[el.dataset.id];
      bulle.innerHTML = '<button type="button" aria-label="' + TXT.fermer + '">×</button><strong></strong><p></p><a></a>';
      bulle.querySelector('strong').textContent = t(f.nom);
      bulle.querySelector('p').textContent = resume(f.texte);
      var lien = bulle.querySelector('a'); lien.href = PAGE_LEXIQUE + '#' + f.id; lien.textContent = TXT.voir;
      bulle.querySelector('button').addEventListener('click', function (e) { e.stopPropagation(); fermer(); });
      actif = el; ouvertA = Date.now(); el.setAttribute('aria-expanded', 'true'); el.setAttribute('aria-describedby', 'bulle-lexique');
      bulle.classList.add('visible'); placer(el);
    }
    function fermer() {
      clearTimeout(minuterie);
      bulle.classList.remove('visible');
      if (actif) { actif.setAttribute('aria-expanded', 'false'); actif.removeAttribute('aria-describedby'); }
      actif = null;
    }
    function fermerBientot() { clearTimeout(minuterie); minuterie = setTimeout(fermer, 250); }

    var survol = window.matchMedia('(hover: hover)').matches;
    document.querySelectorAll('.terme').forEach(function (el) {
      if (survol) {
        el.addEventListener('mouseenter', function () { ouvrir(el); });
        el.addEventListener('mouseleave', fermerBientot);
      }
      el.addEventListener('focus', function () { ouvrir(el); });
      el.addEventListener('click', function (e) { e.stopPropagation(); if (actif === el && !survol && Date.now() - ouvertA > 400) fermer(); else ouvrir(el); });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ouvrir(el); bulle.querySelector('a').focus(); } });
    });
    bulle.addEventListener('mouseenter', function () { clearTimeout(minuterie); });
    bulle.addEventListener('mouseleave', fermerBientot);
    bulle.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', fermer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
    window.addEventListener('resize', function () { if (actif) placer(actif); });
  }

  function lancer() { charger(preparer); }
  // les fiches montres sont dessinées par site.js : on attend la fin du chargement
  if (document.readyState === 'complete') lancer(); else window.addEventListener('load', lancer);
})();
