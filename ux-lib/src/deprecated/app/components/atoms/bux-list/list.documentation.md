# Composant bux-list

Ce composant créer un liste pour tous ces éléments enfants

Ce composant est défini par :

- type string : pour l'instant une valeur possible nostyle

| Properties | Type     | Default | Description                                            |
| :--------- | :------- | :------ | :----------------------------------------------------- |
| data-label | `string` | -       | permet d'ajouter un titre avant la liste               |
| type       | `string` | -       | Décore la liste. Valeurs dispos : disc, circle, square |
| layout     | `string` | -       | permet d'afficher des colonnes                         |

## Utilisation

```html
<!-- Notre composant bux-list -->
<bux-list>
  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
</bux-list>
```

Pour cet exemple l'html rendu sera :

```html
<bux-list>
  <ul class="bux-list__nostyle">
    <li><p>Item 1</p></li>
    <li><p>Item 2</p></li>
    <li><p>Item 3</p></li>
  </ul>
</bux-list>
```
