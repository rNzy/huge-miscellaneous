# Composant bux-card-information

Ce composant affiche les informations spécifiques à une carte bancaire.

| Properties      | Type     | Default | Description                                         |
| :-------------- | :------- | :------ | :-------------------------------------------------- |
| data-label      | `string` | -       | concerne le nom de la carte                         |
| data-holder     | `string` | -       | concerne le nom du titulaire                        |
| data-number     | `string` | -       | concerne le numéro de la carte                      |
| data-image-path | `string` | -       | concerne le path vers l'image représentant la carte |

## Exemple :

```html
<bux-card-information
  data-label="Compte chèque 1"
  data-holder="Jean SPECIMENT"
  data-number="XXXX656484"
  data-image-path="/road/to/wawa/image"
>
</bux-card-information>
```
