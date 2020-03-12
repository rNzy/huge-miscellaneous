# Composant bux-btn

Ce composant affiche un bouton.

Un btn est défini par des attributs :

| Properties      | Type      | Default | Description                                                                       |
| :-------------- | :-------- | :------ | :-------------------------------------------------------------------------------- |
| type            | `string`  | primary | défini l'aspect du composant (secondary, secondary, svg pour y mettre un bux-svg) |
| data-role       | `string`  | button  | défini le template, button ou lien (button, link, link-external)                  |
| data-identifier | `string`  | -       | assigne un id à l'élément button                                                  |
| a11y-label      | `string`  | -       | vocalisation pour accessibilité                                                   |
| disabled        | `boolean` | false   | lien actif ou non                                                                 |
| outlined        | `boolean` | false   | change l'aspect du bouton, seules les bordures sont colorées                      |
| data-icon       | `string`  | -       | nom du fichier svg a affiché                                                      |
| data-link       | `string`  | -       | lien si le boutton est un lien                                                    |
| size            | `string`  | small   | small/medium/large - Change la taille du bouton (si permis par l'EFS)             |

La valeur `link-external` pour l'attribut data-role, est a utiliser pour tous les lien externe, elle ajoutera un attribut rel="noopener" pour des raisons de sécurité.

## Exemple :

```html
<bux-btn type="primary" disabled="true">Label du bouton inactif</bux-btn>

<bux-btn type="secondary" data-role="link">Label du lien</bux-btn>

<bux-btn type="secondary" data-role="link-external">Label du lien</bux-btn>
```
