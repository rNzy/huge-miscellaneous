# &lt;bux2-font&gt;

Ce composant sert à afficher des variations de typos sur des textes.
Note : contrairement au composant &lt;bux-wrap&gt; il ne concerne que les éléments <strong>display-inline</strong>.

| Properties | Type      | Default | Description                                                                                                |
| :--------- | :-------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| data-size  | `string`  | default | taille de police (xs, sm, md, lg, xl)                                                                      |
| bold       | `boolean` | -       | mise en gras                                                                                               |
| italic     | `boolean` | -       | mise en italique                                                                                           |
| underline  | `boolean` | -       | souligne le texte                                                                                          |
| uppercase  | `boolean` | -       | capitalisation du texte                                                                                    |
| data-color | `string`  | -       | 2 possibilités: mot_clef_défini (ex: "part", "pro") ou code hexadecimal (ex: "#0519EF", "#CC5500", '#ccc') |

## Utiliser &lt;bux2-font&gt;

```html
<bux2-font size="md" bold italic underline uppercase color="pro"
  >ceci est une portion de texte (inline!)</bux2-font
>
```
