# Container

Ce composant permet d'afficher une container, qui peut englober tout type de contenu.

Ce composant est défini par un attribut

| Properties       | Type     | Default | Description                                                                                   |
| :--------------- | :------- | :------ | :-------------------------------------------------------------------------------------------- |
| type             | `string` | ''      | définit le style de ce container, pour le moment un block par défaut, dropdown est disponible |
| margin-top-md    | `string` | ''      | margin-top                                                                                    |
| margin-bottom-md | `string` | ''      | margin-bottom                                                                                 |

## Exemple d'utilisation

### Sans type

```html
<bux-container><p>Coucou</p></bux-container>
```

```html
<bux-container><p>Coucou</p></bux-container>
```

### Avec type Dropdown

Pour dropdown il existe des sous types pour bien positionner la flêche :

- dropdown-12
- dropdown-22
- dropdown-13
- dropdown-23
- dropdown-33
- dropdown-14
- dropdown-24
- dropdown-34
- dropdown-44

```html
<bux-container type="dropdown"><p>Coucou</p></bux-container>

<bux-container type="dropdown-12"><p>Coucou</p></bux-container>
```
