# Composant bux2-heading

Ce composant permet d'afficher un heading.

Properties and attributes specific to this component:

| Properties    | Type      | Default | Description                   |
| :------------ | :-------- | :------ | :---------------------------- |
| level         | `number`  | 2       | valeur pour la balise h       |
| styleLevel    | `number`  | 2       | style à appliquer             |
| borderColored | `boolean` | false   | la bordure est-elle colorée ? |

Ce composant fonctionne avec 2 slots left, et right

## Exemple :

```html
Titre en Haut de page
<bux2-heading level="1" style-level="0">Digiposte</bux2-heading>

Titre avec Icone à gauche
<bux2-heading level="2" label="Digiposte" tabindex="0">
  <bux2-svg slot="left" icon="pret-reglemente"></bux2-svg>
  <span>Mes derniers relevés</span>
</bux2-heading>

Titre avec Icone à gauche et à droite
<bux2-heading level="2" tabindex="0">
  <bux2-svg slot="left" icon="shield"></bux2-svg>
  <span>Digiposte</span>
  <bux2-svg slot="right" icon="help"></bux2-svg>
</bux2-heading>
```
