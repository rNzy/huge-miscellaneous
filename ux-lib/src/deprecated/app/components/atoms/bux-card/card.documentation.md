# Composant bux-card

Ce composant sert à afficher un élément d'interface Card. Cet élément se compose d'un header, d'un body et d'un footer.

Ce composant n'a pas d'attribut.

Par contre le composant bux-card-body a un attibut layout: la valeur correspond à un type de layout pour le body de cette card (default, grid-hero ou columns-medium).

## Exemple :

```html
<bux-card>
  <bux-card-header>Card title</bux-card-header>
  <bux-card-body>Coucou je suis un body</bux-card-body>
  <bux-card-footer>Footer text</bux-card-footer>
</bux-card>
```
