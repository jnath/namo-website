# ReadMe

* 1. Description
* 2. Structure du projet
* 3. Spécifications

## 1. Description

## 2. Structure du projet

* / : racine
* /index.html : le site.
* /data : contient toutes les données nécéssaires.
	* /data/css : contient les différentes feuilles de style compilées depuis SASS
	* /data/fonts : contient les webfonts nécéssaires
	* /data/html : html supplémentaire si besoin
	* /data/img : contient les différentes images nécéssaires
	* /data/js : le js…
	* /data/sass : contient les éléments de feuilles de style en SASS
		* _reset.scss : contient les éléments de reset CSS
		* _fontfaces.scss : contient les déclarations @fontfaces
		* _variables.scss : les déclarations des différentes variables utilisées. dimensions, typographies, couleurs, etc.
		* _mini_framework_colonnes : contient un mini framework de mise en page
		* _navigation.scss : CSS relatif aux éléments de navigation
		* _general.scss : CSS général
		* _contenu.scss : CSS relatif au contenu
		* _mediaqueries.scss : CSS relatif aux mediaqueries
		* style.scss : feuille de style générale incluant les précédentes et ne recevant aucune déclaration css
* /sources : contient des fichiers de travail, par exemple les originaux des photos, images
	* /sources/fonts : .sfd (fontforge) des fontes du site
	* /sources/images : images sources

## 3. Spécifications

	### Wording

		Se reporter à /sources/textes/reference_wording.md

	### Graphisme

		#### Typographie

			* général
				* famille : Swift
				* ligne de base : ?

			* menu et titrage
				* Swift bold
				* 18px/24px

			* texte « courant »
				* Swift bold
				* 28px/36px

		#### Structure

			##### Contenu

				###### grand format

					* de ? à 600 px de large
					* structure à 4 colonnes (4x25%)
					* gouttières (1%)
					* marge (4%)

				###### petit format (mobile)

					* de 600 px de large à 0
					* structure à une colonne (1x100%)
					* marge (?%)

			##### Navigation
