# Radio button

Ce composant sert à afficher un élément input de type radio avec son label.

Ce composant est défini par :

- data-label : string - correspond au label visible de l'input
- data-value : string - correspond à la valeur de l'input, mais est aussi utilisé pour définir son id et pour l'attribut for qui lie l'input et son label.
- data-name :  string name of input

## Exemple d'utilisation

````html
<bux-radio-button
  data-label="radio label"
  data-value="radio value 1"
  data-name="inputname"
  >
</bux-radio-button>
````
