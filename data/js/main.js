var s;
var c;
var startPos;
var inc;
var menuPos;
var popinDisplayed = false;
var lastFindPos;

function initPosMenu(){
	menuPos = [];
	$('#navigation a[href^="#"]').each(function(){ 
	    var the_id = $(this).attr("href");
	    var target = $(the_id);
	    if(!target || $(the_id).hasClass('popin')) return;
	    var more=0;
	    var id = $(target).data('menuId');
	    if(!$(the_id).hasClass('anim')){
	    	target = $(the_id).parent('.anim');
	    	more = $(the_id).position().top;
	    	id = $(the_id).attr('id');
	    }

	    var pos = $.data(target[0], 'position');
	   	menuPos.push({ 
			position:  ( pos.start.pos + more ) + $(window).height() - 2,
			id: id,
		});
	});
	menuPos.sort(function(a, b){
		return a.position-b.position;
	});
}

function displayMenuA(the_id){
    $('#navigation a').css('text-decoration','none');
	$('#navigation a[href="' + the_id + '"]').css('text-decoration','underline');
}

function hidePopin(the_id){
	popinDisplayed = null;
    $('#conteneur').show();
    $('#logo').show();
	$(the_id).hide();
}

function showPopin(the_id){
    $('.popin').hide();
	popinDisplayed = the_id;
	displayMenuA(the_id);
    $('#conteneur').hide();
    $('#logo').hide();
	$(the_id).show();
}

function clickMenu(the_id){
	var target = $(the_id);
	if(!target || $(the_id).hasClass('popin')){
		showPopin(the_id);
		return;
	}
	$('.popin').each(function(){
		hidePopin('#' + $(this).attr('id'));
	});
	popinDisplayed = null;
    
    var more=0;
    if(!$(the_id).hasClass('anim')){
        target = $(the_id).parent('.anim');
        more = $(the_id).position().top -  $(window).height() / 2;
    }

    var pos = $.data(target[0], 'position');
    console.log('animate');
    // $('html, body').animate({  
    //     pageYOffset: ( pos.start.pos + more ) + $(window).height() ,
    // }, 'slow');
    s.setScrollTop(( pos.start.pos + more ) + $(window).height());
}

function initClickAndScroll(){
	$('a[href^="#"]').click(function(e){
   	    clickMenu($(this).attr("href"));
	});
}

var imgsSpace = 0;
var lastTextSpace = 0;
var lastImg = null;
function setPos(target, direction){
	var rv = null;
	
	switch(direction){
		case 'left':
			var more = ( lastImg ? $(target).find('img:last').width() : 2*$(target).find('img:first').width()+200 ) - lastTextSpace;
			rv = {
				start:{
					pos: inc + more - $(window).width() ,
					value: $(window).width(),
				},
				end:{
					pos: inc + more + $(target).width(),
					value: -$(target).width(),
				}
			};
			lastTextSpace = 0;
			addAttr(target, 'data-' + ( rv.start.pos ), direction + ':' + rv.start.value + 'px;');
			addAttr(target, 'data-' + ( rv.end.pos ), direction + ':' + rv.end.value + 'px;');
			lastImg = target;
			inc = rv.end.pos + imgsSpace;
		break;

		default:
			direction = 'top';
		case 'top':
			rv = {
				start:{
					pos: inc - $(window).height() - imgsSpace,
					value: $(window).height(),
				},
				end:{
					pos: (inc + $(target).height()),
					value: -$(target).height(),
				}
			};
			imgsSpace = 0;
			addAttr(target, 'data-' + rv.start.pos, direction + ':' + rv.start.value + 'px;');
			addAttr(target, 'data-' + rv.end.pos, direction + ':' + rv.end.value + 'px;');
			lastTextSpace = $(target).height();
			inc =  rv.end.pos;
			break;
	}

	

	$(target).css({
		position:'fixed',
	});

	return rv;
}

var datas = [];

function addAttr(target, attr, value){
	datas.push({
		target:target,
		attr: attr,
	});
	$(target).attr(attr,value);
}

function removeData(){
	$.each(datas, function( index, value ) {
	  	$(value.target).removeAttr(value.attr);
	});
}

function loadAllImages(images, callback){
	var nbImages = images.length;
	for (var i = 0; i < images.length; i++) {
		var img = images[i];
		img.onload = function(){
			nbImages--;
			if(nbImages === 0)callback();
		};
		$(img).attr('src', $(img).attr('data-src'));
	};
}

$( document ).ready(function(){
	loadAllImages($(".flux_images img"), function(){
		$('.spinner').hide();
        $('#logo h1').show();
		$('#navigation').show();
		$('#conteneur').show();
	  	init();
	  	initClickAndScroll();
	});     
});

var logoPos;

