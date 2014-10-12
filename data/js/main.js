var c = new Center();

function initAndResize(){
	c.centerY("navigation",-200);
	$('.flux_images').each(function(){
		$(this).css('margin-top','-' + $(this).height() / 2 + 'px');
	});
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




var inc = 0;
var lastTarget;
function setPos(target, direction){
	var rv = null;

	var fixedPos = 0;
	// if(lastTarget){
	// 	switch(direction){
	// 		case 'left':
	// 			var lastTargetColonne = $(lastTarget).find('.colonnes').last();
	// 			$(lastTargetColonne).css('position', 'fixed');
	// 			// fixedPos = $(window).width() - ( lastTargetColonne.offset().left + lastTargetColonne.width() );
	// 		break;
	// 		default:
	// 		case 'top':
	// 			// fixedPos = ( $(lastTarget).offset().top + $(lastTarget).height() ) - 1;
	// 			console.log(fixedPos);
	// 		break;
	// 	}
		
	// }

	switch(direction){
		case 'left':

			rv = {
				start:{
					pos: inc + fixedPos ,
					value: $(window).width(),
				},
				end:{
					pos: (inc + $(target).width()),
					value: -$(target).width(),
				}
			};
		break;

		default:
			direction = 'top';
		case 'top':
			rv = {
				start:{
					pos: inc - fixedPos,
					value: $(window).height(),
				},
				end:{
					pos: (inc + $(target).height()),
					value: -$(target).height()-10,
				}
			};
			break;
	}
	
	$(target).attr('data-' + rv.start.pos, direction + ':' + rv.start.value + 'px;');
	$(target).attr('data-' + rv.end.pos, direction + ':' + rv.end.value + 'px;');

	// $(target).attr('data-' + rv.start.pos, 'transform:translate(0,100%)');
	// $(target).attr('data-' + rv.end.pos, 'transform:translate(0,-100%)');

	inc =  rv.end.pos;

	$(target).css({
		position:'fixed',
	});

	lastTarget = target;
	
	return rv;
}


$( document ).ready(function() {

	$("html").niceScroll({
		// mousescrollstep: 5,
	});

	$('.flux_images').each(function(){
		var width = 0;
		var height = 0;
		$(this).children().one("load").css({
			'display':'block',
			'padding-left':'100px',
			float:'left',
		}).each(function(){
			width += $(this).width() + parseInt($(this).css('padding-left'));
			if(height < $(this).height()){
				height = $(this).height();
			}
			console.log(this.complete);
		});
		$(this).css({
			left:$( window ).width(),
			width:width + 10,
			height:height,
			top:'50%',
		});
	});

	$('.commander').css({
		height:$(window).height(),
	});

	$('.anim').each(function(){
		var direction = $(this).hasClass('horizontal') ? 'left' :'top';
		var fluxImages;
		$(this).children('.flux_images').each(function(){
			fluxImages = this;
		});

		if(fluxImages){
			var rv = setPos(fluxImages, direction);
			$(this).children('.fixe_title').each(function(){
				$(this).css({
					position: 'fixed',
					'z-index': 100000,
					left : '15%',
					top: '5%',
				});
				$(this).attr('data-0','opacity:0');
				$(this).attr('data-' + (rv.start.pos-50),'opacity:0');
				$(this).attr('data-' + rv.start.pos,'opacity:1');
				$(this).attr('data-' + rv.end.pos, 'opacity:1');
				$(this).attr('data-' + (rv.end.pos+50), 'opacity:0');
				$(this).attr('data-end','opacity:0');
			});
		}else{
			setPos(this, direction);
		}	

		
	});

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
	initAndResize();
});