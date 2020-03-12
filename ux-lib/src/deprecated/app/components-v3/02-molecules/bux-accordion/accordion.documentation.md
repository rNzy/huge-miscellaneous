# Atoms/bux2-accordeon

Permet d'afficher un composant de type accordéon, sert de conteneur aux composants bux2-accordion-item

1 slot par défaut/unnamed

## Utilisation

```html
<bux2-accordion>
  <bux2-accordion-item>
    <bux2-text slot="header" tag="h2">accordion title 1</bux2-text>
    <bux2-text slot="content" tag="p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
    </bux2-text>
  </bux2-accordion-item>
  <bux2-accordion-item expanded>
    <bux2-text slot="header" tag="h2">accordion title 2</bux2-text>
    <bux2-text slot="content" tag="p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
    </bux2-text>
  </bux2-accordion-item>
  <bux2-accordion-item>
    <bux2-text slot="header" tag="h2">accordion title 3</bux2-text>
    <bux2-text slot="content" tag="p">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
    </bux2-text>
  </bux2-accordion-item>
</bux2-accordion>
```
