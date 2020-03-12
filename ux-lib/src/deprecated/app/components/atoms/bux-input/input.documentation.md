# Composant bux-input

Ce composant permet d'afficher un input.

| Properties        | Type      | Default | EFS      | Description                                                                     |
| :---------------- | :-------- | :------ | :------- | :------------------------------------------------------------------------------ |
| layout            | `string`  | -       | CMB      | default, align afficher le label sur la même ligne que l'input                  |
| type              | `string`  | text    | CMB, AZB | the type of input                                                               |
| data-label        | `string`  | -       | CMB, AZB | Le label                                                                        |
| data-label-right  | `string`  | -       | CMB      | Un label afficher à droite                                                      |
| data-value        | `string`  | -       | CMB, AZB | la valeur du select                                                             |
| data-error-msg    | `string`  | -       | CMB, AZB | Message d'erreur s'affiche si le state est à error                              |
| data-value-min    | `string`  | -       | CMB, AZB | Min si input type number ou date (pour une date le format est YYYY-MM-DD)       |
| data-value-max    | `string`  | -       | CMB, AZB | Max si input type number ou date (pour une date le format est YYYY-MM-DD)       |
| data-step         | `string`  | -       | CMB, AZB | Step si input type number ou date (pour une date le format est YYYY-MM-DD)      |
| state             | `string`  | empty   | CMB, AZB | empty, valid, error                                                             |
| required          | `boolean` | false   | CMB, AZB | champs requis ?                                                                 |
| data-input-width  | `number`  | -       | CMB      | la largueur en pixel de l'input                                                 |
| data-placeholder  | `string`  | -       | CMB      | placeholder de l'input                                                          |
| a11y-step-in      | `boolean` | false   | CMB, AZB | Ajoute une span avec un tabindex avant l'input et vocalise l'entrée de l'input  |
| a11y-step-out     | `boolean` | false   | CMB, AZB | Ajoute une span avec un tabindex après l'input et vocalise la sortie de l'input |
| data-list         | `string`  | -       | CMB      | cf. Faire un champ avec des suggestions                                         |
| data-icon-left    | `string`  | -       | CMB      | insère un icon à gauche                                                         |
| data-icon-right   | `string`  | -       | CMB      | insère un icon à droite                                                         |
| data-autocomplete | `string`  | -       | CMB      | ajoute autocomplete à l'input                                                   |
| show-password     | `boolean` | false   | CMB      | donne la possibilité de voir son mot de passe dans un champ de type password    |

On peut modifier la valeur de l'input en affectant une valeur à la propriété value (cf exemple)
Pour que le message d'erreur s'affiche il faut que l'attribut data-error-msg ne soit pas vide et que le state soit à error.

## Exemple :

```html
<bux-input id="buxInput"></bux-input>

<!-- Changer la valeur par attribut -->
<script>
  document.getElementById('buxInput').setAttribute('data-value', '5');
</script>

<!-- Changer la valeur par propriété -->
<script>
  document.getElementById('buxInput').value = '5';
</script>
```

## Faire un champ avec des suggestions

```html
<bux-input
  data-list="sitemapdatalist"
  data-placeholder="Recherche une fonctionnalité"
  id="sitemapinput"
></bux-input>
<datalist id="sitemapdatalist">
  <option value="test1"></option>
  <option value="test2"></option>
  <option value="test3"></option>
</datalist>
```

Note l'attribut data-list dans le bux-input et l'id de datalist doit être les mêmes.

## A propos de a11y-step-in et a11y-step-out

Pour sortir d'un champ type input au clavier, le seul moyen est d'utiliser la touche tab ou shit + tab. Cela a pour effet d'envoyer le focus vers la zone focusable suivante, ce qui peut dans le cas d'un utilisateur aveugle lui faire louper une partie du contenu si celui-ci se trouve entre les deux zones.

`a11y-step-in` et `a11y-step-out` servent à **capturer le focus de l'utilisateur et à stopper sa progression**.

_Rappel : les aveugles utilisent les flèches pour naviguer, pas tabulation qui ne sert pour eux qu'à sortir ou entrer d'une zone de saisie !_

### Quand/Comment les utiliser ?

```html
//Exemple 1
<label for='demo1">Je suis un premier label</label>
<input type='text' id='demo1'>
<label for='demo2">Je suis un second label</label>
<input type='text' id='demo2'>

```

**Inutile** : `a11y-step-in` et `a11y-step-out` ne sont pas nécessaires car tabuler amène naturellement d'un input à un autre. Le label de chaque input sera lu par le vocalisateur et l'utilisateur ne loupe aucune information.

```html
//Exemple 2
<label for='demo1">Je suis un label</label>
<input type='text' id='demo1'>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<label for='demo2">Je suis un label</label>
<input type='text' id='demo2'>

```

**Utile** : `a11y-step-in` et `a11y-step-out` sont nécessaires car tabuler amène naturellement d'un input à un autre, loupant au passage le paragraphe. Le premier label sera lu par le vocalisateur, tabuler fera sortir de celui-ci.
