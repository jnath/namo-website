/* posMenu.js */

function posMenu() {
	var self = this;
	this.target=document.getElementById("navigation");
	console.log("posMenu();");
}

posMenu.prototype.run = function() {
	v = this.target.getBoundingClientRect();
	v = v.left;
	console.log(v);
	this.target.style.left = (-338-v)+"px";
};

var p = new posMenu();
p.run();