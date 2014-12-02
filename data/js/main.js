var s;
var c;
var startPos;
var inc;
var menuPos;

function initPosMenu(){
	menuPos = [];
	$('a[href^="#"]').each(function(){ 
	    var the_id = $(this).attr("href");
	    var target = $(the_id);
	    var more=0;
	    var id = $(target).data('menuId');
	    if(!$(the_id).hasClass('anim')){
	    	target = $(the_id).parent('.anim');
	    	more = $(the_id).position().top;
	    	id = $(the_id).attr('id');
	    }

	    var pos = $.data(target[0], 'position');
	   	menuPos.push({ 
			position: pos.start.pos + $(window).height() / 2 + more,
			id: id,
		});
	});
	menuPos.sort(function(a, b){
		return a.position-b.position;
	});
}

function initClickAndScroll(){
	$('a[href^="#"]').click(function(){ 
	    var the_id = $(this).attr("href");
	    var target;
	    var more=0;
	    if(!$(the_id).hasClass('anim')){
	    	target = $(the_id).parent('.anim');
	    	more = $(the_id).position().top;
	    }else{
	    	target =  $(the_id);
	    }

	    var pos = $.data(target[0], 'position');
	    $('html, body').animate({  
	        scrollTop:pos.start.pos + $(window).height() / 2 + more + 2
	    }, 'slow');
	    return false;  
	});
}

function setPos(target, direction){
	var rv = null;
	var fixedPos = 0;

	switch(direction){
		case 'left':
			rv = {
				start:{
					pos: inc + fixedPos - $(window).width()/2 - 300,
					value: $(window).width(),
				},
				end:{
					pos: (inc + $(target).width()) + 300,
					value: -$(target).width(),
				}
			};
			addAttr(target, 'data-' + ( rv.start.pos-600 ), direction + ':' + rv.start.value + 'px;');
			addAttr(target, 'data-' + ( rv.end.pos+600 ), direction + ':' + rv.end.value + 'px;');

			addAttr(target, 'data-' + ( rv.start.pos+600 ), direction + ':' + (rv.start.value - 300) + 'px;');
			addAttr(target, 'data-' + (rv.end.pos-600), direction + ':' + (rv.end.value + 300) + 'px;');
		break;

		default:
			direction = 'top';
		case 'top':
			rv = {
				start:{
					pos: inc - fixedPos - $(window).height()/2 - 200,
					value: $(window).height(),
				},
				end:{
					pos: (inc + $(target).height()),
					value: -$(target).height()-10,
				}
			};
			addAttr(target, 'data-' + rv.start.pos, direction + ':' + rv.start.value + 'px;');
			addAttr(target, 'data-' + rv.end.pos, direction + ':' + rv.end.value + 'px;');
			break;
	}

	


	inc =  rv.end.pos;

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

$( document ).ready(function(){
	jQuery(".flux_images img").lazy({
		onFinishedAll: function() {
	        $('.spinner').hide();
	        $('#logo h1').show();
			$('#navigation').show();
			$('#conteneur').show();
		  	init();
		  	initClickAndScroll();
	    },
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

	$('.commander').css({
		height: $(window).height(),
	});
	// c.centerY("logo");
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
			$(this).css('z-index', 0);
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
		$(this).data('originalSize', {
			width: $(this).width(),
			height: $(this).height(),
		});
	});
	imgResize();
}

function imgResize(){
	$('.flux_images img').each(function(){
		var originalSize = $(this).data('originalSize');
		console.log($(this).attr('src'));
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

	var lastFindPos;
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
	    	if(findPos && lastFindPos !== findPos){
	    		$('a[href="#' + lastFindPos + '"]').css('text-decoration','none');
	    		$('a[href="#' + findPos + '"]').css('text-decoration','underline');
	    		lastFindPos = findPos;
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

	
	c.centerY("navigation");
	initAndResize();
};