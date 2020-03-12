# Composant bux-select

Ce composant affiche un input de type select :

| Properties        | Type      | Default | Description                                                                     |
| :---------------- | :-------- | :------ | :------------------------------------------------------------------------------ |
| layout            | `string`  | -       | default, align afficher le label sur la même ligne que l'input                  |
| data-label        | `string`  | -       | Le label                                                                        |
| data-label-right  | `string`  | -       | Un label afficher à droite                                                      |
| data-value        | `string`  | -       | la valeur du select                                                             |
| state             | `string`  | -       | par défaut empty, valid, error                                                  |
| required          | `boolean` | false   | champs requis ?                                                                 |
| data-select-width | `number`  | -       | la largueur en pixel de l'input                                                 |
| a11y-step-in      | `boolean` | false   | Ajoute une span avec un tabindex avant l'input et vocalise l'entrée de l'input  |
| a11y-step-out     | `boolean` | false   | Ajoute une span avec un tabindex après l'input et vocalise la sortie de l'input |
| data-error-msg    | `string`  | -       | Message d'erreur s'affiche si le state est à error                              |

Pour que le message d'erreur s'affiche il faut que l'attribut data-error-msg ne soit pas vide et que le state soit à error.

## Exemple

```html
<!-- Notre composant bux-select -->
<bux-select
  data-label="Durée de l'étalement"
  data-label-right="mois"
  data-value=""
  state=""
  required="false"
  data-select-width=""
>
</bux-select>
```

## A propos de a11y-step-in et a11y-step-out

Pour sortir d'un champ type select au clavier, le seul moyen est d'utiliser la touche tab ou shit + tab. Cela a pour effet d'envoyer le focus vers la zone focusable suivante, ce qui peut dans le cas d'un utilisateur aveugle lui faire louper une partie du contenu si celui-ci se trouve entre les deux zones.

`a11y-step-in` et `a11y-step-out` servent à **capturer le focus de l'utilisateur et à stopper sa progression**.

_Rappel : les aveugles utilisent les flèches pour naviguer, pas tabulation qui ne sert pour eux qu'à sortir ou entrer d'une zone de saisie !_

### Quand/Comment les utiliser ?

```html
//Exemple 1
<bux-select></bux-select>
<label for='demo2">Je suis un second label</label>
<input type='text' id='demo2'>

```

**Inutile** : `a11y-step-in` et `a11y-step-out` ne sont pas nécessaires car tabuler amène naturellement de la liste à un input et son label. Le label de l'input sera lu par le vocalisateur et l'utilisateur ne loupe aucune information.

```html
//Exemple 2
<bux-select></bux-select>


<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<label for='demo2">Je suis un label</label>
<input type='text' id='demo2'>

```

**Utile** : `a11y-step-in` et `a11y-step-out` sont nécessaires car tabuler amène naturellement de la liste à un input et son label, loupant au passage le paragraphe.
