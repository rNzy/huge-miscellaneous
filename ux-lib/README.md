# Installation

Le projet necessite la version de node >=8.11.4 (il marche avec la 10.15)

Pour vérifier la version utilisée

```
node -v
```

Pour changer de version de node installer [nvm](https://github.com/creationix/nvm/blob/master/README.md)

Puis cloner le projet

```bash
cd ~
git clone https://gitlabtux2-a.l.infra.arkea.com/BAD/9020/ux-library.git ux-library
```

Installer maintenant le projet

```bash
npm install
```

# Méthode de travail

- [methode de travail](./docs/workflow/workflow.md)

# EFS

- [Ajouter un nouvel efs](./docs/efs/addNewEfs.md)
- [Travailler avec les efs](./docs/efs/workWithEfs.md)

# Créer un nouveau composant

Il faut sur la machine python3.

Pour l'installer utiliser la commande :

```bash
sudo apt get install python
```

Pour créer un nouveau composant il faut lancer la commande suivant puis répondre aux questions affichées dans le terminal :

```bash
npm run new
```

A la fin du processus il ne faut pas oublier de rajouter dans les fichiers suivants :

- test/cmb/index.html
- src/cmx.part.import.js

Ne pas oublier tout les fichiers équivalents avec un autre EFS ou thème par exemple :

- test/abei/index.html
- src/abei.import.js

# Visualiser la doc :

Prenons l'exemple de cmb

```bash
npm run storybook:cmb
```

Si on avait abei

```bash
npm run storybook:abei
```

Ceci lance un serveur sur le port 7001 :
http://localhost:7001/

Pour le voir depuis l'extérieur :
http://lin0156587.pdt.arkea.com:7001/

En remplacant lin pour le lin de votre ordinateur que l'on voit quand on lance un terminal :

```bash
Moi.Moi@LIN0156587:
```

# Pour rajouter une doc générale dans la section Overview :

Il faut dans le fichier .storybookconf/overview.stories.js

Rajouter la story.

# Test

- [test](./docs/tests/tests.md)
