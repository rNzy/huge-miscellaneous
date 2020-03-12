# Account tile component

> Molecules/Account tile

## Tuile avec informations générales d'un compte + lien optionel

Plusieurs type de tuile de compte existent :

- Modèle simplifié ['simple'] ou simplifié 2 ['simple-2'] (réf. maquettes synthèse compte ou épargne).
- Modèle complet ['complete'] avec toutes les informations, ou variable ['variants'] : idem modèle complet avec en plus des variantes de couleurs par type de compte au format tablette et desktop (réf. synthèse épargne)

## Général

- Si l'attirbut 'data-account-amount' n'est pas présent, la mention 'Solde momentanément indisponible' apparaît en italique
- Si l'attribut 'data-account-amount' est renseigné avec la valeur "nodisplay" (data-account-amount="nodisplay"), le bux-amount ne sera pas injecté. (Dans le cas où on ne souhaite pas afficher le montant du solde).

## Modèles de tuiles de compte

Ci-dessous, les différentes options disponibles en fonction du modèle de tuile sélectionné :

### Modèle simplifié

- data-account-model="simple" _[modèle 'simple' sélectionné]_
- data-account-label="Total de mon épargne" _[mention libre]_
- data-account-amount="9999999.99" _[number: injection dans un bux2-amount]_
- data-account-currency="EUR" _[3 lettres correspondant à la devise]_
- shadow _[booleen]_

### Modèle simplifié 2 (même options, présentation légèrement différente)

- data-account-model="simple-2" _[modèle 'simple' sélectionné]_
- data-account-label="Total de mon épargne" _[mention libre]_
- data-account-amount="9999999.99" _[number: injection dans un bux2-amount]_
- data-account-currency="EUR" _[3 lettres correspondant à la devise]_
- shadow _[booleen]_

### Modèle 'heading' (pour les en-têtes de détail compte, avec ou sans menu switch compte)

- data-account-model="heading" _[modèle 'heading' sélectionné]_
- data-account-switch-account-id-btn="modalSwitchComptesBtn" _[id du bouton de switch compte]_
- data-account-type="saving" _Définit la couleur du titre en fonction du type de compte: 'account'(compte chèque), 'saving'(epargne), 'saving-mt'(épargne moyen terme), 'saving-lt'(épargne long terme), 'revolving'(crédit renouvelable)_
- data-account-label="Livret bleu lorem ipsum dolor" _[mention libre]_
- data-account-label-level="2" _[h2, h3, etc... Si cette option est absente, une \<div\> remplacera le \<hx\>]_
- data-account-brand="Marque" _[marque de la banque: optionnel]_
- data-account-holder="Patrick René" _[Bénéficiaire: optionnel]_
- data-account-coholder="Roxanne Bisaillon" _[Co-bénéficiaire: optionnel]_
- data-account-amount="20451.12" _[number: Montant: si pas présent, la mention 'Solde momentanément indisponible' apparaît en italique]_
- data-account-link-url="#pop-in" _[Lien vers la pop-in avec la liste des autres comptes]_
- data-account-details-to-come-up="-500.00" _[Mention 'à venir']_
- shadow _[Booléen: affiche une ombre portée sous le bloc au format tablette et desktop]_

### Modèle 'complete' (pour les tuiles de comptes)

- data-account-model="complete" _[modèle 'complete' sélectionné]_
- data-account-label="Compte Joint" _[mention libre]_
- data-account-brand="Marque" _[marque de la banque: optionnel]_
- data-account-holder="JEAN SPECIMEN" _[Bénéficiaire: optionnel]_
- data-account-coholder="JEANNE SPECIMEN" _[Co-bénéficiaire: optionnel]_
- data-account-amount="10548.88" _[number: Montant: si pas présent, la mention 'Solde momentanément indisponible' apparaît en italique]_
- data-account-link-url="detail.html" _[Lien vers le détail du compte (ou autre): optionnel]_

### Modèle 'variant' (pour les tuiles de comptes qui affichent une couleur en fonction du type de compte)

- data-account-model="variant" _[modèle 'variant' sélectionné]_

- data-account-label="Compte Joint" _[mention libre]_
- data-account-type="saving" _Définit la couleur du titre en fonction du type de compte: 'account'(compte chèque), 'saving'(epargne), 'saving-mt'(épargne moyen terme), 'saving-lt'(épargne long terme), 'revolving'(crédit renouvelable)_
- data-account-currency="EUR" _[3 lettres correspondant à la devise]_
- data-account-details="Aucun versement programmé" _[ex. 'Erreur de synchronisation', ou 'Mis à jour à 12h57' ou 'Versement programmé : 45,00 € / mois']_
- data-account-details-amount-scheduled-payment="215.25" _[number: Montant à venir. Ex.: 3 (affiche "3 versements programmés")]_
- data-account-details-amount-scheduled-currency="USD" _[3 lettres correspondant à la devise]_
- data-account-details-amount-scheduled-payment-period="an" _[number: périodicité du versement programmé]_
- data-account-brand="Marque" _[marque de la banque: optionnel]_
- data-account-holder="JEAN SPECIMEN" _[Bénéficiaire: optionnel]_
- data-account-coholder="JEANNE SPECIMEN" _[Co-bénéficiaire: optionnel]_
- data-account-amount="10548.88" _[number: Montant: si pas présent, la mention 'Solde momentanément indisponible' apparaît en italique]_
- data-account-link-url="detail.html" _[Lien vers le détail du compte (ou autre): optionnel]_
- shadow _[Booléen: affiche une ombre portée sous le bloc au format tablette et desktop]_

## Exemples d'intégration

```html
<bux-data-account-tile
  data-account-model="simple"
  data-account-label="COMPTE CHEQUES 2"
  data-account-amount="200.50"
  data-account-link-url="detail.html"
>
</bux-data-account-tile>

OU

<bux-data-account-tile
  data-account-model="variant"
  data-account-type="account"
  data-account-label="LIVRET BLEU"
  data-account-brand="Marque"
  data-account-holder="JEAN SPECIMEN"
  data-account-amount="2315.55"
  data-account-currency="EUR"
  data-account-details="À venir -1711,50€"
  data-account-link-url="detail.html"
></bux-data-account-tile>

OU

<bux-account-tile
  data-account-model="heading"
  data-account-type="saving"
  data-account-label="Livret bleu lorem ipsum dolor"
  data-account-label-level="2"
  data-account-brand="Marque"
  data-account-holder="Patrick René"
  data-account-coholder="Roxanne Bisaillon"
  data-account-amount="20451.12"
  data-account-details-to-come-up="-500.00"
  data-account-link-url="#pop-in"
></bux-account-tile>
```
