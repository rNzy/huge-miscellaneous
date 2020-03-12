# Composant bux-range-select

Ce composant affiche une barre de progression avec un select associé.

Il est défini par un attribut :

- state : empty, valid, error (par défaut : empty)
- required : false, true (par défaut : false)
- data-select-label : le label du select
- data-select-label-right : l'unité à droite du select
- data-select-width : la taille en pixel du select

- data-range-label-left : label à gauche du range
- data-range-label-right : label à droite du range
- data-value-min : la valeur min pour le range et le select (par défaut : 0)
- data-value-max : la valeur max pour le range et le select (par défaut : 12)
- data-step : le pas entre deux valeur pour le range et le select (par défaut : 1)
- data-value : valeur de l'input et du select

## Exemple :

```html
<!-- Notre composant bux-range -->
<bux-range-select
  state="valid"
  required="true"
  data-select-label="Dure"
  data-select-label-right="mois"
  data-select-width="90"
  data-range-label-left="3 mois"
  data-range-label-right="18 mois"
  data-value-min="3"
  data-value-max="18"
  data-step="1"
>
</bux-range-select>
```
