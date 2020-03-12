# Composant bux-table

Ce composant sert principalement de conteneur pour les composant de style "row", en agissant comme un tableau. Il peut être utilisé sans configuration.
Il peut afficher un header optionnel.

Ce composant est défini par :

| Properties        | Type     | Default | Description          |
| :---------------- | :------- | :------ | :------------------- |
| data-label-header | `string` | -       | header               |
| data-title-footer | `string` | -       | titre dans le footer |
| data-label-footer | `string` | -       | label dans le footer |
| data-link-footer  | `string` | -       | lien dans le footer  |

## Exemple :

```html
<bux-table data-label-header="Résultat de la recherche (12 opérations)">
  <bux-row
    date="18/11/17"
    label="AMAZON PAYMENT"
    sublabel="N° 12345555"
    amount="-352.50"
  >
  </bux-row>
  <bux-row
    date="18/11/17"
    label="AMAZON PAYMENT"
    sublabel="N° 12345555"
    amount="-352.50"
  >
  </bux-row>
  <bux-row
    date="18/11/17"
    label="AMAZON PAYMENT"
    sublabel="N° 12345555"
    amount="-352.50"
  >
  </bux-row>
</bux-table>
```
