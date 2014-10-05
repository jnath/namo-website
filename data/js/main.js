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

function initPositionImg(){
	var texts = $('#flux_textes').children();
	var leftPosImg = $('#navigation').offset().left + $('#navigation').outerHeight(true);
	var i=0;
	var leftTotal=0;
	$('#flux_images img').each(function(){
		var containerWidth = $(texts[i]).outerHeight()
		
		var imgWith = containerWidth - $(texts[i]).outerHeight();
		var colonne = $(texts[i]).find('.colonnes')[0];
		var moreLeft = 0;

		leftTotal+=$(texts[i]).offset().top;

		if($(colonne).hasClass('prefix-1')){
			moreLeft =  ( ( $(this).outerHeight()-imgWith ) /2 ) + $(colonne).outerHeight();
		}else if($(colonne).hasClass('prefix-2')){
			moreLeft = ( $(this).outerHeight()-imgWith ) /2 ;
		}
		// TODO: add for prfix-3
	    $(this).css({
	        position: "absolute",
	        top: $(texts[i]).offset().top + ($(texts[i]).outerHeight()-$(this).outerHeight()),
	        left: leftTotal + moreLeft,
	    });
	    i++;
	});
}

$( document ).ready(function() {
	initAndResize();
	initClickAndScroll();

	var leftPosImg = $('#navigation').offset().left + $('#navigation').outerHeight(true);

	$("html").niceScroll();

	$('#flux_images').css({
	    position: "absolute",
	    "z-index": -9998,
	    left: leftPosImg,
	    top: 0,
	    "pointer-events": "none"
	});
	
	initPositionImg();

	$( window ).scroll(function() {
	    $('#flux_images')
	    .animate({ 
	        left: leftPosImg - ( $(this).scrollTop() )
	    }, 0.5, 'swing');
	});

	$( window ).resize(function() {
		initAndResize();
	});
});
