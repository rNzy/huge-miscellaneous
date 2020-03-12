# Composant bux-row

Ce composant affiche une barre de progression.

Il est défini par un attribut :

- data-date string
- data-label string
- data-sublabel string
- data-amount string
- data-currency string (optional)
- noborderbottom boolean
- link {boolean}
- radio {boolean}

Pour avoir une row avec un lien il faut en plus :

- data-link
- a11y-label

## Exemple :

```html
<!-- Sans lien -->
<bux-row
  data-date="18/11/17"
  data-label="AMAZON PAYMENT"
  data-sublabel="N° 12345555"
  data-amount="-352.50"
>
</bux-row>

<!-- Avec un lien -->
<bux-row
  data-date="18/11/17"
  data-label="AMAZON PAYMENT"
  data-sublabel="N° 12345555"
  data-amount="-352.50"
  data-link="/insert/route/here"
  a11y-label="voir le détail"
  noborderbottom
>
</bux-row>

<!-- Avec un bouton radio -->
<bux-row
  radio
  data-date="18/11/17"
  data-label="AMAZON PAYMENT"
  data-sublabel="N° 12345555"
  data-amount="-352.50"
  data-link="/insert/route/here"
  a11y-label="voir le détail"
  noborderbottom
>
</bux-row>

<!-- Avec aspect d'un lien, sans data-link -->
<bux-row
  data-date="18/11/17"
  data-label="AMAZON PAYMENT"
  data-sublabel="N° 12345555"
  data-amount="-352.50"
  a11y-label="voir le détail"
  noborderbottom
  link
>
</bux-row>
```
