# Radio group

Ce composant sert à créér un formulaire avec des inputs de type radio.

Ce composant est définit par ces attributs:

| Properties       | Type      | Default | Description                                                                                 |
| :--------------- | :-------- | :------ | :------------------------------------------------------------------------------------------ |
| data-name        | `string`  | -       | name de ce formulaire, passe sa valeur à tous les éléments enfants de type bux-radio-button |
| type             | `string`  | list    | définit le style/layout de ce groupe de bouton. 2 options disponibles, list et row.         |
| a11y-label       | `string`  | -       | texte destiné aux lecteurs d'écrans, il est caché par défaut                                |
| a11y-step-in     | `boolean` | false   | Ajoute une span avec un tabindex avant l'input et vocalise l'entrée de l'input              |
| a11y-step-out    | `boolean` | false   | Ajoute une span avec un tabindex après l'input et vocalise la sortie de l'input             |
| no-margin-bottom | `boolean` | false   | Retire la marge sous le groupe d'inputs                                                     |

## Exemple d'utilisation

```html
<bux-radio-group
  data-name="wawawa"
  a11y-label="texte destiné aux lecteurs d'écrans"
  type="list"
  a11y-step-in
  a11y-step-out
>
  <!-- affichage par défaut -->

  <bux-radio-button data-label="radio label 1" data-value="radio value 1">
  </bux-radio-button>

  <bux-radio-button data-label="radio label 2" data-value="radio value 2">
  </bux-radio-button>

  <bux-radio-button data-label="radio label 3" data-value="radio value 3">
  </bux-radio-button>
</bux-radio-group>
```

## A propos de a11y-step-in et a11y-step-out

Pour sortir d'un group d'input radio au clavier, le seul moyen est d'utiliser la touche tab ou shit + tab. Cela a pour effet d'envoyer le focus vers la zone focusable suivante, ce qui peut dans le cas d'un utilisateur aveugle lui faire louper une partie du contenu si celui-ci se trouve entre les deux zones.

`a11y-step-in` et `a11y-step-out` servent à **capturer le focus de l'utilisateur et à stopper sa progression**.

_Rappel : les aveugles utilisent les flèches pour naviguer, pas tabulation qui ne sert pour eux qu'à sortir ou entrer d'une zone de saisie !_

### Quand/Comment les utiliser ?

```html
//Exemple 1
<bux-radio-group>
  <bux-radio-button> </bux-radio-button>
  <bux-radio-button> </bux-radio-button>
</bux-radio-group>
<label for='demo1">Je suis un label</label>
<input type='text' id='demo1'>

```

**Inutile** : `a11y-step-in` et `a11y-step-out` ne sont pas nécessaires car tabuler amène naturellement du groupe de radios à un input. Le label de chaque input sera lu par le vocalisateur et l'utilisateur ne loupe aucune information.

```html
//Exemple 2
<bux-radio-group>
  <bux-radio-button> </bux-radio-button>
  <bux-radio-button> </bux-radio-button>
</bux-radio-group>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<label for='demo1">Je suis un label</label>
<input type='text' id='demo1'>

```

**Utile** : `a11y-step-in` et `a11y-step-out` sont nécessaires car tabuler amène naturellement du groupe de radios à l'input, loupant au passage le paragraphe. Le premier label sera lu par le vocalisateur, tabuler fera sortir de celui-ci.
