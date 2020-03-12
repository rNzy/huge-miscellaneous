# Composant bux-step

bux-step est utilisé par le composant molécule bux-steps-header. Ce dernier est un header présentant une liste d'étapes dans la progression d'un parcours client. bux-step est utilisé pour chaque étape et configurable pour chaque étape.

Ce composant est défini par des attributs :

| Properties      | Type      | Default | Description                                                  |
| :-------------- | :-------- | :------ | :----------------------------------------------------------- |
| data-state      | `string`  | ''      | Définit l'état de cette étape                                |
| data-label      | `string`  | ''      | Défini le label se trouvant sous le numéro d'étape           |
| data-number     | `string`  | ''      | Défini le numéro de l'étape                                  |


## Exemple :

```html
<!-- Notre composant bux-step -->
<bux-step data-state="current" data-label="Mon texte" data-number="1">
</bux-step>
```

## Todo :

- Ajouter les tests
- Ajouter l'accessibilité