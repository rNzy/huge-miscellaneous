# Composant bux2-key-value-item

Affiche une information à gauche (slot key) et une autre information à droite (slot value)

Ce composant est défini par des attributs :

| Properties | Type     | Default | Description                         |
| :--------- | :------- | :------ | :---------------------------------- |
| level      | `number` | ''      | permet de mettre une marge à gauche |

## Exemple :

```html
<bux2-key-value>
  <bux2-key-value-item
    ><div slot="key">Civilité</div>
    <div slot="value">Monsieur</div></bux2-key-value-item
  >
  <bux2-key-value-item level="2"
    ><div slot="key">Nom</div>
    <div slot="value">Spéciment</div></bux2-key-value-item
  >
  <bux2-key-value-item level="2"
    ><div slot="key">Prénom</div>
    <div slot="value">Jean</div></bux2-key-value-item
  >
</bux2-key-value>
```
