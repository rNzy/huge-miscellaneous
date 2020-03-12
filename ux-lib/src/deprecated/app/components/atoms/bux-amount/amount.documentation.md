# bux-amount

Ce composant sert à afficher des montants d'argent.
Il vérifie si ce montant est positif et applique une class spécifique pour passer le montant en rouge.

| Properties    | Type      | Default | Description                                                              |
| :------------ | :-------- | :------ | :----------------------------------------------------------------------- |
| data-value    | `number`  | 0       | valeur d'un montant                                                      |
| data-currency | `string`  | EUR     | code devise du montant affiché                                           |
| data-period   | `string`  |         | période du paiement. Exemple : mois.                                     |
| size          | `string`  | md      | déclare la font-size du montant, de la devise et de la période           |
| period-size   | `string`  | -       | Optionnel : déclare la font-size de la période (sinon fallback sur size) |
| bold          | `boolean` | -       | passe la font-weight à bold                                              |
| align-top     | `boolean` | -       | Aligne le texte vers le haut                                             |

## Utilisation

Accepte pour le moment un seul attribut, il faut entrer ce montant en utilisant un point pour les décimales. Si ce montant est inférieur à zero, le composant ajoutera la class ".c-amount--negative" et passera la valeur en rouge.

```html
<bux-amount data-value="250.86" data-currency="€"> </bux-amount>
```
