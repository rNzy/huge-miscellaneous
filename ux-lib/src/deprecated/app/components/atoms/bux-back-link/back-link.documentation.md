# Composant bux-back-link

Attention, dans la majorité des cas il ne faut pas directement utiliser ce composant.
Il faut utiliser le composant de plus haut niveau qui permet de gérer le bouton retour sur l'app mobile.
cf. http://scm.s.arkea.com:8080/repos/9020/back-link-wc-lib/trunk/README.md

Affiche un lien retour (appelé breadcrumb dans l'ancien socle).

Ce composant est défini par des attributs :

| Properties | Type     | Default | Description                                                |
| :--------- | :------- | :------ | :--------------------------------------------------------- |
| data-label | `string` | ''      | définie le texte                                           |
| data-link  | `string` | ''      | définie l'url du lien, si le lien est vide => display none |

## Exemple :

```html
<!-- Notre composant bux-back-link -->
<bux-back-link data-label="Mes comptes" data-link="/comptes"></bux-back-link>
```
