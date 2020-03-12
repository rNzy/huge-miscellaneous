# Composant bux-end-process

Ce composant affiche une page de fin de process, les pages en construction, les pages en smi

| Properties        | Type      | Default | Description                                                                            |
| :---------------- | :-------- | :------ | :------------------------------------------------------------------------------------- |
| type              | `string`  |         | success / error / smi / underConstruction / debranchement / pending                    |
| data-label        | `string`  | -       | phrase d'entete                                                                        |
| data-sublabel     | `string`  | -       | phrase de sous-titre                                                                   |
| data-label-button | `string`  | -       | label du bouton si vide pas de bouton                                                  |
| data-url          | `string`  | -       | Si l'on doit donner l'url pour le bouton                                               |
| data-type-button  | `string`  | 'link'  | Fait un lien où un boutton pour les bouttons d'action                                  |
| data-html         | `string`  | -       | Permet d'inserer du html apres le label, le sous-label mais avant le bouton            |
| autofocus         | `boolean` | true    | Met automatiquement le focus sur le label                                              |
| data-icon         | `string`  | -       | Nom de l'icone à insérer (non nécessaire pour type succes error smi underConstruction) |
| data-img          | `string`  | -       | Url de l'image a insérer si data-icon est renseigner cet attribut n'est pas utilisé    |

Le composant émet un évènement lorsque l'on clique sur:

- le bouton: le nom d'évènement est 'end'

## Exemple

```html
<bux-end-process
  type="success"
  data-label="Votre demande d’étalement a bien été prise en compte"
  data-sublabel="Vous pouvez modifier cet étalement tant que le premier prélèvement n’a pas été effectué."
  data-label-button="Terminer"
>
</bux-end-process>
```

autre exemple

```html
<bux-end-process
  data-icon="loupe"
  autofocus="false"
  data-html="<p>Nous n'avons pas trouvé de fonctionnalité correspondant à la recherche<br/><strong>test</strong></p><bux-message type="info"><p>Vérifiez l'orthographe ou relancer une recherche avec de nouveaux termes</p></bux-message>"
>
</bux-end-process>
```

## SMI

```html
<bux-end-process type="smi"></bux-end-process>
```

## En construction

```html
<bux-end-process type="underConstruction" data-url="monurl"></bux-end-process>
```
