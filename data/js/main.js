var c = new Center();

function initAndResize(){
	c.centerY("navigation",-200);
	positionImg();
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

function positionImg(){
	var texts = $('#flux_textes').children();
	var leftPosImg = $('#navigation').offset().left + $('#navigation').outerHeight(true);

	$('#flux_images').css({
	    left: leftPosImg,
	});

	var i=0;
	var leftTotal=0;
	$('#flux_images img').each(function(){
		var containerWidth = $(texts[i]).outerHeight();

		var imgWith = containerWidth - $(texts[i]).outerHeight();
		var colonne = $(texts[i]).find('.colonnes')[0];
		
		leftTotal+=0;

		var moreLeft = 0;
		if($(colonne).hasClass('prefix-1')){
			moreLeft = $(colonne).outerWidth();
		}else if($(colonne).hasClass('prefix-2')){
			moreLeft = 0 ;
		}

		moreLeft += ( $(colonne).outerWidth() - containerWidth ) / 2;

		// TODO: add for prfix-3
	    $(this).css({
	        position: "absolute",
	        top: $(texts[i]).offset().top + (containerWidth-$(this).outerHeight()) /2 ,
	        // left: leftTotal + moreLeft,
	        left: $(texts[i]).offset().top + moreLeft
	    });
	    i++;
	});
}

$( document ).ready(function() {
	initAndResize();
	initClickAndScroll();
	$("html").niceScroll();

	var leftPosImg = $('#navigation').offset().left + $('#navigation').outerHeight(true);

	$('#flux_images').css({
	    position: "absolute",
	    "z-index": -9998,
	    top: 0,
	    "pointer-events": "none"
	});
	
	positionImg();

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
