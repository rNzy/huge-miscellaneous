# Composant bux2-input

Ce composant permet d'afficher un input.

| Properties    | Type      | Default | Description                               |
| :------------ | :-------- | :------ | :---------------------------------------- |
| type          | `string`  | text    | the type of input                         |
| state         | `string`  | empty   | empty, valid, error                       |
| required      | `boolean` | false   | champs requis ?                           |
| placeholder   | `string`  |         |                                           |
| min           | `number`  |         |                                           |
| max           | `number`  |         |                                           |
| value         | `number`  |         |                                           |
| round         | `number`  |         | suppression des chiffres après la virgule |
| minlength     | `number`  |         |                                           |
| maxlength     | `number`  |         |                                           |
| reset         | `boolean` | false   | si présent, affiche un bouton reset       |
| no-copy-paste | `boolean` | false   | si présent, empêche le copier-coller      |

Il accepte 2 slots (non obligatoires) pour afficher une icone à droite ou à gauche.

## Exemple :

cf doc bux2-input-w-label

```html
<bux2-input>
  <bux-svg slot="icon-left" data-icon="help"></bux-svg>
  <bux-svg slot="icon-right" data-icon="help"></bux-svg>
</bux2-input>
```
