/*
  Illustrations du lexique (dessinées en SVG, sans fichier image).
  Inutile de modifier ce fichier.
*/
const ILLUSTRATIONS = (function () {
  var SERIF = "'Cormorant Garamond', Georgia, serif";
  var SANS = "Jost, 'Helvetica Neue', Arial, sans-serif";
  var ACIER = '#B9C4C3', ACIER_F = '#6F8285', LAITON = '#C9A467', SABLE = '#E6D2A8', LUME = '#EDE6D3', NUIT = '#0B2227';

  function rad(a) { return a * Math.PI / 180; }
  function pt(cx, cy, r, a) { return [cx + r * Math.sin(rad(a)), cy - r * Math.cos(rad(a))]; }
  function f(n) { return Math.round(n * 10) / 10; }

  function graduations(cx, cy, r1, r2, n, w, couleur, grosTous, r2gros, wGros) {
    var s = '';
    for (var i = 0; i < n; i++) {
      var a = i * 360 / n, gros = grosTous && i % grosTous === 0;
      var p1 = pt(cx, cy, r1, a), p2 = pt(cx, cy, gros && r2gros ? r2gros : r2, a);
      s += '<line x1="' + f(p1[0]) + '" y1="' + f(p1[1]) + '" x2="' + f(p2[0]) + '" y2="' + f(p2[1]) +
        '" stroke="' + couleur + '" stroke-width="' + (gros && wGros ? wGros : w) + '" stroke-linecap="round"/>';
    }
    return s;
  }
  function chiffres(cx, cy, r, liste, taille, couleur, police, poids) {
    var s = '', n = liste.length;
    liste.forEach(function (txt, i) {
      if (txt === '') return;
      var p = pt(cx, cy, r, i * 360 / n);
      s += '<text x="' + f(p[0]) + '" y="' + f(p[1] + taille * 0.35) + '" text-anchor="middle" font-family="' + (police || SANS) +
        '" font-weight="' + (poids || 500) + '" font-size="' + taille + '" fill="' + couleur + '">' + txt + '</text>';
    });
    return s;
  }
  function aiguille(cx, cy, angle, type, L, w, couleur, contour) {
    var forme;
    if (type === 'epee') forme = '<polygon points="0,' + (-L) + ' ' + w + ',' + (-L + 3 * w) + ' ' + (w * 0.55) + ',12 ' + (-w * 0.55) + ',12 ' + (-w) + ',' + (-L + 3 * w) + '"';
    else if (type === 'dauphine') forme = '<polygon points="0,' + (-L) + ' ' + w + ',0 0,10 ' + (-w) + ',0"';
    else if (type === 'baton') forme = '<rect x="' + (-w / 2) + '" y="' + (-L) + '" width="' + w + '" height="' + (L + 10) + '" rx="' + (w / 2) + '"';
    else if (type === 'fleche') return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + angle + ')"><line x1="0" y1="10" x2="0" y2="' + (-L + 10) + '" stroke="' + couleur + '" stroke-width="' + w + '"/><polygon points="0,' + (-L) + ' 7,' + (-L + 14) + ' -7,' + (-L + 14) + '" fill="' + couleur + '"/></g>';
    else if (type === 'seconde') return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + angle + ')"><line x1="0" y1="18" x2="0" y2="' + (-L) + '" stroke="' + couleur + '" stroke-width="' + w + '" stroke-linecap="round"/>' +
      (contour ? '<circle cx="0" cy="' + (-L + 14) + '" r="4" fill="' + contour + '" stroke="' + couleur + '" stroke-width="1.2"/>' : '') + '</g>';
    return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + angle + ')">' + forme + ' fill="' + couleur + '" stroke="' + (contour || NUIT) + '" stroke-width="1" stroke-linejoin="round"/></g>';
  }
  function bracelet(cx, largeur, couleur, details) {
    var x = cx - largeur / 2;
    return '<rect x="' + x + '" y="-5" width="' + largeur + '" height="310" fill="' + couleur + '"/>' + (details || '');
  }
  function cornes(cx, cy, ecart, couleur, contour) {
    var s = '';
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (d) {
      var x = cx + d[0] * ecart - (d[0] < 0 ? 18 : 0), y = d[1] < 0 ? cy - 104 : cy + 64;
      s += '<rect x="' + x + '" y="' + y + '" width="18" height="40" rx="6" fill="' + couleur + '" stroke="' + contour + '" stroke-width="1.2"/>';
    });
    return s;
  }
  function couronne(cx, cy, rBoite, h, l, couleur) {
    var x = cx + rBoite - 4, s = '<rect x="' + x + '" y="' + (cy - h / 2) + '" width="' + l + '" height="' + h + '" rx="3" fill="' + couleur + '" stroke="' + ACIER_F + '" stroke-width="1"/>';
    for (var k = 4; k < l - 2; k += 4) s += '<line x1="' + (x + k) + '" y1="' + (cy - h / 2 + 3) + '" x2="' + (x + k) + '" y2="' + (cy + h / 2 - 3) + '" stroke="' + ACIER_F + '" stroke-width="1"/>';
    return s;
  }
  function svg(contenu, label, vb) {
    return '<svg viewBox="' + (vb || '0 0 300 300') + '" role="img" aria-label="' + label + '">' + contenu + '</svg>';
  }

  var CX = 150, CY = 150;

  /* ---------- Types de montres ---------- */
  function plongee(lang) {
    var s = bracelet(CX, 76, '#1A2E33', '<g stroke="#11242A" stroke-width="3">' + [20, 34, 48, 252, 266, 280].map(function (y) { return '<line x1="116" y1="' + y + '" x2="184" y2="' + y + '"/>'; }).join('') + '</g>');
    s += cornes(CX, CY, 40, ACIER, ACIER_F);
    s += '<circle cx="150" cy="150" r="104" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>';
    s += couronne(CX, CY, 104, 26, 16, ACIER);
    s += '<circle cx="150" cy="150" r="99" fill="' + NUIT + '"/>';
    s += graduations(CX, CY, 96, 90, 60, 1.2, SABLE, 5, 86, 2.2);
    s += chiffres(CX, CY, 88, ['', '', '10', '', '20', '', '30', '', '40', '', '50', ''], 11, SABLE);
    s += '<polygon points="150,54 143,66 157,66" fill="' + LUME + '"/>';
    s += '<circle cx="150" cy="150" r="80" fill="#0E3A4A"/>';
    for (var i = 0; i < 12; i++) {
      var p = pt(CX, CY, 64, i * 30);
      if (i === 0) s += '<polygon points="150,76 141,92 159,92" fill="' + LUME + '" stroke="#9FB0AE" stroke-width="1"/>';
      else if (i % 3 === 0) s += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (i * 30) + ')"><rect x="-4" y="-10" width="8" height="20" rx="2" fill="' + LUME + '" stroke="#9FB0AE" stroke-width="1"/></g>';
      else s += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="6" fill="' + LUME + '" stroke="#9FB0AE" stroke-width="1"/>';
    }
    s += aiguille(CX, CY, 305, 'epee', 44, 7, LUME, '#9FB0AE') + aiguille(CX, CY, 60, 'epee', 62, 6, LUME, '#9FB0AE') + aiguille(CX, CY, 200, 'seconde', 70, 1.8, LAITON, LUME);
    s += '<circle cx="150" cy="150" r="5" fill="' + LAITON + '"/>';
    return svg(s, lang === 'en' ? 'Typical dive watch' : 'Montre de plongée type');
  }

  function field(lang) {
    var s = bracelet(CX, 70, '#56603F', '<g stroke="#454E32" stroke-width="1.5" stroke-dasharray="4 3"><line x1="122" y1="0" x2="122" y2="60"/><line x1="178" y1="0" x2="178" y2="60"/><line x1="122" y1="240" x2="122" y2="300"/><line x1="178" y1="240" x2="178" y2="300"/></g>');
    s += cornes(CX, CY, 37, ACIER, ACIER_F);
    s += '<circle cx="150" cy="150" r="98" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>';
    s += couronne(CX, CY, 98, 22, 13, ACIER);
    s += '<circle cx="150" cy="150" r="90" fill="#101A1C"/>';
    s += graduations(CX, CY, 86, 80, 60, 1, '#C8C3B4', 5, 78, 1.8);
    s += chiffres(CX, CY, 64, ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], 17, '#EDE6D3', SANS, 500);
    s += chiffres(CX, CY, 44, ['24', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], 8, '#9FB0AE');
    s += aiguille(CX, CY, 305, 'epee', 40, 6, '#EDE6D3', '#7C8A88') + aiguille(CX, CY, 60, 'epee', 66, 5, '#EDE6D3', '#7C8A88') + aiguille(CX, CY, 200, 'seconde', 76, 1.5, '#D98B4B');
    s += '<circle cx="150" cy="150" r="4" fill="#D98B4B"/>';
    return svg(s, lang === 'en' ? 'Typical field watch' : 'Montre de terrain type');
  }

  function dress(lang) {
    var or = '#C9A467', orF = '#8C6D38';
    var s = bracelet(CX, 64, '#6B4226', '<g stroke="#A97B55" stroke-width="1" stroke-dasharray="3 3" fill="none"><line x1="123" y1="0" x2="123" y2="66"/><line x1="177" y1="0" x2="177" y2="66"/><line x1="123" y1="234" x2="123" y2="300"/><line x1="177" y1="234" x2="177" y2="300"/></g>');
    s += '<g transform="translate(0 6)">' + cornes(CX, CY, 33, or, orF) + '</g>';
    s += '<circle cx="150" cy="150" r="90" fill="' + or + '" stroke="' + orF + '" stroke-width="1.5"/>';
    s += couronne(CX, CY, 90, 16, 10, or);
    s += '<circle cx="150" cy="150" r="85" fill="#F3EBDD"/>';
    s += graduations(CX, CY, 80, 78, 60, 0.8, '#B9A27A', 0);
    for (var i = 0; i < 12; i++) {
      var p = pt(CX, CY, 66, i * 30), long = i === 0 ? 16 : 12;
      s += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (i * 30) + ')">' +
        (i === 0 ? '<rect x="-4.5" y="-8" width="3" height="' + long + '" fill="' + or + '"/><rect x="1.5" y="-8" width="3" height="' + long + '" fill="' + or + '"/>'
          : '<rect x="-1.5" y="-6" width="3" height="' + long + '" fill="' + or + '"/>') + '</g>';
    }
    s += aiguille(CX, CY, 305, 'dauphine', 42, 4.5, or, orF) + aiguille(CX, CY, 60, 'dauphine', 64, 4, or, orF);
    s += '<circle cx="150" cy="150" r="3.5" fill="' + or + '"/>';
    return svg(s, lang === 'en' ? 'Typical dress watch' : 'Montre habillée type');
  }

  function gmt(lang) {
    var s = bracelet(CX, 76, '#8E9C9D', '<g stroke="#6F8285" stroke-width="1.2">' + [12, 30, 48, 252, 270, 288].map(function (y) { return '<line x1="112" y1="' + y + '" x2="188" y2="' + y + '"/>'; }).join('') + '<line x1="137" y1="0" x2="137" y2="300"/><line x1="163" y1="0" x2="163" y2="300"/></g>');
    s += cornes(CX, CY, 40, ACIER, ACIER_F);
    s += '<circle cx="150" cy="150" r="104" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>';
    s += couronne(CX, CY, 104, 24, 15, ACIER);
    s += '<path d="M 51,150 A 99,99 0 0 1 249,150 Z" fill="#2B6B73"/><path d="M 51,150 A 99,99 0 0 0 249,150 Z" fill="' + NUIT + '"/>';
    s += chiffres(CX, CY, 89, ['', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'], 10.5, SABLE);
    s += '<polygon points="150,55 144,65 156,65" fill="' + LUME + '"/>';
    s += '<circle cx="150" cy="150" r="79" fill="#12262B"/>';
    for (var i = 0; i < 12; i++) {
      var p = pt(CX, CY, 64, i * 30);
      s += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (i * 30) + ')"><rect x="' + (i === 0 ? -6 : -3.5) + '" y="-9" width="' + (i === 0 ? 12 : 7) + '" height="18" rx="2" fill="' + LUME + '" stroke="#9FB0AE" stroke-width="1"/></g>';
    }
    s += aiguille(CX, CY, 140, 'fleche', 74, 2, LAITON);
    s += aiguille(CX, CY, 305, 'epee', 42, 6.5, LUME, '#9FB0AE') + aiguille(CX, CY, 60, 'epee', 62, 5.5, LUME, '#9FB0AE') + aiguille(CX, CY, 230, 'seconde', 70, 1.5, LUME);
    s += '<circle cx="150" cy="150" r="5" fill="' + LAITON + '"/>';
    return svg(s, lang === 'en' ? 'Typical GMT watch' : 'Montre GMT type');
  }

  function chronographe(lang) {
    var s = bracelet(CX, 72, '#3A2A20', '');
    s += cornes(CX, CY, 38, ACIER, ACIER_F);
    // poussoirs à 2 h et 4 h
    [60, 120].forEach(function (a) {
      s += '<g transform="translate(150 150) rotate(' + (a - 90) + ')"><rect x="96" y="-7" width="16" height="14" rx="3" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1"/></g>';
    });
    s += '<circle cx="150" cy="150" r="100" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>';
    s += couronne(CX, CY, 100, 22, 13, ACIER);
    s += '<circle cx="150" cy="150" r="92" fill="#EEEAE1"/>';
    s += graduations(CX, CY, 89, 83, 60, 0.9, '#3E4B4D', 5, 80, 1.6);
    for (var i = 0; i < 12; i++) {
      if (i % 3 === 0 && i !== 0) continue;
      var p = pt(CX, CY, 70, i * 30);
      s += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (i * 30) + ')"><rect x="-2" y="-8" width="4" height="16" fill="#3E4B4D"/></g>';
    }
    [[198, 150], [150, 198], [102, 150]].forEach(function (c, k) {
      s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="22" fill="#12343B"/>' + graduations(c[0], c[1], 20, 16, 12, 1, SABLE, 0);
      s += aiguille(c[0], c[1], [40, 200, 300][k], 'seconde', 15, 1.5, SABLE);
    });
    s += aiguille(CX, CY, 305, 'baton', 48, 5, '#3E4B4D', '#2A3537') + aiguille(CX, CY, 60, 'baton', 70, 4, '#3E4B4D', '#2A3537');
    s += aiguille(CX, CY, 0, 'seconde', 82, 1.4, '#B4533C');
    s += '<circle cx="150" cy="150" r="4" fill="#B4533C"/>';
    return svg(s, lang === 'en' ? 'Typical chronograph' : 'Chronographe type');
  }

  function pilote(lang) {
    var s = bracelet(CX, 78, '#5A3D2B', '<g fill="#C9B79C">' + [[128, 30], [172, 30], [128, 270], [172, 270]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="3.5"/>'; }).join('') + '</g>');
    s += cornes(CX, CY, 41, ACIER, ACIER_F);
    s += '<circle cx="150" cy="150" r="108" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>';
    // couronne « oignon » surdimensionnée
    s += '<rect x="254" y="132" width="24" height="36" rx="10" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1"/>' +
      [258, 263, 268, 273].map(function (x) { return '<line x1="' + x + '" y1="136" x2="' + x + '" y2="164" stroke="' + ACIER_F + '" stroke-width="1"/>'; }).join('');
    s += '<circle cx="150" cy="150" r="102" fill="#0E1416"/>';
    s += graduations(CX, CY, 98, 91, 60, 1, '#D8D4C8', 5, 88, 1.8);
    s += chiffres(CX, CY, 74, ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], 19, '#EDE6D3', SANS, 500);
    s += '<polygon points="150,84 140,66 160,66" fill="#EDE6D3"/><circle cx="137" cy="66" r="2.6" fill="#EDE6D3"/><circle cx="163" cy="66" r="2.6" fill="#EDE6D3"/>';
    s += aiguille(CX, CY, 305, 'epee', 46, 7, '#EDE6D3', '#7C8A88') + aiguille(CX, CY, 60, 'epee', 74, 6, '#EDE6D3', '#7C8A88') + aiguille(CX, CY, 200, 'seconde', 84, 1.5, '#EDE6D3');
    s += '<circle cx="150" cy="150" r="5" fill="#EDE6D3"/>';
    return svg(s, lang === 'en' ? 'Typical pilot watch' : 'Montre d’aviateur type');
  }


  /* ---------- Mouvements (vus du dos de la montre) ---------- */
  var PLATINE = '#C3CBCB', PLATINE_F = '#8E9C9D', RUBIS = '#B4334A', BLEUI = '#2B4C7E', DORE = '#C9A467', DORE_F = '#8C6D38';

  function rubis(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="4.2" fill="' + DORE + '" stroke="' + DORE_F + '" stroke-width=".8"/><circle cx="' + x + '" cy="' + y + '" r="2.4" fill="' + RUBIS + '"/>'; }
  function vis(x, y, a) {
    var p1 = pt(x, y, 3.2, a || 30), p2 = pt(x, y, 3.2, (a || 30) + 180);
    return '<circle cx="' + x + '" cy="' + y + '" r="4.3" fill="' + BLEUI + '" stroke="#1B3157" stroke-width=".8"/><line x1="' + f(p1[0]) + '" y1="' + f(p1[1]) + '" x2="' + f(p2[0]) + '" y2="' + f(p2[1]) + '" stroke="#9DB3D6" stroke-width="1.2"/>';
  }
  function roue(x, y, r, couleur, dents, classe, origine) {
    var tour = 2 * Math.PI * (r + 2), pas = tour / (dents || 40);
    var g = '<g' + (classe ? ' class="' + classe + '" style="transform-origin:' + x + 'px ' + y + 'px"' : '') + '>' +
      '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 2) + '" fill="none" stroke="' + couleur + '" stroke-width="4" stroke-dasharray="' + f(pas / 2) + ' ' + f(pas / 2) + '"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + couleur + '" stroke="' + DORE_F + '" stroke-width=".8"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="' + f(r * 0.72) + '" fill="#4A5A5C" opacity=".55"/>';
    for (var k = 0; k < 4; k++) {
      var a = pt(x, y, r * 0.72, k * 90 + 20), b = pt(x, y, r * 0.72, k * 90 + 200);
      if (k < 2) g += '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="' + couleur + '" stroke-width="' + f(Math.max(2, r * 0.18)) + '"/>';
    }
    return g + '<circle cx="' + x + '" cy="' + y + '" r="' + f(Math.max(2.5, r * 0.18)) + '" fill="' + DORE + '" stroke="' + DORE_F + '" stroke-width=".6"/></g>';
  }
  function balancier(x, y, r) {
    var spirale = 'M ' + x + ',' + y;
    for (var k = 1; k <= 60; k++) { var p = pt(x, y, 2 + k * (r - 6) / 60, k * 24); spirale += ' L ' + f(p[0]) + ',' + f(p[1]); }
    return '<g class="anim-balancier" style="transform-origin:' + x + 'px ' + y + 'px">' +
      '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + DORE + '" stroke-width="4.5"/>' +
      '<line x1="' + (x - r) + '" y1="' + y + '" x2="' + (x + r) + '" y2="' + y + '" stroke="' + DORE + '" stroke-width="3"/>' +
      '</g><path d="' + spirale + '" fill="none" stroke="#5E7072" stroke-width=".9"/>';
  }
  function cotes(id, cx, cy, r, couleur) {
    var s = '<clipPath id="' + id + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/></clipPath><g clip-path="url(#' + id + ')" stroke="' + couleur + '" stroke-width="7" opacity=".35">';
    for (var x = cx - r - 40; x < cx + r + 40; x += 14) s += '<line x1="' + x + '" y1="' + (cy - r - 20) + '" x2="' + (x + 40) + '" y2="' + (cy + r + 20) + '"/>';
    return s + '</g>';
  }
  function boiteMouvement(contenu, label) {
    var s = '<circle cx="150" cy="150" r="128" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>' +
      '<circle cx="150" cy="150" r="120" fill="#22383D"/>' +
      // tige et couronne : vue du dos, la couronne se trouve à gauche
      '<rect x="6" y="140" width="22" height="20" fill="' + ACIER + '" stroke="' + ACIER_F + '"/><rect x="0" y="132" width="14" height="36" rx="4" fill="' + ACIER + '" stroke="' + ACIER_F + '"/>' +
      '<line x1="26" y1="150" x2="58" y2="150" stroke="' + PLATINE_F + '" stroke-width="3"/>';
    return svg(s + contenu, label);
  }

  function mvtAutomatique(lang) {
    var s = '<circle cx="150" cy="150" r="112" fill="' + PLATINE + '" stroke="' + PLATINE_F + '" stroke-width="1.2"/>' + cotes('ca', 150, 150, 112, '#FFFFFF');
    // ponts et rouage
    s += '<path d="M 62,120 Q 120,70 205,78 L 212,112 Q 140,112 80,150 Z" fill="#B3BCBC" stroke="' + PLATINE_F + '"/>';
    s += roue(196, 196, 20, DORE, 48) + roue(170, 230, 12, DORE, 30);
    s += '<path d="M 70,176 Q 92,150 140,170 L 132,226 Q 100,238 78,222 Z" fill="#B3BCBC" stroke="' + PLATINE_F + '"/>';
    s += balancier(104, 202, 26);
    s += rubis(104, 202) + rubis(196, 196) + rubis(170, 230) + rubis(150, 100) + rubis(120, 96);
    s += vis(72, 136) + vis(200, 88) + vis(132, 216) + vis(84, 216) + vis(228, 168);
    // rotor
    s += '<g class="anim-rotor" style="transform-origin:150px 150px">' +
      '<path d="M 46,150 A 104,104 0 0 1 254,150 L 186,150 A 36,36 0 0 0 114,150 Z" fill="' + DORE + '" stroke="' + DORE_F + '" stroke-width="1.2"/>' +
      '<path d="M 60,150 A 90,90 0 0 1 240,150" fill="none" stroke="' + DORE_F + '" stroke-width="1" opacity=".6"/>' +
      '<path d="M 74,150 A 76,76 0 0 1 226,150" fill="none" stroke="' + DORE_F + '" stroke-width="1" opacity=".4"/>' +
      '<path d="M 88,150 A 62,62 0 0 1 212,150" fill="none" stroke="' + DORE_F + '" stroke-width="1" opacity=".4"/>' +
      '<rect x="114" y="146" width="72" height="8" fill="' + DORE + '"/>' +
      '</g>';
    s += '<circle cx="150" cy="150" r="13" fill="' + PLATINE + '" stroke="' + PLATINE_F + '"/><circle cx="150" cy="150" r="6" fill="' + BLEUI + '"/>';
    return boiteMouvement(s, lang === 'en' ? 'Automatic movement seen from the back, with its golden rotor' : 'Mouvement automatique vu du dos, avec son rotor doré');
  }

  function mvtManuel(lang) {
    var s = '<circle cx="150" cy="150" r="112" fill="' + PLATINE + '" stroke="' + PLATINE_F + '" stroke-width="1.2"/>';
    // pont de barillet
    s += '<path d="M 58,118 Q 90,58 168,52 Q 230,58 238,110 Q 200,140 150,138 Q 96,140 58,118 Z" fill="#B3BCBC" stroke="' + PLATINE_F + '"/>' + cotes('cm', 150, 150, 112, '#FFFFFF');
    s += roue(150, 96, 34, '#D2D8D8', 60) + roue(92, 102, 14, '#D2D8D8', 30);
    s += '<circle cx="150" cy="96" r="7" fill="' + PLATINE + '" stroke="' + PLATINE_F + '"/>';
    // pont de rouage
    s += '<path d="M 150,150 Q 210,140 238,170 Q 230,214 196,236 Q 168,214 150,190 Z" fill="#B3BCBC" stroke="' + PLATINE_F + '"/>';
    s += roue(176, 168, 13, DORE, 34) + roue(210, 196, 9, DORE, 26);
    // coq et balancier
    s += '<path d="M 60,190 Q 76,160 118,170 L 140,214 Q 120,240 86,236 Z" fill="#B3BCBC" stroke="' + PLATINE_F + '"/>';
    s += balancier(104, 202, 28);
    s += rubis(104, 202) + rubis(176, 168) + rubis(210, 196) + rubis(150, 150) + rubis(196, 224);
    s += vis(150, 96, 70) + vis(92, 102, 10) + vis(70, 118) + vis(226, 104) + vis(232, 178) + vis(66, 214) + vis(134, 222);
    return boiteMouvement(s, lang === 'en' ? 'Hand-wound movement seen from the back, with its wheels and balance' : 'Mouvement à remontage manuel vu du dos, avec ses roues et son balancier');
  }

  function mvtQuartz(lang) {
    var s = '<circle cx="150" cy="150" r="112" fill="#3A4648" stroke="#22383D" stroke-width="1.2"/>';
    // circuit imprimé
    s += '<path d="M 60,96 L 150,70 L 236,104 L 236,150 L 150,150 L 120,186 L 60,170 Z" fill="#2F5B4F" stroke="#1F3F37"/>';
    s += '<g fill="none" stroke="' + DORE + '" stroke-width="1.6" opacity=".85"><path d="M 74,110 L 120,96 L 170,96"/><path d="M 80,150 L 112,140 L 150,120 L 200,120"/><path d="M 196,108 L 226,122"/></g>';
    s += '<rect x="132" y="104" width="22" height="16" rx="2" fill="#151C1D"/><g stroke="#AAB5B5" stroke-width="1">' + [136, 141, 146, 151].map(function (x) { return '<line x1="' + x + '" y1="101" x2="' + x + '" y2="104"/><line x1="' + x + '" y1="120" x2="' + x + '" y2="123"/>'; }).join('') + '</g>';
    // quartz (petit cylindre)
    s += '<rect x="186" y="128" width="40" height="11" rx="5.5" fill="#D5DADA" stroke="#8E9C9D"/><line x1="182" y1="133.5" x2="186" y2="133.5" stroke="#D5DADA" stroke-width="1.5"/>';
    // bobine du moteur
    s += '<rect x="70" y="122" width="44" height="22" rx="3" fill="#B87333" stroke="#7A4A20"/><g stroke="#8F5726" stroke-width="1">' +
      [74, 78, 82, 86, 90, 94, 98, 102, 106, 110].map(function (x) { return '<line x1="' + x + '" y1="123" x2="' + x + '" y2="143"/>'; }).join('') + '</g>';
    // pile
    s += '<circle cx="190" cy="196" r="38" fill="#D5DADA" stroke="#8E9C9D" stroke-width="1.5"/><circle cx="190" cy="196" r="31" fill="none" stroke="#B3BCBC"/>' +
      '<text x="190" y="194" text-anchor="middle" font-family="' + SANS + '" font-weight="500" font-size="20" fill="#5E7072">+</text>' +
      '<text x="190" y="212" text-anchor="middle" font-family="' + SANS + '" font-size="10" fill="#5E7072">' + (lang === 'en' ? '1.55 V' : '1,55 V') + '</text>';
    s += '<path d="M 156,176 Q 150,196 158,218" fill="none" stroke="' + DORE + '" stroke-width="3"/>';
    // rouage avec roue qui avance par pas
    s += roue(112, 206, 16, DORE, 36, 'anim-pas') + roue(132, 176, 8, DORE, 20);
    s += vis(74, 104) + vis(226, 96) + vis(84, 222) + vis(232, 160);
    return boiteMouvement(s, lang === 'en' ? 'Quartz movement seen from the back, with its battery, coil and circuit' : 'Mouvement à quartz vu du dos, avec sa pile, sa bobine et son circuit');
  }

  /* ---------- Schémas d’anatomie ---------- */
  var L = {
    fr: {
      lunette: 'Lunette', rehaut: 'Rehaut', heures: 'Aiguille des heures', verre: 'Verre', cadran: 'Cadran', index: 'Index',
      cornes: 'Cornes', bracelet: 'Bracelet', entrecornes: 'Entrecornes', minutes: 'Aiguille des minutes', couronne: 'Couronne',
      date: 'Guichet de date', trotteuse: 'Trotteuse', boitier: 'Boîtier', mouvement: 'Mouvement', rotor: 'Rotor', fond: 'Fond de boîte',
      aiguilles: 'Aiguilles', tige: 'Tige de remontoir', carrure: 'Boîtier (carrure)',
      face: 'Schéma d’une montre vue de face, avec le nom de chaque pièce', coupe: 'Schéma d’une montre vue en coupe'
    },
    en: {
      lunette: 'Bezel', rehaut: 'Chapter ring', heures: 'Hour hand', verre: 'Crystal', cadran: 'Dial', index: 'Indices',
      cornes: 'Lugs', bracelet: 'Strap', entrecornes: 'Lug width', minutes: 'Minute hand', couronne: 'Crown',
      date: 'Date window', trotteuse: 'Seconds hand', boitier: 'Case', mouvement: 'Movement', rotor: 'Rotor', fond: 'Case back',
      aiguilles: 'Hands', tige: 'Winding stem', carrure: 'Case (middle)',
      face: 'Diagram of a watch seen from the front, naming each part', coupe: 'Cross-section diagram of a watch'
    }
  };

  // étiquette reliée à un point par un trait coudé ; lien vers la fiche si id
  function etiquette(cote, xTexte, yTexte, xCoude, cible, texte, id) {
    var x1 = cote === 'g' ? xTexte + 8 : xTexte - 8;
    var trait = '<polyline points="' + x1 + ',' + yTexte + ' ' + xCoude + ',' + yTexte + ' ' + f(cible[0]) + ',' + f(cible[1]) + '" fill="none" stroke="' + SABLE + '" stroke-width="1" opacity=".75"/>' +
      '<circle cx="' + f(cible[0]) + '" cy="' + f(cible[1]) + '" r="3.2" fill="' + LAITON + '" stroke="' + NUIT + '" stroke-width="1"/>';
    var txt = '<text x="' + xTexte + '" y="' + (yTexte + 5) + '" text-anchor="' + (cote === 'g' ? 'end' : 'start') + '" font-family="' + SANS + '" font-size="15" fill="' + (id ? LAITON : SABLE) + '"' + (id ? ' text-decoration="underline"' : '') + '>' + texte + '</text>';
    return trait + (id ? '<a href="#' + id + '">' + txt + '</a>' : txt);
  }

  function anatomieFace(lang) {
    var t = L[lang], cx = 340, cy = 220, s = '';
    // bracelet et cornes
    s += '<rect x="300" y="-5" width="80" height="450" fill="#22383D"/>';
    s += '<g stroke="#2F4A50" stroke-width="1.2" stroke-dasharray="4 3"><line x1="308" y1="0" x2="308" y2="88"/><line x1="372" y1="0" x2="372" y2="88"/><line x1="308" y1="352" x2="308" y2="440"/><line x1="372" y1="352" x2="372" y2="440"/></g>';
    [[280, 66], [382, 66], [280, 330], [382, 330]].forEach(function (c) { s += '<rect x="' + c[0] + '" y="' + c[1] + '" width="18" height="44" rx="6" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.2"/>'; });
    // boîtier, couronne, lunette
    s += '<circle cx="340" cy="220" r="128" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.5"/>';
    s += '<rect x="462" y="206" width="12" height="28" fill="' + ACIER + '" stroke="' + ACIER_F + '"/><rect x="472" y="200" width="20" height="40" rx="4" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.2"/>' +
      [477, 482, 487].map(function (x) { return '<line x1="' + x + '" y1="205" x2="' + x + '" y2="235" stroke="' + ACIER_F + '"/>'; }).join('');
    s += '<circle cx="340" cy="220" r="122" fill="' + NUIT + '"/>';
    s += graduations(cx, cy, 119, 113, 60, 1.2, SABLE, 5, 108, 2.4);
    s += '<polygon points="340,100 333,112 347,112" fill="' + LUME + '"/>';
    // rehaut et cadran
    s += '<circle cx="340" cy="220" r="104" fill="#1F4B53"/>';
    s += graduations(cx, cy, 103, 97, 60, 1, SABLE, 5, 94, 2);
    s += '<circle cx="340" cy="220" r="92" fill="#0F2C33"/>';
    for (var i = 0; i < 12; i++) {
      if (i === 3) continue;
      var p = pt(cx, cy, 78, i * 30);
      s += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (i * 30) + ')"><rect x="' + (i === 0 ? -6 : -3.5) + '" y="-10" width="' + (i === 0 ? 12 : 7) + '" height="20" rx="2" fill="' + LUME + '" stroke="#9FB0AE" stroke-width="1"/></g>';
    }
    s += '<rect x="400" y="209" width="32" height="22" rx="2" fill="#F8F4EC" stroke="' + LAITON + '"/><text x="416" y="225" text-anchor="middle" font-family="' + SANS + '" font-weight="500" font-size="14" fill="#12343B">27</text>';
    s += aiguille(cx, cy, 305, 'epee', 54, 8, LUME, '#9FB0AE') + aiguille(cx, cy, 60, 'epee', 78, 7, LUME, '#9FB0AE') + aiguille(cx, cy, 150, 'seconde', 86, 1.8, LAITON, LUME);
    s += '<circle cx="340" cy="220" r="6" fill="' + LAITON + '"/>';
    // reflet du verre
    s += '<path d="M 252,190 A 92,92 0 0 1 318,131" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity=".14"/>';
    // cote entrecornes
    s += '<g stroke="' + SABLE + '" stroke-width="1"><line x1="298" y1="40" x2="382" y2="40"/><line x1="298" y1="33" x2="298" y2="47"/><line x1="382" y1="33" x2="382" y2="47"/></g>';

    // étiquettes gauche (x texte 168, coude 190)
    var g = [
      [62, pt(cx, cy, 119, 318), t.lunette, 'lunette'],
      [112, [280, 157], t.verre, 'verre-saphir'],
      [162, pt(cx, cy, 100, 292), t.rehaut, 'rehaut'],
      [212, pt(cx, cy, 34, 305), t.heures, null],
      [262, pt(cx, cy, 52, 225), t.cadran, 'cadran'],
      [312, pt(cx, cy, 78, 240), t.index, 'index'],
      [362, [289, 352], t.cornes, 'cornes'],
      [412, [318, 410], t.bracelet, null]
    ];
    g.forEach(function (e) { s += etiquette('g', 168, e[0], 196, e[1], e[2], e[3]); });
    var d = [
      [40, [382, 40], t.entrecornes, 'entrecornes'],
      [112, pt(cx, cy, 58, 60), t.minutes, null],
      [172, [492, 212], t.couronne, 'couronne'],
      [232, [432, 228], t.date, null],
      [292, pt(cx, cy, 64, 150), t.trotteuse, 'trotteuse'],
      [352, pt(cx, cy, 125, 140), t.boitier, 'boitier']
    ];
    d.forEach(function (e) { s += etiquette('d', 528, e[0], 508, e[1], e[2], e[3]); });
    return svg(s, t.face, '0 0 680 440');
  }

  function anatomieCoupe(lang) {
    var t = L[lang], s = '';
    // fond de boîte
    s += '<path d="M 212,232 L 468,232 L 460,250 Q 340,262 220,250 Z" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.2"/>';
    // carrure (parois)
    s += '<path d="M 192,140 L 218,140 L 218,232 L 200,232 Q 190,190 192,140 Z" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.2"/>';
    s += '<path d="M 488,140 L 462,140 L 462,178 L 476,178 L 476,196 L 462,196 L 462,232 L 480,232 Q 490,190 488,140 Z" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.2"/>';
    // lunette
    s += '<path d="M 196,140 L 204,122 L 476,122 L 484,140 Z" fill="#1F4B53" stroke="' + ACIER_F + '" stroke-width="1.2"/>';
    // verre bombé
    s += '<path d="M 222,124 Q 340,84 458,124 L 458,130 Q 340,92 222,130 Z" fill="#9CC7CF" fill-opacity=".45" stroke="#CFE4E8" stroke-width="1"/>';
    // cadran
    s += '<rect x="220" y="152" width="240" height="6" fill="#0F2C33" stroke="' + LAITON + '" stroke-width=".8"/>';
    // aiguilles
    s += '<rect x="338" y="134" width="4" height="18" fill="' + LAITON + '"/><rect x="300" y="146" width="44" height="2.5" fill="' + LUME + '"/><rect x="336" y="141" width="70" height="2.5" fill="' + LUME + '"/><rect x="330" y="136" width="58" height="1.4" fill="' + LAITON + '"/>';
    // mouvement
    s += '<rect x="230" y="162" width="220" height="50" rx="4" fill="#1F4B53" stroke="' + SABLE + '" stroke-width="1" stroke-dasharray="5 3"/>';
    s += '<g fill="none" stroke="' + SABLE + '" stroke-width="1" opacity=".7"><circle cx="280" cy="187" r="14"/><circle cx="320" cy="187" r="9"/><circle cx="395" cy="187" r="16"/></g>';
    // rotor
    s += '<path d="M 252,214 L 428,214 Q 420,230 340,230 Q 260,230 252,214 Z" fill="' + LAITON + '" stroke="#8C6D38" stroke-width="1"/>';
    // tige et couronne
    s += '<line x1="440" y1="187" x2="512" y2="187" stroke="' + SABLE + '" stroke-width="3"/>';
    s += '<rect x="506" y="170" width="28" height="34" rx="5" fill="' + ACIER + '" stroke="' + ACIER_F + '" stroke-width="1.2"/>' +
      [512, 518, 524, 530].map(function (x) { return '<line x1="' + x + '" y1="174" x2="' + x + '" y2="200" stroke="' + ACIER_F + '"/>'; }).join('');

    var g = [
      [60, [300, 102], t.verre, 'verre-saphir'],
      [105, [210, 131], t.lunette, 'lunette'],
      [150, [236, 155], t.cadran, 'cadran'],
      [195, [246, 190], t.mouvement, 'automatique'],
      [240, [290, 224], t.rotor, 'rotor'],
      [285, [240, 247], t.fond, 'fond']
    ];
    g.forEach(function (e) { s += etiquette('g', 168, e[0], 190, e[1], e[2], e[3]); });
    var d = [
      [70, [372, 137], t.aiguilles, null],
      [130, [480, 155], t.carrure, 'boitier'],
      [187, [534, 187], t.couronne, 'couronne'],
      [245, [495, 189], t.tige, null]
    ];
    d.forEach(function (e) { s += etiquette('d', 566, e[0], 550, e[1], e[2], e[3]); });
    return svg(s, t.coupe, '0 0 700 300');
  }

  return {
    automatique: mvtAutomatique, manuel: mvtManuel, quartz: mvtQuartz,
    plongee: plongee, field: field, dress: dress, gmt: gmt, chronographe: chronographe, pilote: pilote,
    'anatomie-face': anatomieFace, 'anatomie-coupe': anatomieCoupe
  };
})();
