# bux-nav-bar

Ce composant permet de faire une barre de navigation.

Il a comme attribut :

- type string :

  - primary : menu à gauche
  - primarysub : sous menu dans le menu à gauche
  - secondary : menu au dessus du contenu
  - footer : footer
  - footermobile : footer mobile présent quand on ouvre le menu
  - sociaux : barre des réseaux sociaux dans le menu à gauche

- bubble-effect : si cet attribut est présent permet de faire une div rouge qui se
  déplace sur l'élément actif du menu. (Fonctionne actuellement pour secondary)
- noborderbottom : si cet attribut est présent il n'y a pas de bordure à la fin du menu

Il a comme propriété data (cf exemple). Data est un tableau d'objet qui contient :

```js
data = [{
  type: string // par défaut fais un lien, autre option button, 
  path: string, // Lien sur la balise a. Ceci est facultatif. Si non fournie alors rend une div au lieu d'un a
  label: string , // Nom du lien
  sublabel: string, // Sous nom du lien
  icon: string, // Nom de l'icone à afficher
  badge1: string, // Petite bulle afficher à gauche du lien
  badge2: string, // Petite bulle afficher à gauche du lien
  isActive: boolean, // true or false le lien est actif
  submenu: [],
  a11yLabel: string, // label pour l'accessibilité
  identifier: string, // Facultatif si set alors donne un id à l'élément généré
},
...
,
{
  ...
}
]
```

Dans data la propriété submenu est un tableau de data (cf. exemple)

## Exemple :

```html

<!-- Composant pour afficher la bux-nav-bar -->
<bux-nav-bar id="nav" type="primary"></bux-nav-bar>

<!-- Nous utilisons ce boutton pour mettre à jour la nav-bar -->
<button id="updateNav">Mettre à jour la nav-bar</button>

<script>

  const updateNav = document.getElementById('updateNav');
  const nav = document.getElementById('nav');

  // Lui fournir data pour qu'il s'affiche
  nav.data = [
    {
      path: '#',
      label: 'Ma situation',
      sublabel: 'Actualité, e-documents',
      icon: 'conseiller',
      badge1: '5',
      badge2: 'new',
      a11yLabel: 'Coucou'
    },
    {
      label: 'Comptes & épargne',
      sublabel: 'Gestion des comptes, moyens de paiements',
      icon: 'carte-billets',
      isActive: 'true',
      identifier: 'myid',
      submenu: [
        {
          path: '#',
          label: 'Mes comptes au quotidien',
          sublabel: 'Gérer mes comptes et mon budget'
        },
        {
          path: '#',
          label: 'Toute mon épargne'
        },
        {
          path: '#',
          label: 'Virement',
          isActive: 'true'
        },
        {
          path: '#',
          label: 'Cartes et chéquiers'
        }
      ]
    },
    {
      path: '#',
      label: 'Mes assurances',
      icon: 'conseiller'
    },
    {
      path: '#',
      label: 'Mes crédits',
      icon: 'conseiller'
    }
  ];

  // Mise à jour de la naav bar 
  updateNav.addEventListener('click', () => {
    nav.data = [
      {
        path: '#',
        label: 'Ma situation',
        sublabel: 'Actualité, e-documents',
        icon: 'conseiller',
        badge1: '5',
        isActive: 'true'
      },
      {
        label: 'Comptes & épargne',
        sublabel: 'Gestion des comptes, moyens de paiements',
        icon: 'carte-billets',
        submenu: [
          {
            path: '#',
            label: 'Mes comptes au quotidien',
            sublabel: 'Gérer mes comptes et mon budget'
          },
          {
            path: '#',
            label: 'Toute mon épargne'
          },
          {
            path: '#',
            label: 'Virement'
          },
          {
            path: '#',
            label: 'Cartes et chéquiers'
          }
        ]
      },
      {
        path: '#',
        label: 'Mes assurances',
        icon: 'conseiller'
      },
      {
        path: '#',
        label: 'Mes crédits',
        icon: 'conseiller'
      },
      {
        path: '#',
        label: 'Bourse',
        icon: 'bourse'
      }
    ];
  });
</script>
```
