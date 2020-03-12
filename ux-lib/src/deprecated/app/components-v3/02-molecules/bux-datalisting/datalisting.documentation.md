# Composant de listign d'opération avec en-tête

L'élément bux2-datalisting-row est issu du composant 'bux2-datatable'.
Il englobe deux types d'léments:

- Head: datalisting-head (avec fond gris clair)
- Row: datalisting-row (lignes normales)

## Options

- caption: Légende pour indiquer l'intitulé du listing (pour le vocal)

## Exemple d'intégration

<bux2-datalisting caption="Liste des opérations comptabilisées">
  <!-- HEAD -->
  <bux2-datalisting-head>
    <bux2-text left>Date de l'opération</bux2-text>
    <bux2-text>Libellé</bux2-text>
    <bux2-text right>Montant</bux2-text>
  </bux2-datalisting-head>
  <!-- ROWS -->
  <bux2-datalisting-row>
    <bux2-text bold left>12/03/2019</bux2-text>
    <bux2-text>Lorem ipsum dolor sit amet consectetur adipisicing elit</bux2-text>
    <bux2-amount value="3200" right></bux2-amount>
  </bux2-datalisting-row>
  <bux2-datalisting-row>
    <bux2-text bold>12/03/2018</bux2-text>
    <bux2-text>Obcaecati amet aliquid autem nemo illo</bux2-text>
    <bux2-amount value="3200" right></bux2-amount>
  </bux2-datalisting-row>
  <bux2-datalisting-row>
    <bux2-text bold>14/03/2018</bux2-text>
    <bux2-text>Aliquam voluptas suscipit in praesentium</bux2-text>
    <bux2-amount value="50.00" right></bux2-amount>
  </bux2-datalisting-row>
</bux2-datalisting>
