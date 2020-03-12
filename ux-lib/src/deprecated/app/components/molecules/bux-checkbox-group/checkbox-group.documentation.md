# Checkbox group

Ce composant créer un liste de checkbox

Ce composant est défini par :

| Properties    | Type      | Default | Description                                                                     |
| :------------ | :-------- | :------ | :------------------------------------------------------------------------------ |
| a11y-label    | `string`  | -       | accessibilité                                                                   |
| layout        | `string`  | default | 2-columns-md, 4-columns-md, default                                             |
| data-state    | `string`  | -       | unchecked, checked                                                              |
| a11y-step-in  | `boolean` | false   | Ajoute une span avec un tabindex avant l'input et vocalise l'entrée de l'input  |
| a11y-step-out | `boolean` | false   | Ajoute une span avec un tabindex après l'input et vocalise la sortie de l'input |
| hide-button   | `boolean` | false   | Cache le bouton "Tout sélectionner"                                             |

## Exemple d'utilisation

Voir la doc pour le bux-ckeckbox

```html
<bux-checkbox-group
  a11y-label="accessible legend checkbox"
  layout="columns-md"
  a11y-step-in
  a11y-step-out
>
  <bux-checkbox data-label="checklabel 1" data-sublabel="checksublabel 1">
  </bux-checkbox>
  <bux-checkbox data-label="checklabel 2" data-sublabel="checksublabel 2">
  </bux-checkbox>
</bux-checkbox-group>
```

## A propos de a11y-step-in et a11y-step-out

Pour sortir d'une liste d'input checkbox au clavier, le seul moyen est d'utiliser la touche tab ou shit + tab en fin ou début de la liste. Cela a pour effet d'envoyer le focus vers la zone focusable suivante, ce qui peut dans le cas d'un utilisateur aveugle lui faire louper une partie du contenu si celui-ci se trouve entre les deux zones.

`a11y-step-in` et `a11y-step-out` servent à **capturer le focus de l'utilisateur et à stopper sa progression**.

_Rappel : les aveugles utilisent les flèches pour naviguer, pas tabulation qui ne sert pour eux qu'à sortir ou entrer d'une zone de saisie !_

### Quand/Comment les utiliser ?

```html
//Exemple 1
<bux-checkbox-group>
  <bux-checkbox></bux-checkbox>
  <bux-checkbox></bux-checkbox>
</bux-checkbox-group>
<label for='demo1">Je suis un label</label>
<input type='text' id='demo1'>

```

**Inutile** : `a11y-step-in` et `a11y-step-out` ne sont pas nécessaires car tabuler amène naturellement d'une liste de checkbox à un input possédant un label. Le label de chaque input sera lu par le vocalisateur et l'utilisateur ne loupe aucune information.

```html
//Exemple 2
<bux-checkbox-group>
  <bux-checkbox></bux-checkbox>
  <bux-checkbox></bux-checkbox>
</bux-checkbox-group>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<label for='demo1">Je suis un label</label>
<input type='text' id='demo1'>

```

**Utile** : `a11y-step-in` et `a11y-step-out` sont nécessaires car tabuler amène naturellement de la liste de checkbox à l'input, loupant au passage le paragraphe.
