# Composant bux-message

Ce composant affiche une boite de message, on peut lui définir un type pour définir son affichage:

- type string : error, info, warning

## Exemple :

```html
<bux-message type="warning">
  <p>Message 1</p>
  <p>Test</p>
</bux-message>

<bux-message type="error">
  <p>Message 1</p>
  <p>Test</p>
</bux-message>

<bux-message type="info">
  <p>Message 1</p>
  <p>Test</p>
</bux-message>

<bux-message type="alert">
  <p>Message 1</p>
  <p>Test</p>
</bux-message>
```
