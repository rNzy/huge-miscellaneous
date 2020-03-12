# Composant bux-link-tile

Ce composant est défini par des attributs :

| Properties    | Type      | Default | Description                                              |
| :------------ | :-------- | :------ | :------------------------------------------------------- |
| data-label    | `string`  | ''      | défini le label                                          |
| data-sublabel | `string`  | ''      | défini le sublabel                                       |
| data-title    | `string`  | ''      | défini le texte de l'attribut title                      |
| a11y-label    | `string`  | ''      | défini le texte lu par les lecteurs d'écran              |
| data-icon     | `string`  | ''      | affiche une icone et la définit                          |
| data-link     | `string`  | ''      | défini le path du lien                                   |
| data-badges   | `string`  | ''      | met en place des composants badges                       |
| bold          | `boolean` | ''      | modifier permettant de passer le label en bold           |
| shadow        | `boolean` | ''      | modifier permettant d'ajouter un box-shadow au container |
| colored       | `boolean` | ''      | modifier permettant de passer le label en couleur        |

## Particularités

Le composant n'injectera pas la balise <a> avec les différents paramètres prévus si l'attribut data-link n'est pas renseigné.

## Exemple d'utilisation

```html
<!-- Notre composant bux-link-tile -->
<bux-link-tile
  data-label="C'est un title"
  data-sublabel="C'est un subtitle"
  data-badges="<bux-badge large>Dernier prélèvement le <strong>23/08/2018</strong></bux-badge>"
  data-title="Voir nos offres d'épargne long terme"
  a11y-label="Cliquez pour afficher, dans un nouvel onglet, nos offres de produits d'épargne long terme"
  data-link="/route/to/wawaland"
  colored
>
</bux-link-tile>
```
