# Bux Row V2

Ce composant sert à aligner les div enfant sur la gauche. Les enfants de ces divs sont eux alignés verticalement

## Attributs directs

Ces attributs peuvent êtra ajoutés directement sur bux2-row.

| Properties       | Type      | Default | Description                                       |
| :--------------- | :-------- | :------ | :------------------------------------------------ |
| background       | `string`  | default | ajoute un background gris clair                   |
| background-light | `boolean` | -       | ajout un background blanc                         |
| border-top       | `boolean` | -       | ajoute une bordure en haut du composant           |
| border-bottom    | `boolean` | -       | ajoute une bordure en bas du composant            |
| border-full      | `boolean` | -       | ajoute une bordure tout autour du composant       |
| margin-bottom    | `boolean` | -       | ajoute une margin de 10px en dessous du composant |

## Attributs indirects

Ces attributs peuvent êtra ajoutés sur les enfants de bux2-row.

| Properties | Type     | Default | Description                                                             |
| :--------- | :------- | :------ | :---------------------------------------------------------------------- |
| push-right | `string` | default | pousse la div correspondante et celles se trouvant après vers la droite |

```html
<bux2-row background>
  <div>
    <div>
      <strong>COMPTE CHÈQUE</strong>
    </div>
    <div>
      <em>Jean Specimen</em>
    </div>
  </div>
  <div push-right>
    <strong>3000 euros</strong>
  </div>
</bux2-row>
```
