# bux-progress-ring

Ce composant affiche une barre de progression circulaire. On a la possibilité d'y ajouter du contenu de type texte, ou une icone qui seront placé au centre de cet élément.

Il est défini par ces attributs :

| Properties | Type      | Default | Description                                               |
| :--------- | :-------- | :------ | :-------------------------------------------------------- |
| data-value | `number`  | 0       | exprime une valeur sur 100                                |
| a11y-label | `string`  | -       | permet de vocaliser cet élément pour les lecteurs d'écran |
| loading    | `boolean` | -       | permet d'animer ce composant comme un spinner             |

## Utilisation

```html
<bux-progress-ring
  data-value="35"
  a11y-label="Texte de vocalisation pour l'accessibilité"
>
</bux-progress-ring>
```

```html
<bux-progress-ring data-value="25">
  <bux-text>25 %</bux-text>
</bux-progress-ring>
```

```html
<bux-progress-ring data-value="25">
  <bux-svg data-name="conseiller" data-class="c-progress-ring__icon"> </bux-svg>
</bux-progress-ring>
```
