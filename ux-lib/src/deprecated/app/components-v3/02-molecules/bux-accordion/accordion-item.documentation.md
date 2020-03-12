# Composant bux2-accordion-item

Composant affichant un item d'accordéon. Il est dépendant de son composant parent bux-accordion.

Ce composant étend la mixin `AriaExpandedMixin`.

3 slots dont 2 requis:

    - header
    - extra (dans le header pour situer un élément supplémentaire à droite)
    - content

| Properties | Type      | Default | Description                                |
| :--------- | :-------- | :------ | :----------------------------------------- |
| expanded   | `boolean` | false   | Permet d'ouvrir ou non un item d'accordeon |

## Exemple :

Accordeon fermé

```html
<bux2-accordion-item>
  <bux2-text slot="header" tag="h2">accordion title 2</bux2-text>
  <bux2-text slot="content" tag="p">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
  </bux2-text>
</bux2-accordion-item>
```

Accordeon ouvert + élément dans le slot "extra"

```html
<bux2-accordion-item expanded>
  <bux2-text slot="header" tag="h2">accordion title 2</bux2-text>
  <bux2-text slot="extra" tag="span">extra slot</bux2-text>
  <bux2-text slot="content" tag="p">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
  </bux2-text>
</bux2-accordion-item>
```
