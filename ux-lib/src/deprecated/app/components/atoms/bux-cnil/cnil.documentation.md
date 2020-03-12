# Composant bux-cnil

Affiche un bandeau cnil

Ce composant est défini par des attributs :

| Properties           | Type     | Default            | Description                            |
| :------------------- | :------- | :----------------- | :------------------------------------- |
| data-content         | `string` | cf plus loin       | contenue afficher dans le bandeau cnil |
| data-cookie-name     | `string` | 'trackingAccepted' | nom du cookie déposé si ok             |
| data-cookie-duration | `string` | '365'              | durée de validité du cookie en jour    |
| data-cookie-path     | `string` | '/'                | path du cookie                         |
| data-cookie-domain   | `string` | null               | facultif, domaine du cookie            |

Le content par défaut est :

```html
En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de
cookies, notamment pour nous permettre d'améliorer nos contenus et vous proposer
des services adaptés. Pour en savoir plus
<a
  class="c-cnil-a"
  href="public/donneesPersonnelles/"
  aria-label="En savoir plus"
>
  cliquer ici.
</a>
```

## Exemple :

```html
<!-- Notre composant bux-cnil -->
<bux-cnil
  data-cookie-name="trackingAccepted"
  data-cookie-duration="365"
  data-cookie-path="/"
></bux-cnil>
```
