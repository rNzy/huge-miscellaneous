# bux-row-simple

Ce composant affiche une ligne de contenu avec 2 éléments:

| Properties | Type     | Default | Description                |
| :--------- | :------- | :------ | :------------------------- |
| type       | `string` | normal  | permet de définir le style |

## Utilisation

```html
<bux-row-simple type="small">
  <bux-text>Avec un montant à droite</bux-text>
  <bux-amount data-value="-250" bold></bux-amount>
</bux-row-simple>
```
