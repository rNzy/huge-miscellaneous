# Composant progress-bar

Ce composant affiche une barre de progression.

Ses attributs :

| Properties                      | Type      | Default | Description                                                                         |
| :------------------------------ | :-------- | :------ | :---------------------------------------------------------------------------------- |
| data-value / data-value-primary | `number`  | -       | Progression de la barre                                                             |
| data-value-secondary            | `number`  | -       | Progression de la seconde barre (optionnelle)                                       |
| data-height                     | `number`  | -       | Épaisseur de la barre de progression                                                |
| hidevalues                      | `boolean` | false   | Cacher la valeur numérique de la barre de progression                               |
| nomargin                        | `boolean` | -       | Retire la marge se trouvant sous la barre (permet de la coller à l'élément suivant) |
| hidemobile                      | `boolean` | -       | Cache la barre de progression sur mobile                                            |
| size                            | `string`  | 'md'    | Diminue la hauteur de la bar (xs, ou md)                                            |
| state                           | `string`  | 'empty' | Chnager la couleur de la barre (empty, error, warning, valid)                       |
| data-label                      | `string`  | ''      | Texte afficher au dessus de la progress bar                                         |

Si on a un state autre que empty, si dans la label on rajoute une classe bux-colored l'élément prendre la couleur (cf. exemple)

## Exemple :

```html
<!-- Notre composant bux-progress-bar -->
<bux-progress-bar data-value="5"></bux-progress-bar>
<!-- Notre composant bux-progress-bar sans la valeur affichée -->
<bux-progress-bar data-value="5" hidevalues></bux-progress-bar>
<!-- Notre composant bux-progress-bar sans marge -->
<bux-progress-bar data-value="5" nomargin></bux-progress-bar>
<!-- Notre composant bux-progress-bar est caché sur mobile -->
<bux-progress-bar data-value="5" hidemobile></bux-progress-bar>

<!-- Ou avec 2 barres Notre composant bux-progress-bar -->
<bux-progress-bar
  data-value-primary="5"
  data-value-secondary="10"
></bux-progress-bar>

<!-- Avec un label et un changement de couleur -->
<bux-progress-bar
data-value="10"
hidevalues
size="xs"
state="error"
data-label="Niveau de sécurité : <strong class='bux-colored'>Excellent</strong>"
></bux-progress-bar>
```
