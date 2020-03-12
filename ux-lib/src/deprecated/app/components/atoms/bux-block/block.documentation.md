# Composant bux-block

Ce composant est défini par :

| Properties      | Type      | Default | Description                                                         |
| :-------------- | :-------- | :------ | :------------------------------------------------------------------ |
| layout          | `string`  | default | gestion du padding (flat, nopadding, small, default, medium, large) |
| center          | `boolean` | -       | centre son contenu en utilisant flexbox et margin auto              |
| noshadow        | `boolean` | -       | supprime le box-shadow                                              |
| nomarginbottom  | `boolean` | -       | supprime la marge basse                                             |
| wmax480         | `boolean` | -       | met un max width de 480px                                           |
| nopaddingbottom | `boolean` | -       | retire le padding bottom du block                                   |
| nobackground    | `boolean` | -       | Le background est transparent                                       |

## Utilisation

```html
<bux-block><div>Voici un block</div></bux-block>
```
