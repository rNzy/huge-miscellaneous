# bux-amount

Ce composant sert de container aux différents widget.
Il accepte ou non un label en guise de titre.

| Properties | Type     | Default | Description                |
| :--------- | :------- | :------ | :------------------------- |
| data-label | `string` | 0       | définit le titre du widget |

## Utilisation

Sert uniquement de container pour les widget

```html
<bux-widget data-label="Compte chèque 1">
  <!--
    Insérer ici des composants tel que
    <bux-widget-account>
  -->
</bux-widget>
```
