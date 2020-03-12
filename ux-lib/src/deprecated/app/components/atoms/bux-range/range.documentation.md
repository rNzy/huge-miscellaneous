# Composant bux-range

Ce composant affiche une barre de progression.

Il est défini par un attribut :
- data-label-left string
- data-label-right string
- data-label-middle string
- data-label-middle-position string
- data-value-min string
- data-value-max string
- data-value string
- data-step string
- data-dash-position 


## Exemple :

```html
<bux-range 
  data-value="52"
  data-value-min="0"
  data-value-max="100"
  data-step="1"
  data-label-left="0 mois"
  data-label-right="100 mois">
</bux-range>

<!-- Bux-range avec une partie en dash -->
<bux-range 
  data-value="52"
  data-value-min="0"
  data-value-max="100"
  data-step="1"
  data-label-left="0 mois"
  data-label-right="100 mois"
  data-label-middle="4 mois"
  data-label-middle-position="50%"
  data-dash-position="50%">
</bux-range>
```