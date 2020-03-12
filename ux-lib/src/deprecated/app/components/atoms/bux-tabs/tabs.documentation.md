# Tabs

Ce composant affiche des tabs. Il possède un attribut :

Ce composant est défini par :

| Properties    | Type      | Default | Description                                     |
| :------------ | :-------- | :------ | :---------------------------------------------- |
| tabactive     | `number`  | 0       | active la tab                                   |
| type          | `string`  | -       | default, soit dropdown                          |
| data-icon          | `string`  | null       | ajoute une icône à l'onglet                          |
| neutral-start | `boolean` | false   | permet de ne pas selection de tabs au démarrage |
| nocontainer   | `boolean` | false   | retire le bux-container insérer par dropdown    |

Pour changer la tabactive on peut :

- soit modifier l'attribut,
- soit modifier la propriété

## Exemple :

```html
<bux-tabs tabactive="0">
    <div class="c-tabs__data" title="Paiements étalables">
        <h3>Titre de la section</h3>
        <p>Paragraphe</p>
        <p>Ici trois balises</p>
    </div>
    <div class="c-tabs__data" title="Étalements modifiables">
        Contenu sans div balise wrapper
    </div>
    <div class="c-tabs__data" title="Étalements enregistrés" data-icon="portefeuille">
        <div>
        <h3>L'onglet possède une icône</h3>
        <p>Paragraphe</p>
        <p>Ici trois balises mais une div les wrappes</p>
        </div>
    </div>
</bux-tabs>

<script>
    <!-- Changer la tab active -->
    const buxTabs = document.querySelector('bux-tabs);

    buxTabs.tabactive = 1;
<script>

```

La structure indispensable est d'avoir au minimum une div à l'interieur de <bux-tabs> :

- ayant la classe "c-tabs\_\_data" - un attribut title qui sera affiché dans la tab
- l'interieur de la div sera recopié au bon endroit.
