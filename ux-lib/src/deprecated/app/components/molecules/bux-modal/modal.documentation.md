# Composant bux-modal

Ce composant affiche une modale.

On utilise les méthodes du composant :

- init() pour initialiser et ouvrir la modal.
  init prend un object en paramètres avec les clés optionnels suivantes:

  - label: {String} Titre de la modale
  - content: {html} contenu de la modale
  - labelFailure: {String} label du bouton d'annulation
  - labelSuccess: {String} label du bouton de validation
  - onFailure: {Function} fonction à appliquer au clic du bouton d'annulation
  - onSuccess: {Function} fonction à appliquer au clic du bouton de validation
  - type: {String} par défaut 'modal' définit le type de la modale, valeurs possibles: 'modal', 'toast'
  - closable: {Bol} par défaut true : par défaut affiche un croix, permet de fermer la modale
    en cliquant dessus ou en cliquant à côté
  - autoOpen: {Bol} par défaut true : ouvrir automatiquement la modale après son initialisation
  - focusBackElement: Le focus sera remis sur cet élément à la fermeture de la modale.
                      Si c'est un string le module va utiliser document.querySelector pour essayer
                      de le selectionner dans le dom.
                      Il est préférable de lui fournir directement un HTML Element.
                      Attention cet élément doit être focusable (soit a, input, button ...) sinon une
                      balise avec un tabindex="0"


- open() pour ouvrir la modale
- close() pour la fermer
- destroy() pour supprimer l'intérieur de la modale

Il existe un autre méthode **update()** qui permet de mettre à jour la modale lorsque l'on
a modifier un de ces attributs (cf exemple).

## Exemple d'utilisation

```html

<h2 id="focusEl" tabindex="0">Le focus va se faire ici à la fermeture</h2>

<!-- On insère n'importe où dans le dom la balise -->
<bux-modal id="buxModal"> </bux-modal>

<!-- On rajoute un bouton pour la controler -->
<bux-btn-group>
  <bux-btn id="btnModal">Open Modal</bux-btn>
  <bux-btn id="updateBtnModal">Update modal</bux-btn>
</bux-btn-group>

<script>
  const modal = document.querySelector('#buxModal');
  const btnModal = document.querySelector('#btnModal');
  const updateBtnModal = document.querySelector('#updateBtnModal');



    customElements.whenDefined('bux-modal').then(() => {
      btnModal.addEventListener('click', () =>
        modal.init({
          label: 'Mon Titre',
          content: '<p>Je suis un contenu</p><p>deuxièmeligne</p>',
          labelFailure: 'annuler',
          labelSuccess: 'ok',
          onFailure: () => modal.close(),
          onSuccess: () => modal.close(),
          closable: true,
          autoOpen: true,
          focusBackElement: document.getElementById('focusEl')
        })
      );

      updateBtnModal.addEventListener('click', () => {
        // On va maintenant mettre à jour la modale
        modal.label = 'Mon Nouveau Titre';
        modal.content = '<p>Pour me fermer cliquer sur le bouton fermer</p>';
        modal.labelFailure = 'Nouveau Annuler';
        modal.labelSuccess = 'Fermer';
        modal.onFailure = () => alert('Nouvelle fonction sur failure');
        modal.onSuccess = () => modal.close();
        modal.closable = false;
        modal.update();
        modal.open();
      });
    });
</script>
```
