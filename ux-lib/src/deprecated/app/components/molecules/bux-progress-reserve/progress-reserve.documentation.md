# Progress reserve documentation

Ce composant affiche une progress ring, un label et un montant.

Il est définit par ces attributs:

| Properties  | Type     | Default | Description                                               |
| :---------- | :------- | :------ | :-------------------------------------------------------- |
| data-value  | `number` | 0       | exprime une valeur sur 100                                |
| data-label  | `string` | -       | correspond au label                                       |
| data-amount | `string` | -       | correspond à la valeur du montant                         |
| a11y-label  | `string` | -       | permet de vocaliser cet élément pour les lecteurs d'écran |

## Utilisation

```html
<bux-progress-reserve
  data-progress-value="15"
  data-label="Réserve disponible"
  data-amount="950.50"
  a11y-label="décrire pour accessibilité"
>
</bux-progress-reserve>
```
