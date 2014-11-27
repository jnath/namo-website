var s;
var c;
var startPos;
var inc;

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
	        scrollTop:pos.start.pos + $(window).height() / 2 + more
	    }, 'slow');
	    return false;  
	});
}
var menuPos = [];
function setPos(target, direction){
	var rv = null;
	var fixedPos = 0;

	switch(direction){
		case 'left':
			rv = {
				start:{
					pos: inc + fixedPos - $(window).width()/2,
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
					pos: inc - fixedPos - $(window).height()/2 - 200,
					value: $(window).height(),
				},
				end:{
					pos: (inc + $(target).height()),
					value: -$(target).height()-10,
				}
			};
			break;
	}
	var attrStart = 'data-' + rv.start.pos;
	var attrEnd = 'data-' + rv.end.pos;
	addAttr(target, attrStart, direction + ':' + rv.start.value + 'px;');
	addAttr(target, attrEnd, direction + ':' + rv.end.value + 'px;');

	menuPos.push({
		position: {
			start: rv.start.pos,
			end: rv.end.pos,
		},
		id: $(target).data('menuId'),
	});

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
	$('#navigation').hide();
	$('#conteneur').hide();
	$('#flux_textes').imagesLoaded( function() {
		$('.spinner').hide();
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
			width += $(this).width() + parseInt($(this).css('padding-left'));
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

		if(fluxImages){
			rv = setPos(fluxImages, direction);
			$(fluxImages).attr('data-emit-events', '');
		}else{
			rv = setPos(this, direction);
			$(this).attr('data-emit-events', '');
			$(this).css({
				'z-index': 100000,
			});
		}	

		$.data(this, 'position', rv);

	});
}

function init() {

	$("html").niceScroll({
		// mousescrollstep: 5,
	});

	$('.flux_images img').css({
		'display':'block',
		'padding-left':'100px',
		float:'left',
	});

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

	
	
	

	// $('.anim').each(function(){
	// 	var id = $(this).attr('id');
	// 	if(id){
	// 		lastId = id; 
	// 	}

	// 	menuPos.push({
	// 		that: this,
	// 		id:lastId,
	// 	});
	// });

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
		// keyframe: function(element, name, direction) {
		// 	var that = element;
		// 	if($(element).hasClass('flux_images')){
		// 		that = $(element).parent('.anim');
		// 	}
		// 	var id = $(that).data('menuId');
		// 	var i = divsDisplay.indexOf(id);

		// 	if(id){
		// 		if( i === -1){
		// 			$('a[href="#' + id + '"]').css('color', '#cccccc');
		// 			divsDisplay.push(id);
		// 			scrollDisplay = id;
		// 		}

		// 		if( i !== -1){
		// 			$('a[href="#' + id + '"]').css('color', '#000000');
		// 			divsDisplay.splice(i,1);
		// 		}

		// 		if(id === scrollDisplay){
		// 			$('a[href="#' + id + '"]').css('color', '#cccccc');
		// 			if( divsDisplay.indexOf(id) === -1)divsDisplay.push(id);
		// 		}
		// 	}
	 //    },
	    beforerender:function(pos){
	    	var findPos;
	    	for(var a in menuPos){
	    		var animPos = menuPos[a];
	    		if(pos.direction === 'down' && pos.curTop < animPos.position.start){
	    			findPos = animPos.id;
	    			break;
	    		}else if(pos.direction === 'up' && pos.curTop > animPos.position.end){
	    			findPos = animPos.id;
	    		}
	    	}
	    	if(findPos && lastFindPos !== findPos){
	    		$('a[href="#' + lastFindPos + '"]').css('color', '#000000');
	    		$('a[href="#' + findPos + '"]').css('color', '#cccccc');
	    		lastFindPos = findPos;
	    	}
	    }
	});

	// init and resize
	function initAndResize(){
		$('.flux_images').each(function(){
			$(this).css('margin-top','-' + $(this).height() / 2 + 'px');
		});
	}

	function resize(){
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
		s.refresh();
		resize();
	});

	
	c.centerY("navigation");
	initAndResize();
};