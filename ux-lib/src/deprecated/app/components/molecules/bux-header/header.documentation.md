# Composant bux-header

Ce composant affiche l'header du site.

On utilise les méthodes du composant :

| Properties           | Type      | Default   | Description / Exemple                                                                   |
| :------------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| type                 | `string`  | 'default' | Soit default, empty, public, pseudoauth (n'affiche que le logo et l'icone de connexion) |
| data-gender          | `string`  | ''        | M. ou Mme.                                                                              |
| data-first-name      | `string`  | ''        | Henri                                                                                   |
| data-last-name       | `string`  | ''        | MARTIN                                                                                  |
| data-last-connection | `string`  | ''        | Dernière connexion le 22/01/2019 à 19h24                                                |
| data-espace          | `string`  | ''        | ESPACE PARTICULIERS                                                                     |
| data-message         | `number`  | ''        | nombre de message dans la messagerie                                                    |
| data-label           | `string`  | ''        | Affichage du titre dans le header du portable                                           |
| data-connected       | `Boolean` | ''        | Connecté ou pas                                                                         |
| data-logo-path       | `string`  | ''        | Chemin vers le logo (/assets/images/logo.png)                                           |
| data-link-connect    | `string`  | ''        | href pour le liens connexion (/auth/login)                                              |
| data-link-unconnect  | `string`  | ''        | href pour le liens déconnexion (/logout/)                                               |
| data-mobile-state    | `string`  | ''        | menu-open met en noir le background de l'header portable et les icones en blanc         |
| active               | `string`  | ''        | profil, espace, conseiller, parametrage                                                 |
| data-back-link       | `string`  | ''        | lien de retour dans le header en mode mobile                                            |
| data-settings-link   | `string`  | ''        | lien sur la roue dentée dans le header                                                  |

si data-espace est 'false' alors n'affiche pas la div espace
si data-gender ET data-first-name ET data-last-name ET data-last-connection est 'false' n'affiche pas la div profile

Le data-logo-path est déprécié car on charge maintenant un svg qui doit changer de couleur.

## Exemple d'utilisation

```html
<bux-header
  type="default"
  data-gender="M."
  data-first-name="Henri"
  data-last-name="MARTIN"
  data-last-connection="Dernière connexion le 22/01/2019 à 19h24"
  data-espace="ESPACE PARTICULIERS"
  data-message="5"
  data-label="Affichage dans le header du portable"
  data-connected="${connected}"
  data-logo-path="http://localhost:7000//assets/images/logo.png"
  data-link-connect="/auth/login"
  data-link-unconnect="/logout/"
>
</bux-header>
```
