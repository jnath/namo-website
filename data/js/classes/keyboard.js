console.log("keyboard.js");

function keyboardEvents() {
    var self = this;
	$(window).keyup(function(event) {
		console.log(event.which);
		self.maMethode();
		if ( event.which == 82 ) {
			self.maMethode();
		}
	});
}

keyboardEvents.prototype.meMethode = function()
{
	console.log("keyboard.maMethode");
};

k = new keyboardEvents();