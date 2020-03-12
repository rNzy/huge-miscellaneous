# bux-heading

Ce composant affiche un ligne avec les attributs :

| Properties      | Type      | Default | Description                                                                                |
| :-------------- | :-------- | :------ | :----------------------------------------------------------------------------------------- |
| data-level      | `number`  | 1       | pour h1, h2, h3, par défaut h1                                                             |
| data-icon       | `string`  | -       | nom de l'icone à afficher                                                                  |
| data-toast      | `string`  | -       | id du toast (affiche icone help). Ne fonctionne pas avec type dropdown                     |
| data-identifier | `string`  | -       | assigne un id au titre                                                                     |
| type            | `string`  | default | définit le style, autre option: dropdown                                                   |
| vocalonly       | `boolean` | default | Permet de masquer visuellement le titre, tout en le gardant audible pour les vocalisateurs |

Ce composant a un attribut dropdown qui est par défault à false.
On utilise cet attribut dans bux-accordeon.

Si le type est dropdown :

- il y a un chevron qui s'affiche à droite du titre.
- le titre a un rôle bouton
- l'attribut "aexpanded" pour aria-expanded signale si le chevron est ouvert, ou fermer
- l'attribut" acontrols" pour aria-controls doit être initialiser avec l'id de la div qui controle.

## Utilisation

```html
<bux-heading data-level="1">Mon titre de page</bux-heading>
<bux-heading data-level="2" data-identifier="content-page">
  Mon titre de contenu
</bux-heading>
```

### Avec toast (default type only)

```html
<bux-heading data-level="2" data-toast="modalId" data-identifier="id4ToastFocusBack">
  Un titre avec icone d'aide
</bux-heading>
<bux-modal id="modalId"></bux-modal>
```
