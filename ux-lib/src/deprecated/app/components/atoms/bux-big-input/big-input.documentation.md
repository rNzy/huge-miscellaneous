# Composant bux-big-input

Ce composant affiche un input de type nombre :
- data-label sting : le label de l'input
- data-value string : la valeur de l'input
- state [empty, valid, error]
- required string : par défaut false, true : Affiche une étoile après le label
- data-currency string : par défaut €
- data-error-msg string : message d'erreur

Pour manipuler les paramètres de l'input regarder dans le composant default dans la section knobs

On peut écouter les événements standard (input, change, keydown ...) des inputs (cf. exemple).

## Exemple :

```html
<!-- Notre composant bux-row-edit -->
<bux-big-input data-value="" state="nodata" required="false" data-currency="€" data-label="Je suis un label" data-error-msg=""></bux-big-input>

<bux-big-input data-value="250" state="valid" required="true" data-currency="€" data-label="Je suis un label" data-error-msg=""></bux-big-input>

<bux-big-input data-value="100" state="error" required="true" data-currency="€" data-label="Je suis un label" data-error-msg="Le montant doit être supérieur à 100 €"></bux-big-input>

<script>
    const buxBigInput = document.querySelector('bux-big-input');
    buxBigInput.addEventListener('input', (e) => {
      console.log('Input change value');
    });
</script>
```