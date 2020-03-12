# Composant bux-accordeon

Ce composant ne possède pas d'attribut.
Il doit contenir des "bux-accordeon-item" à l'intérieur.

Les bux-accordeon-item ont comme attribut :

- data-label {string} le titre de la section
- data-icon {string} affiche une icone à gauche du titre
- un body qui est le contenu de la section

## Exemple :

```html
<body>
  <main role="main">
    <!-- Notre composant bux-accordeon -->
    <bux-accordeon>
      <bux-accordeon-item data-label="Ma Section 1" data-icon="pen">
        Mon Contenu 1
      </bux-accordeon-item>
      <bux-accordeon-item data-label="Ma Section 2">
        Mon Contenu 2
      </bux-accordeon-item>
    </bux-accordeon>
  </main>
</body>
```
