# Composant bux-list

Ce composant créer un liste pour tous ces éléments enfants

Ce composant est défini par :

- type string : pour l'instant une valeur possible nostyle

| Properties | Type      | Default | Description                              |
| :--------- | :-------- | :------ | :--------------------------------------- |
| loading    | `boolean` | -       | permet de définir l'état de ce composant |

## Utilisation

```html
<!-- Notre composant bux-list -->
<bux-loader></bux-loader>
```

Pour cet exemple l'html rendu sera :

```html
<bux-loader loading>
  <div class="c-loader is-loading" role="status" aria-live="polite">
    <bux-progress-ring loading="">
      <div class="c-progress-ring c-progress-ring--loading" aria-label="">
        <svg class="c-progress-ring__svg" viewBox="0 0 100 100">
          <circle
            class="c-progress-ring__circle"
            stroke-dasharray="289.02652413026095 289.02652413026095"
            style="stroke-dashoffset: 216.77;"
            stroke-width="8"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          ></circle>
        </svg>
        <svg
          class="c-progress-ring__svg c-progress-ring__svg--shadow"
          viewBox="0 0 100 100"
        >
          <circle
            class="c-progress-ring__shadow"
            stroke-dasharray="301.59289474462014 301.59289474462014"
            style="stroke-dashoffset: 0;"
            stroke-width="8"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          ></circle>
        </svg>
        <div class="c-progress-ring__content"></div>
      </div>
    </bux-progress-ring>
    <div class="c-loader__text">Chargement en cours</div>
  </div>
</bux-loader>
```
