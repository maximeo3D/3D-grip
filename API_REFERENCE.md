# 🎮 API de contrôle externe - 3D Grip Viewer

## 🚀 Test rapide dans la console

Ouvrez la console du navigateur sur votre page `index.html` et testez directement :

```javascript
// Changer la couleur
window.gripViewerAPI.setColor('black');  // Options: 'black', 'sand', 'kaki'

// Changer l'option de rail
window.gripViewerAPI.setOption('mlok');  // Options: 'mlok', 'picatinny'

// Aller à un viewpoint
window.gripViewerAPI.gotoViewpoint(1);   // 1 ou 2

// Obtenir l'état actuel
const state = window.gripViewerAPI.getState();
console.log(state);
```

## 📦 Utilisation en iframe

### 1. Intégrer l'iframe dans votre site

```html
<iframe 
    id="grip-viewer" 
    src="https://votre-domaine.com/index.html" 
    width="100%" 
    height="600px"
></iframe>
```

### 2. Contrôler depuis la page parent

```javascript
const iframe = document.getElementById('grip-viewer');

// Envoyer une commande
function controlViewer(action, value) {
    iframe.contentWindow.postMessage({
        action: action,
        color: value,      // pour 'setColor'
        option: value,     // pour 'setOption'
        viewpoint: value   // pour 'gotoViewpoint'
    }, '*'); // ⚠️ En production, remplacez '*' par votre domaine exact
}

// Exemples
controlViewer('setColor', 'black');
controlViewer('setOption', 'picatinny');
controlViewer('gotoViewpoint', 2);
```

### 3. Écouter les réponses

```javascript
window.addEventListener('message', function(event) {
    if (event.data.type === 'gripViewerResponse') {
        console.log('Action:', event.data.action);
        console.log('Succès:', event.data.result.success);
        
        // Si on demande l'état
        if (event.data.action === 'getState') {
            console.log('État actuel:', event.data.result.state);
        }
    }
});
```

## 🔐 Sécurité en production

Pour sécuriser les communications postMessage, ajoutez une vérification d'origine dans `index.html` :

```javascript
window.addEventListener('message', function(event) {
    // ✅ Vérifier l'origine
    if (event.origin !== 'https://votre-site-autorise.com') {
        console.warn('Origine non autorisée:', event.origin);
        return;
    }
    
    // ... reste du code
});
```

Et dans votre page parent :

```javascript
iframe.contentWindow.postMessage(message, 'https://domaine-de-iframe.com');
```

## 📝 API complète

### `window.gripViewerAPI.setColor(color)`
Change la couleur du grip.

**Paramètres:**
- `color` (string): `'black'`, `'sand'`, ou `'kaki'`

**Retourne:** `boolean` - `true` si succès, `false` sinon

**Exemple:**
```javascript
window.gripViewerAPI.setColor('sand');
```

---

### `window.gripViewerAPI.setOption(option)`
Change le type de rail.

**Paramètres:**
- `option` (string): `'mlok'` ou `'picatinny'`

**Retourne:** `boolean` - `true` si succès, `false` sinon

**Exemple:**
```javascript
window.gripViewerAPI.setOption('picatinny');
```

---

### `window.gripViewerAPI.gotoViewpoint(viewpointNumber)`
Déplace la caméra vers un point de vue prédéfini.

**Paramètres:**
- `viewpointNumber` (number): `1` ou `2`

**Retourne:** `boolean` - `true` si succès, `false` sinon

**Exemple:**
```javascript
window.gripViewerAPI.gotoViewpoint(2);
```

---

### `window.gripViewerAPI.getState()`
Récupère l'état actuel du viewer.

**Retourne:** `object` - État actuel avec:
- `activeTags` (array): Tags actifs
- `materials` (object): Matériaux appliqués
- `engravingText` (string): Texte de gravure

**Exemple:**
```javascript
const state = window.gripViewerAPI.getState();
console.log(state);
// {
//   activeTags: ['mlok'],
//   materials: { grip_mlok: 'black', grip_picatinny: 'black' },
//   engravingText: ''
// }
```

## 🧪 Test avec la page de démonstration

1. Ouvrez `test-iframe.html` dans votre navigateur
2. Utilisez les boutons pour contrôler l'iframe
3. Observez la console pour voir les messages échangés

## 🌐 Paramètres URL (à venir)

Vous pouvez aussi passer des paramètres dans l'URL :

```html
<iframe src="index.html?color=sand&option=mlok"></iframe>
```

## 💡 Cas d'usage

### E-commerce
```javascript
// Synchroniser avec la sélection produit
document.getElementById('color-select').addEventListener('change', (e) => {
    window.gripViewerAPI.setColor(e.target.value);
});
```

### Configuration en temps réel
```javascript
// Sauvegarder la configuration
function saveConfiguration() {
    const state = window.gripViewerAPI.getState();
    localStorage.setItem('grip-config', JSON.stringify(state));
}

// Charger la configuration
function loadConfiguration() {
    const saved = JSON.parse(localStorage.getItem('grip-config'));
    if (saved.materials.grip_mlok) {
        window.gripViewerAPI.setColor(saved.materials.grip_mlok);
    }
}
```

## 🐛 Debugging

Si les commandes ne fonctionnent pas :

1. **Vérifier que l'iframe est chargée :**
```javascript
iframe.addEventListener('load', () => {
    console.log('✅ Iframe prête');
    // Maintenant vous pouvez envoyer des commandes
});
```

2. **Vérifier la console :**
```javascript
// Les messages d'erreur apparaîtront dans la console
window.gripViewerAPI.setColor('invalid'); // ⚠️ Warning: Invalid color
```

3. **Attendre que TagManager soit prêt :**
```javascript
// Dans index.html, le système attend ~2s que tout soit initialisé
// Si vous envoyez des commandes trop tôt, attendez un peu
setTimeout(() => {
    window.gripViewerAPI.setColor('black');
}, 2000);
```

## 📞 Support

Pour toute question ou problème, consultez les logs de la console avec les préfixes :
- `📤` Message envoyé
- `📥` Message reçu  
- `✅` Succès
- `⚠️` Avertissement

