/* sizeMenu.js */

function sizeMenu() {
	var self = this;
	this.target=document.getElementById("navigation");
	console.log("sizeMenu();");
}

sizeMenu.prototype.run = function() {
	wh = window.innerHeight;
	oh = wh-
	v = this.target.offsetWidth;
	console.log(v);
	//this.target.style.left = (-338-v)+"px";
};

var s = new sizeMenu();
s.run();