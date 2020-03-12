# Composant bux2-progressbar

Composant affichant une barre de progression, simple ou double.

| Properties            | Type     | Default | Description                                      |
| :-------------------- | :------- | :------ | :----------------------------------------------- |
| value / value-primary | `number` | -       | Progression de la barre principale               |
| value-secondary       | `number` | -       | Progression de la barre secondaire (optionnelle) |

## Exemple :

Barre de progression simple

```html
<bux2-progressbar value="42"></bux2-progressbar>
```

Barre de progression double

```html
<bux2-progressbar value-primary="42" value-secondary="8"> </bux2-progressbar>
```
