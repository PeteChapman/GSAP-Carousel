/*
 * VERSION: 1.0.0
 * DATE: 2014-04-23
 *
 * @license Copyright (c) 2008-2014, Pete Chapman. Released under GNU GPL.
 * 
 * @author: Pete Chapman, https://github.com/PeteChapman
 */
	
// initialisation
var speed = 0.3; 						// slide speed
window.onload = function() {			// bind click handler
	bindSlides(Sizzle("DIV.slide"));	// handle resize
};
window.onresize = sizeFrames;

// bind the click handler
function bindSlides(slides) {
	slides.forEach(function(el) {
		el.onclick = nextSlide;
	});
}	

// show next slide
function nextSlide() {
	var frameSlides = Sizzle("DIV.slide", this.parentNode);
	var currentSlideIndex = frameSlides.indexOf(this);
	var nextSlideIndex = currentSlideIndex == (frameSlides.length - 1) ? 0 : currentSlideIndex + 1;  // back to start
	var nextSlide = frameSlides[nextSlideIndex];
	TweenLite.set(nextSlide, {left : "100%", display : "block"});
	TweenLite.fromTo(this.parentNode, speed, {height : this.clientHeight}, {height : nextSlide.clientHeight});
	TweenLite.to(this, speed, {left : "-100%",position : "absolute"});
	TweenLite.fromTo(nextSlide, speed, {left : "100%"}, {left : "0px",display : "block",position:"absolute"});
}

// resize the frame for new content
function sizeFrames() {
	Sizzle("DIV.slide").forEach(function(el) {
		parent = el.parentNode;
		if ((el.left == 0) && (el.scrollHeight < parent.scrollHeight)) {
			TweenLite.to(parent, speed, {height: el.scrollHeight});
		}
	});
};	
