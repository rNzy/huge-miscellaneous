# Composant bux2-input-w-label

Ce composant permet d'afficher un input avec des labels.

## Exemple :

```html
<bux2-input-w-label>
  <bux2-label slot="label-top">
    Mon label <bux-svg data-icon="help"></bux-svg>
  </bux2-label>
  <bux2-label slot="label-left">
    Montant
  </bux2-label>
  <bux2-input>
    <bux-svg slot="icon-left" data-icon="help"></bux-svg>
    <bux-svg slot="icon-right" data-icon="help"></bux-svg>
  </bux2-input>
  <bux2-label slot="label-right">
    €
  </bux2-label>
  <bux2-label slot="label-bottom">
    label en dessous
  </bux2-label>
</bux2-input-w-label>
```

Pour voir un exemple plus parlant d'utilisation cf bux2-input-w-label
