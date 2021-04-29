$.fn.junSlider = function( opt ){
	$(this).each(function(){

		var autoSlide;
		var option = $.extend( true, { type:'slide', height:300, dot:true, pointer:true, speed:400, autoSlide:false }, opt );
		var t = $(this);
		var l = $( "li", $(this) );
		var idx = 0;



		t.wrap( "<div class='slider-wrap "+option.type+" "+t.attr('data-class')+"'></div>" ); // add wrap
		var p = t.parents('.slider-wrap');

		$(window).resize(function(){ // resize check
			var w = p.width();
			var h = option.height < 10 ? w*option.height : option.height;
			t.css({ 'width' : option.type == 'slide' ? w*l.length : w });
			l.css({ 'width' : w });
			p.css({ 'height' : h });
		}).resize();



		if( option.dot == true ){ // dot add
			var d = $( "<div class='dot-wrap'></div>" );
			for( i=0; i<l.length; i++ ){ d.append( "<div class='dot'></div>" ); }
			p.append(d);
		}

		$( '.dot', p ).click(function(){  // dot click
			idx = $(this).index();
			slide( p, idx, option.type, option.speed );
		})
		


		if( option.pointer == true ){ // pointer add
			var a = $( "<div class='pointer left'><i class='fa fa-angle-left'></i></div><div class='pointer right'><i class='fa fa-angle-right'></i></div>" );
			p.append(a);
		}

		$( '.pointer', p ).click(function(){  // pointer click
			if( $(this).hasClass('left') ){
				if( idx == 0 ) idx = l.length-1;
				else idx--;
			}else{
				if( idx == l.length-1 ) idx = 0;
				else idx++;
			}
			slide( p, idx, option.type, option.speed );
		})
		


		if( option.autoSlide ){
			var autoSlide = setInterval(function(){
				if( idx == l.length-1 ) idx = 0;
				else idx++;
				slide( p, idx, option.type, option.speed );
			}, option.autoSlide);
		}

		$( '.dot', p ).click(function(){ clearInterval(autoSlide); })
		$( '.pointer', p ).click(function(){ clearInterval(autoSlide); })

		
		
		slide( p, idx, option.type, 0 );

	});
};


function slide( p, idx, type, speed ){
	$( '.dot', p ).removeClass('on');
	$( '.dot', p ).eq(idx).addClass('on');

	if( type == 'slide' ){
		$( "ul", p ).stop().animate({ 'margin-left' : p.width()*(-1)*idx }, speed)
	}else if( type == 'fade' ){
		$( "li", p ).stop().animate({ 'opacity' : 0 }, speed);
		$( "li", p ).eq(idx).stop().animate({ 'opacity' : 1 }, speed);
	}
}