function processAnim(){
	$('.flux_images').each(function(){
		var width = 0;
		var height = 0;
		$(this).children().each(function(){
			width += $(this).width() + parseInt($(this).css('margin-left'));
			if(height < $(this).height()){
				height = $(this).height();
			}
		});
		$(this).css({
			left: $( window ).width(),
			width: width + 10,
			height: height,
			top: '50%',
		});
	});

	logoPos = $('#logo').position();
	startPos = $($('#logo')[0]).height();
	addAttr($('#logo')[0], 'data-0','top:' + logoPos.top + 'px' );
	addAttr($('#logo')[0], 'data-500','top:' + ( - startPos ) + 'px' );

	$('.anim').each(function(){
		var direction = $(this).hasClass('horizontal') ? 'left' :'top';
		var fluxImages;
		var rv;

		$(this).children('.flux_images').each(function(){
			fluxImages = this;
			$(this).css('z-index', -1000);
		});
		var target;
		if(fluxImages){
			target = fluxImages;
			rv = setPos(fluxImages, direction);
			$(fluxImages).attr('data-emit-events', '');
		}else{
			target = this;
			rv = setPos(this, direction);
			$(this).attr('data-emit-events', '');
			$(this).css({
				'z-index': 100000,
			});
		}	
		
		$.data(this, 'position', rv);

	});
}

function scaleSize(maxW, maxH, currW, currH){
    var ratio = currH / currW;
    currH = maxH;
    currW = currH / ratio;
    return {
    	width: currW, 
    	height: currH,
    };
}

function imgInit(){
	
	$('.flux_images img').each(function(){
		var size = {
			width: $(this).width(),
			height: $(this).height(),
		};
		$(this).data('originalSize', size);
    });
	imgResize();
}

function imgResize(){
	$('.flux_images img').each(function(){
		var originalSize = $(this).data('originalSize');
		$(this).css(scaleSize($(window).width(), $(window).height() - 50 * 2, originalSize.width, originalSize.height));
	});
}

function init() {

	$("html").niceScroll({
		// mousescrollstep: 5,
	});

	$('.flux_images img').css({
		'display':'block',
		'margin-left':'25px',
		float:'left',
	});

	$('#logo h1').click(function(){
		clickMenu('#a-propos')
	});

	imgInit();

	var lastId;

	$('.anim').each(function(){
		var id = $(this).attr('id');
		if(id){
			lastId = id; 
		}

		$(this).data('menuId', lastId);
	});

	c = new Center();
	startPos = $($('#logo')[0]).height();
	inc = startPos;
	processAnim();

	var scrollDisplay;
	var divsDisplay = [];
	s = skrollr.init({
		edgeStrategy: 'set',
		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
			}
		},
	    beforerender:function(pos){
	    	var findPos;
	    	if(!menuPos)return;
	    	for(var i=0; i<menuPos.length; i++){
	    		if(menuPos[i+1]){
	    			if(pos.curTop > menuPos[i].position && pos.curTop < menuPos[i+1].position){
		    			findPos = menuPos[i].id;
		    			break;
		    		}
	    		}else{
	    			if(pos.curTop > menuPos[i].position){
		    			findPos = menuPos[i].id;
		    			break;
		    		}
	    		}
	    	}
	    }
	});

	// init and resize
	function initAndResize(){
		initPosMenu();
		$('.flux_images').each(function(){
			$(this).css('margin-top','-' + $(this).height() / 2 + 'px');
		});
	}

	function resize(){
		imgResize();
		inc = startPos;
		removeData();
		processAnim();
		s.refresh();
		// TODO : test $(window).width() or $(window).innerWidth()
		if (window.innerWidth > 499) {
	        c.centerY("navigation");
	    }
	    initAndResize();
	}

	$( window ).resize(function() {
		resize();
	});

	$('.popin').each(function(){
		$(this).css({
		  'z-index': 0,
		});
        if($(this).find('.close')[0]){
            $(this).find('.close').click(function(){
                $('#navigation a').css('text-decoration','none');
                hidePopin('#' + $(this).parent().attr('id'));
            });
        }
	});

	var pageName = document.URL.split('#')[1];
	var t=$('#' + pageName);
	if(t){
        if(t.hasClass('popin')){
		  showPopin('#' + pageName);
        }else if($('#' + pageName)[0]){
          clickMenu('#' + pageName);
        }
	}
    
    var mobileMenuShow = false;
    $('#mobile-menu').click(function(){
        if(mobileMenuShow){
            mobileMenuShow = false;
            return $('#menu').hide();
        }
        mobileMenuShow = true;
        $('#menu').show();
    });
    
    
    document.onmousewheel =  function(e){
        if(popinDisplayed){
            e.stopPropagation();
            return;
        }
    };
    
	// c.centerY("navigation");
	initAndResize();
};