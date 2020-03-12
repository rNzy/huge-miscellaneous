# Composant bux-shortcut

Ce composant est défini par :
  - attribut string : valeur possible (défaut : )

## Exemple :

```html
<!-- Notre composant bux-shortcut -->
<bux-shortcut id="shortcut"></bux-shortcut>

<script>
  let shortcut = document.getElementById('shortcut');

  window.customElements.whenDefined('bux-shortcut').then(function() {
    shortcut.data = [
      {
        label: 'Comptes',
        icon: 'cheque-carte',
        path: '/comptes/'
      },
      {
        label: 'Épargne',
        icon: 'montant',
        path: '/epargne/'
      },
      {
        label: 'Virement',
        icon: 'virements',
        path: '/virement/'
      },
      {
        label: 'Virtualis',
        icon: 'virtualis',
        path: '/virtualis/'
      },
      {
        label: 'Cartes',
        icon: 'cartes',
        path: '/carte/'
      }
    ];
  });
</script>
```
