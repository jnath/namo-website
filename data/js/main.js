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
			position:  ( pos.start.pos + more ) + $(window).height() - 2,
			id: id,
		});
	});
	menuPos.sort(function(a, b){
		return a.position-b.position;
	});
}

function clickMenu(the_id){
	var target = $(the_id);
    var more=0;
    if(!$(the_id).hasClass('anim')){
    	target = $(the_id).parent('.anim');
    	more = $(the_id).position().top * 1.2;
    }

    var pos = $.data(target[0], 'position');
    $('html, body').animate({  
        scrollTop: ( pos.start.pos + more ) + $(window).height() ,
    }, 'slow');
}

function initClickAndScroll(){
	$('a[href^="#"]').click(function(){ 
	    var the_id = $(this).attr("href");
	   	clickMenu(the_id);
	    return false;  
	});
}

var imgsSpace = 0;
var lastTextSpace = 0;
function setPos(target, direction){
	var rv = null;
	
	switch(direction){
		case 'left':
			rv = {
				start:{
					pos: inc - $(window).width() - lastTextSpace,
					value: $(window).width(),
				},
				end:{
					pos: inc + $(target).width(),
					value: -$(target).width(),
				}
			};
			lastTextSpace = 0;
			addAttr(target, 'data-' + ( rv.start.pos ), direction + ':' + rv.start.value + 'px;');
			addAttr(target, 'data-' + ( rv.end.pos ), direction + ':' + rv.end.value + 'px;');
			imgsSpace = $(target).find('img:last').width();
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

	// $('.commander').css({
	// 	height: $(window).height()/2,
	// });
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

		var mainCanvas = document.createElement("canvas");
        mainCanvas.width = size.width;
        mainCanvas.height = size.height;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(this, 0, 0, mainCanvas.width, mainCanvas.height);
        $(this).attr('src', mainCanvas.toDataURL("image/jpeg"));
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
	    		//$('a[href="#' + lastFindPos + '"]').css('text-decoration','none');
	    		//$('a[href="#' + findPos + '"]').css('text-decoration','line-through');

	    		$('a[href="#' + lastFindPos + '"]').css('font-style','normal');
	    		$('a[href="#' + findPos + '"]').css('font-style','italic');
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