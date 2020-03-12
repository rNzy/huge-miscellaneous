# &lt;bux2-dualpanel&gt;

Ce composant permet de séparer des contenus en 2 colonnes liées par une flèche.
Utilisé par exemple pour la calculette de simulations de prêt financier (formulaire + résultat).
Les colonnes sont à l'horizontal au format desktop et s'empilent en version mobile.
NB : un Id unique est injecté dans le slot panel02 (utile par exemple pour fonctionnalité de scroll)



| Properties      | Type      | Default | Description                                                         |
| :-------------- | :-------- | :------ | :------------------------------------------------------------------ |
| -       | `-`  | default | (aucun paramètre disponible)                             |


## Utiliser &lt;bux2-dualpanel&gt;

```html
<bux2-dualpanel>
  <div slot="panel01">
    <!-- code here -->
  </div>
  <div slot="panel02">
    <!-- code here -->
  </div>
</bux2-dualpanel>
```
