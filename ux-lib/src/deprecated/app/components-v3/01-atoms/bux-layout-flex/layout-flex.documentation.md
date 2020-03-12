# Composant bux2-layout-flex

Ce composant permet de regrouper nimporte-quel type d'éléments dans un container avec flexbox. <br>
On pourra ajouter au fur et à mesure toutes les options que l'on souhaite pour définir les caractéristiques flexbox dont on aura besoin.

## Attributs

| Properties | Type      | Default | Description                                                                          |
| :--------- | :-------- | :------ | :----------------------------------------------------------------------------------- |
| type       | `boolean` |         | permet de définir le flex-direction=column. (Flexbox est défini en ligne par défaut) |

## Exemples :

Affichera les éléments les éléments en colonne:

```html
<bux2-layout-flex column>
  <bux-account-tile
    data-account-model="simple"
    data-account-label="Total de mon épargne"
    data-account-amount="10342.90"
    data-account-currency="EUR"
  >
  </bux-account-tile>
  <bux-account-tile
    data-account-model="simple-link"
    data-account-label="Mes procurations, enfants, tutelles"
    data-account-link-url="detail-epargne.html"
  >
  </bux-account-tile>
</bux2-layout-flex>
```

Affichera les éléments les éléments en ligne:

```html
<bux2-layout-flex>
  <bux-account-tile
    data-account-model="simple"
    data-account-label="Total de mon épargne"
    data-account-amount="10342.90"
    data-account-currency="EUR"
  >
  </bux-account-tile>
  <bux-account-tile
    data-account-model="simple-link"
    data-account-label="Mes procurations, enfants, tutelles"
    data-account-link-url="detail-epargne.html"
  >
  </bux-account-tile>
</bux2-layout-flex>
```

Voir épargne/synthèse
