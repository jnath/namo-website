function centrage() {
	//Permet le centrage vertical (et plus) via javascript d'un élément sur la page
	var self = this;
	this.objets_a_centrer = [];
	this.nb_objets = 0;

	//if (hasTouch == false) {
	$(window).on("debouncedresize", function( event ) {
  		self.run();
	});
	//};
}

centrage.prototype.ajouterElement = function(x,mode,yOffset,xOffset) {
	mode = mode || 0;
	yOffset = yOffset || 0;
	xOffset = xOffset || 0;

	console.log('ajouterElement('+x+','+mode+','+yOffset+','+xOffset+')');
	t = [x,mode,yOffset,xOffset];
	this.nb_objets = this.objets_a_centrer.push(t);
};

centrage.prototype.centrerElement = function(x,mode,yOffset,xOffset) {
	console.log('centrerElement('+x+','+mode+','+yOffset+','+xOffset+')');
	mode = mode || 0;
	yOffset = yOffset || 0;
	xOffset = xOffset || 0;

  	var hauteur = ( $(window).height() - $(x).height() ) / 2;
  	var largeur = ( $(window).width() - $(x).width() ) / 2;

  	if (mode==0) { //centrage vertical
  		$(x).css("top", hauteur+yOffset);
  	}
  	else if (mode ==1) { //centrage horizontal
  		$(x).css("left", largeur+xOffset);
  	}
  	else { //centrage horizontale
  		$(x).css("top", hauteur+yOffset);
  		$(x).css("left", largeur+xOffset);
  	}

};

centrage.prototype.run = function()
{
	console.log('run');
	for (var i = this.nb_objets - 1; i >= 0; i--) {
		console.log(i);
		this.centrerElement(this.objets_a_centrer[i][0],this.objets_a_centrer[i][1],this.objets_a_centrer[i][2],this.objets_a_centrer[i][3]);
	};

};
console.log('loaded : centrer.js');