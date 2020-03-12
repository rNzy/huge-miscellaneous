# Composant bux-steps

Ce composant aligne des bux-step et ajoute une ligne derrière eux afin de créer un chemin de fer.

En l'état ce composant ne fonctionne que pour 3 ou 4 étapes.

```html
<!-- Notre composant bux-steps -->
<bux-steps>
  <bux-step
    data-label="Informations"
    data-number="1"
    data-state="current"
  ></bux-step>
  <bux-step data-label="Devis" data-number="2" data-state="upcoming"></bux-step>
  <bux-step
    data-label="Souscription"
    data-number="3"
    data-state="upcoming"
  ></bux-step>
</bux-steps>
```

## Possibles améliorations

- Tester avec deux étapes
- Ajuster la longueur de la barre servant de chemin de fer en fonction du nombre d'étapes

## Todo

- Écrire les tests
