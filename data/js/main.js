if (window.jQuery) { console.log("JQuery loaded"); } else { console.log("JQuery not loaded");}

var c = new centrage();

$( document ).ready(function() {
	c.ajouterElement('#flux_images');
	c.ajouterElement('#navigation');

	c.run();
	setTimeout('c.run()',100);
	setTimeout('c.run()',200); //delay pour safari et chrome…
});

console.log('loaded : main.js');