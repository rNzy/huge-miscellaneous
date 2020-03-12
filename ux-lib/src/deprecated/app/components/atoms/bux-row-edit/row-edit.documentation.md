# Composant bux-row-edit

Ce composant affiche un ligne avec les attributs :

- data-label-left string nom affiché à gauche
- data-label-right string nom affiché à droite
- data-amount montant affiché à droite
- editable string true or false ? (true, par défaut : false) affiche le crayon à gauche
- data-help string true or false ? (true, par défaut : false) affiche un bouton d'aide

Le composant émet des événements lorsque l'on clique sur :

- le bouton d'aide : le nom de l'événement est help
- le crayon : le nom de l'événement est edit

## Exemple

```html
<!-- Notre composant bux-row-edit -->
<bux-row-edit
  id="5"
  data-label-left="Protection Carte"
  data-help="true"
  data-label-right="annulé"
  editable="button"
>
</bux-row-edit>

<script>
  const rowEdit = document.getElementById('5');
  rowEdit.addEventListener('help', e => {
    console.log('help');
  });
  rowEdit.addEventListener('edit', e => {
    console.log('edit');
  });
</script>
```
