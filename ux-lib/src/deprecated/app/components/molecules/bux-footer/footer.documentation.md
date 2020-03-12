# File download component

Ce composant affiche un footer.

## Exemple

```html
<bux-footer id="footer"></bux-footer>

<script>
  var footer = document.getElementById('footer');

  footer.data = [
    {
      path: '/',
      label: 'Accessibilité'
    },
    {
      path: '/',
      label: 'Mentions légales'
    },
    {
      path: '/',
      label: 'Infos consommateurs'
    },
    {
      path: '/',
      label: 'Données personnelles'
    },
    {
      path: '/',
      label: 'Tarification des services'
    },
    {
      path: '/',
      label: 'Condition générales de banque'
    },
    {
      label: '© Arkéa'
    }
  ];
</script>
```
