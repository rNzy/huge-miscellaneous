# Composant bux2-disclosure

Composant permettant au clic d'afficher ou non du contenu, même fonctionnement que bux-accordion-item.

Ce composant étend la mixin `AriaExpandedMixin`.

1 slot requis:
    - content

1 slot optionnel:
    - icon-right

| Properties    | Type      | Default | Description                                         |
| :------------ | :-------- | :------ | :-------------------------------------------------- |
| expanded      | `boolean` | false   | Permet d'afficher ou non le contenu du slot content |
| label         | `string`  |         | Label affiché par défaut + accordéon fermé - Requis |
| labelExpanded | `string`  |         | Label affiché accordéon ouvert - Optionnel          |

## Exemple :

Disclosure fermé

```html
<bux2-disclosure label="Disclosure title closed">
  <bux2-text slot="content" tag="p">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
  </bux2-text>
</bux2-disclosure>
```

Disclosure ouvert

```html
<bux2-disclosure
  label="Disclosure title open"
  label-expanded="Disclosure title 2 open"
  expanded
>
  <bux2-text slot="content" tag="p">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
  </bux2-text>
</bux2-disclosure>
```

Icone Help

```html
<bux2-disclosure label="Disclosure title with icon">
  <bux2-svg icon="help" size="md" slot="icon-right"></bux2-svg>
  <bux2-text slot="content" tag="p">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
  </bux2-text>
</bux2-disclosure>
```
