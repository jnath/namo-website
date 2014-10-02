/* center.js */
// small lib that allow centering elements vertically and horizontally
// js-only

function center() {
	var self = this;
}

center.prototype.centerY = function(target,offset) {
	target = document.getElementById(target);
	offset = offset || 0;
	h = target.offsetHeight; // target height
	wh = window.innerHeight; // window height
	y = (wh-h)/2+offset;
	target.style.top = y+"px";
};

center.prototype.centerX = function(target,offset) {
	target = document.getElementById(target);
	offset = offset || 0;
	w = target.offsetWidth; // target width
	ww = window.innerWidth; // window width
	x = (ww-w)/2+offset;
	target.style.left = x+"px";
};

center.prototype.center = function(target,xOffset,yOffset) {
	xOffset = xOffset || 0;
	yOffset = yOffset || 0;
	this.centerY(target,yOffset);
	this.centerX(target,xOffset);
};

// creating object, targeting, and go.

var c = new center();
c.centerY("navigation",-200);
