# ⭐ EvalHub

**La plateforme gratuite et simple pour évaluer tous vos projets (santé, technologie, éducation, etc.)**

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0-blue)

## 🌐 Accès en ligne

**[Accéder à EvalHub](https://kjmb2006-cmyk.github.io/EvalHub/)**

L'application est hébergée gratuitement sur GitHub Pages et fonctionne sur tous les appareils (ordinateur, tablette, téléphone).

## ✨ Fonctionnalités

### Évaluation de projets
- ⭐ Notation sur 5 étoiles avec 5 critères essentiels:
  - **Qualité**: Niveau de qualité du projet
  - **Coût**: Analyse du rapport coût/bénéfice
  - **Impact**: Potentiel d'impact du projet
  - **Délai**: Faisabilité du calendrier
  - **Viabilité**: Durabilité à long terme

### Gestion des projets
- ➕ Créer de nouveaux projets
- ✏️ Modifier les projets existants
- 🗑️ Supprimer les projets
- 🔍 Rechercher rapidement vos projets
- 🏷️ Filtrer par catégorie

### Catégories
- 🏥 Santé
- 💻 Technologie
- 📚 Éducation
- 🏗️ Infrastructure
- 🌱 Environnement
- 📋 Autre

### Analyse et comparaison
- 📊 Tableau de bord avec statistiques en temps réel
- 🔄 Comparer 2-3 projets côte à côte
- 📈 Graphiques de distribution par catégorie
- 📝 Commentaires et notes pour chaque projet

### Export et sauvegarde
- 📥 Exporter en JSON (sauvegarde complète)
- 📊 Exporter en CSV (pour Excel/Sheets)
- 💾 Stockage local sécurisé

### Interface
- 🌙 Mode sombre/clair
- 📱 Design responsive (mobile, tablette, desktop)
- ⚡ Application rapide (pas de serveur nécessaire)
- 🔒 Vos données restent chez vous

## 🚀 Démarrage rapide

### En ligne (recommandé)
1. Allez sur: **[https://kjmb2006-cmyk.github.io/EvalHub/](https://kjmb2006-cmyk.github.io/EvalHub/)**
2. Commencez à créer vos projets!

### En local
1. Clonez le référentiel:
```bash
git clone https://github.com/kjmb2006-cmyk/EvalHub.git
cd EvalHub
```

2. Ouvrez `index.html` dans votre navigateur
```bash
# Sur Mac
open index.html

# Sur Windows
start index.html

# Ou utilisez un serveur local
python -m http.server 8000
# Puis allez sur http://localhost:8000
```

## 📁 Structure du projet

```
EvalHub/
├── index.html              # Page d'accueil
├── app.html               # Application principale
├── css/
│   └── style.css          # Styles et design responsive
├── js/
│   ├── app.js            # Logique principale
│   ├── storage.js        # Gestion du stockage local
│   └── utils.js          # Fonctions utilitaires
├── README.md             # Ce fichier
└── .gitignore            # Fichiers à ignorer
```

## 💡 Utilisation

### Créer un projet
1. Cliquez sur "➕ Nouveau projet"
2. Remplissez les informations du projet
3. Ajustez les critères avec les curseurs (1-5)
4. Cliquez "Créer le projet"

### Évaluer un projet
- Chaque projet reçoit une note moyenne basée sur 5 critères
- La note finale est la moyenne de tous les critères
- Les notes sont sauvegardées automatiquement

### Comparer des projets
1. Allez dans "🔄 Comparer"
2. Sélectionnez 2 ou 3 projets
3. Cliquez "Comparer"
4. Visualisez les résultats côte à côte

### Exporter vos données
1. Allez dans "⚙️ Paramètres"
2. Choisissez le format:
   - **JSON**: Sauvegarde complète (pour restaurer plus tard)
   - **CSV**: Pour ouvrir dans Excel/Sheets

## 🔧 Configuration

### Pas de configuration requise!
- L'application utilise le stockage local du navigateur
- Les données ne sont jamais envoyées à un serveur
- Fonctionne hors ligne une fois chargée

### Limitations du navigateur
- Stockage limité à ~5-10 MB par navigateur
- Les données sont liées au navigateur (pas de synchronisation cross-device)
- Solution: Utilisez l'export JSON pour transférer entre appareils

## 🌐 Hébergement

EvalHub est hébergé gratuitement sur **GitHub Pages**:
- Accessible 24/7
- Pas de coûts d'hébergement
- Déploiement automatique à chaque mise à jour

## 🔒 Sécurité et confidentialité

- ✅ **Aucune donnée personnelle n'est collectée**
- ✅ **Vos données restent sur votre appareil**
- ✅ **Pas de compte requis**
- ✅ **Pas de tracking ou publicités**
- ✅ **Code source ouvert** (audit possible)

## 📝 License

MIT License - Libre d'utilisation à des fins commerciales et personnelles

## 🤝 Contribution

Les contributions sont bienvenues! Pour contribuer:

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 🐛 Signaler un bug

Trouvez un bug? Ouvrez une issue sur GitHub:
[Issues](https://github.com/kjmb2006-cmyk/EvalHub/issues)

## 💬 Suggestions

Avez une idée de fonctionnalité? Partagez-la:
[Discussions](https://github.com/kjmb2006-cmyk/EvalHub/discussions)

## 📞 Support

Besoin d'aide?
- 📧 Ouvrez une issue GitHub
- 🔍 Consultez la documentation
- 💭 Regardez les questions fréquentes

## 🎯 Roadmap (Futures fonctionnalités)

- [ ] Synchronisation avec le cloud (Firebase)
- [ ] Collaboration en temps réel
- [ ] Modèles d'évaluation personnalisés
- [ ] Intégrations API
- [ ] Applications mobiles natives
- [ ] Support multilingue
- [ ] Tableaux de bord avancés
- [ ] Gestion des équipes

## 📊 Statistiques

- **Nombre de critères**: 5
- **Catégories**: 6
- **Format d'export**: JSON, CSV
- **Espace de stockage**: Illimité (côté client)
- **Temps de charge**: < 1 seconde

## 🙏 Remerciements

Merci à tous les utilisateurs et contributeurs qui font que EvalHub est meilleur chaque jour!

---

**Créé avec ❤️ pour évaluer vos projets simplement et gratuitement**

*Dernière mise à jour: 2026*
