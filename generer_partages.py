#!/usr/bin/env python3
"""
Crée une petite page de partage pour chaque montre de montres.js,
dans le dossier « partage ». Ces pages donnent à WhatsApp, Messenger,
Facebook ou Instagram la photo et le nom de la montre, puis renvoient
aussitôt le visiteur vers la fiche de la montre.

Utilisation, depuis le dossier du dépôt :
    python3 generer_partages.py

À relancer après chaque nouvelle montre ajoutée dans montres.js.
"""
import os, re, html

SITE = 'https://aiguillesdufenua.github.io/'
ICI = os.path.dirname(os.path.abspath(__file__))

def lire_montres():
    texte = open(os.path.join(ICI, 'montres.js'), encoding='utf-8').read()
    # on ignore les lignes commentées (par exemple les photos désactivées)
    texte = '\n'.join(l for l in texte.splitlines() if not l.strip().startswith('//'))
    debut = texte.index('const MONTRES')
    blocs = re.split(r'\n\s*\{\s*\n(?=\s*numero:)', texte[debut:])[1:]
    montres = []
    for b in blocs:
        n = re.search(r'numero:\s*(\d+)', b)
        if not n:
            continue
        modele = re.search(r'modele:\s*(?:\{\s*fr:\s*)?"((?:[^"\\]|\\.)*)"', b)
        photo = re.search(r'src:\s*"([^"]+)"', b)
        histoire = re.search(r'histoire:\s*(?:\{\s*fr:\s*)?"((?:[^"\\]|\\.)*)"', b)
        resume = ''
        if histoire:
            resume = histoire.group(1).replace('\\n', ' ').replace('\\"', '"')
            resume = re.sub(r'\s+', ' ', resume).strip()
            if len(resume) > 160:
                resume = resume[:157].rsplit(' ', 1)[0].rstrip('.,;:') + '…'
        montres.append(dict(numero=int(n.group(1)), modele=modele.group(1) if modele else '',
                            photo=photo.group(1) if photo else 'images/partage.jpg', resume=resume))
    return montres

def page(m):
    num = f'{m["numero"]:03d}'
    e = lambda x: html.escape(x, quote=True)
    titre = f'N° {num} {m["modele"]} – Les Aiguilles du Fenua'
    desc = m['resume'] or 'Une montre assemblée à la main à Tahiti par Les Aiguilles du Fenua.'
    adresse = f'{SITE}partage/montre-{num}.html'
    return f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(titre)}</title>
<meta name="description" content="{e(desc)}">
<meta name="robots" content="noindex">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Les Aiguilles du Fenua">
<meta property="og:title" content="{e(titre)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{adresse}">
<meta property="og:image" content="{SITE}{m['photo']}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=../montre.html?n={m['numero']}">
<script>
  var anglais = (navigator.language || '').toLowerCase().indexOf('en') === 0;
  location.replace((anglais ? '../watch.html' : '../montre.html') + '?n={m['numero']}');
</script>
<style>body {{ font-family: sans-serif; background: #0F2C33; color: #E6D2A8; text-align: center; padding: 4rem 1rem; }} a {{ color: #C9A467; }}</style>
</head>
<body>
<p><a href="../montre.html?n={m['numero']}">{e(titre)}</a></p>
</body>
</html>
'''

if __name__ == '__main__':
    dossier = os.path.join(ICI, 'partage')
    os.makedirs(dossier, exist_ok=True)
    for m in lire_montres():
        chemin = os.path.join(dossier, f'montre-{m["numero"]:03d}.html')
        open(chemin, 'w', encoding='utf-8').write(page(m))
        print('créée :', os.path.relpath(chemin, ICI), '→', m['modele'])
