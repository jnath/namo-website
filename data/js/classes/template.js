function maClasse( monArgument ) {
	var self = this;
	this.attribut = monArgument;

	$('body').click( function( event ) {
		//console.log(self.smasher);
		self.maMethode();
	});
	console.log("maClasse("+argument+");");
}

maClasse.prototype.maMethode = function() {
	console.log("maMéthode();");
};

var objet = new maClasse( 'argument' );