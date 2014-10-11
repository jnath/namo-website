var c = new Center();

function initAndResize(){
	c.centerY("navigation",-200);
}

function initClickAndScroll(){
	$('a[href^="#"]').click(function(){  
	    var the_id = $(this).attr("href");  
	  
	    $('html, body').animate({  
	        scrollTop:$(the_id).offset().top  
	    }, 'slow');  
	    return false;  
	});
}


$( document ).ready(function() {
	$("html").niceScroll({
		// mousescrollstep: 5,
	});

	// $('.flux_images').each(function(){
	// 	var containerDiv = $('<div>');
	// 	containerDiv.css({
	// 		width:'100%',
	// 		'overflow-x':'hidden',
	// 		'overflow-y':'hidden',
	// 		height:350,
	// 	});
	// 	$(this).after(containerDiv);
	// 	containerDiv.append(this);
	// 	$(this).css({
	// 		width:(6*350),
	// 		position:'relative'
	// 	});
	// });

	$('.flux_images').css({
		// position: 'relative',
		left:$( window ).width(),
		width:6*350,
		height:350
	});
	// var i=0;
	// $('.flux_images').each(function(){
	// 	$(this).css({
	// 		position: 'relative',
	// 		left:$( window ).width()-100 + ($(this).parent().height()-$(this).height()),
	// 		width:10000,
	// 		height:350
	// 	});
	// 	i++;
	// });

	$('.flux_images img').css({
		float:'left'
	});
	// $( document ).bind('mousewheel', function(e){
	// 	var delta = e.originalEvent.wheelDelta;
	// 	var stop = false;
	// 	var target;
	// 	console.log(delta);
	// 	$('.flux_images').each(function(){
	//     	var scrollTop = $(window).scrollTop() + ( $(window).height() - $(this).height() ) / 2;
	//     	var imgsTop = $(this).position().top;
	//     	if( scrollTop >= imgsTop ){
	//     		if( !($(this).position().left + $(this).width() < 0 ) ) {
	// 	    		stop = true;
	// 	    		target = this; 
	// 	    		e.stopImmediatePropagation();
	// 	    		return;
	//     		}
	//     	}
	//     });
	    
	//     if(stop) {
	// 		$(target).animate({ 
	// 	        left: '+=' + e.originalEvent.wheelDelta,
	// 	    }, 0.5, 'swing');
	//     	return false;
	//     }
	    
	    
	// });

	var s = skrollr.init({
		edgeStrategy: 'set',
		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
			}
		}
	});

	$( window ).resize(function() {
		initAndResize();
	});
});
