# File download component

Ce composant sert à afficher un bouton de téléchargement de fichier.
Les attributs pour configurer ce composant sont:

- data-label : renseigne le titre
- data-sublabel : renseigne le sous-titre
- data-path : renseigne le chemin vers le fichier à télécharger
- data-filename : renseigne le nom du fichier (insérer dans l'attribut download)
- data-filesize : renseigner le poids du fichier
- data-filelang : renseigne la langue du fichier
- data-filetype : renseigner le format du fichier
- a11y-label : renseigne le champ title ainsi que le ari-label pour l'accessibilité
- horizontal : remplace le format carte par un format horizontal sur une ligne
- nomarginbottom : annule l'espace bas présent par défaut

Ce composant émet un custom event de type "dlclick" quand on clique sur le lien.

## Exemple

```html
<bux-file-download
  data-label="mes données personnelles"
  data-sublabel="à télécharger"
  data-path="/path/to/file"
  data-filename="FILE_NAME"
  date-filesize="FILE_SIZE"
  date-filelang="FILE_LANG"
  data-filetype="FILE_TYPE"
  a11y-label="Télécharger vos données personnelles"
>
</bux-file-download>
```
