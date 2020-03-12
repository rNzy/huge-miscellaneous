# Composant bux-datatable

Ce composant affiche une table de données

| Properties   | Type     | Default | Description                       |
| :----------- | :------- | :------ | :-------------------------------- |
| data-caption | `string` | -       | text descriptif du tableau entier |

## Exemple d'utilisation

```html
<bux-datatable data-caption="caption this table thing">
  <bux-datatable-head>
    <div>Date</div>
    <div>Heure</div>
    <div>Support de connexion</div>
  </bux-datatable-head>

  <bux-datatable-row>
    <div>21/02/2019</div>
    <div>20h34</div>
    <div>Application - iPhone</div>
  </bux-datatable-row>

  <bux-datatable-row>
    <div>21/02/2019</div>
    <div>20h34</div>
    <div>Application - iPhone</div>
  </bux-datatable-row>
  <bux-datatable-row>
    <div>21/02/2019</div>
    <div>20h34</div>
    <div>Application - iPhone</div>
  </bux-datatable-row>
</bux-datatable>
```
