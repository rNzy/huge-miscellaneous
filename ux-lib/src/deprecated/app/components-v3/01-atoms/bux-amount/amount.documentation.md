# bux2-amount

## Properties

Properties and attributes specific to this component:

| Properties          | Type      | Default | Description                                      |
| :------------------ | :-------- | :------ | :----------------------------------------------- |
| value               | `number`  | 0       | valeur d'un montant                              |
| currency            | `string`  | EUR     | code devise du montant affiché                   |
| round               | `boolean` | false   | arrondi au nombre entier                         |
| suffix              | `string`  | false   | affichage période et fréquence (ex : ` / mois` ) |
| min-fraction-digits | `number`  | 2       | définit le nombre minimum de fractions           |
| max-fraction-digits | `number`  | 2       | définit le nombre maximum de fractions           |

Properties and attributes from mixin extended by this component:

| Properties | Type          | Default | Description |
| :--------- | :------------ | :------ | :---------- |
| tag        | `HTMLElement` | span    |             |
| size       | `string`      | md      | font-size   |
| background | `boolean`     |         |             |
| bold       | `boolean`     |         |             |
| center     | `boolean`     |         |             |

## Utilisation

```html
<bux2-amount value="50" currency="USD" round suffix=" / mois"></bux2-amount>
```
