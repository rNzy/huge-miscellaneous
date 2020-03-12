# Checkbox

Ce composant sert à afficher un élément input de type checkbox avec son label.

Ce composant est défini par les attributs suivant:

| Properties    | Type     | Default   | Description                                                      |
| :------------ | :------- | :-------- | :--------------------------------------------------------------- |
| data-label    | `string` | -         | label visible de l'input                                         |
| data-sublabel | `string` | -         | sublabel visible dans le cas d'une utilisation de type cardstyle |
| data-value    | `string` | -         | valeur de l'input                                                |
| data-name     | `string` | -         | définit l'attribut name de l'input                               |
| type          | `string` | -         | style du composant, une seule option pour le moment 'cardstyle'  |
| self-padding  | `string` | 'md','sm' | possibilité de répartir l'espace (small ou medium disponible)    |

On peut aussi écrire le label à l'intérieur

## Exemple d'utilisation

### Style par défaut

```html
<!-- Avec data-label -->
<bux-checkbox
  data-label="check label"
  data-value="check value 1"
  data-name="nametest"
>
</bux-checkbox>

<!-- Avec label à l'intérieur -->
<bux-checkbox data-value="check value 1" data-name="nametest">
  Voici un label
</bux-checkbox>

<!-- Avec une marge autours -->
<bux-checkbox data-value="check value 1" data-name="nametest" self-padding="md">
  Afficher les libellés longs
</bux-checkbox>
```

````


### Style de type cardstyle

```html
<bux-checkbox
  type="cardstyle"
  data-label="check label"
  data-sublabel="check sublabel"
  data-value="check value 1"
>
</bux-checkbox>
````
