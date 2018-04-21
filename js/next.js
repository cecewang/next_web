"use strict";

$(function(){	
	var nav_open = false;
	var $nav = $(".next-nav");
	var $content = $('.next-content');
	var $footer = $('.next-footer');
	var $body = $('html,body');
	var $window = $(window);
	var scrolling = false;
	var nav_height = 65;


	//adjust featured mask as window resizes
	var adjust_square = function(){
		let adjust = Math.round(Math.max(200, ($window.width()/721)*192) / 2) * 2 ;
		let h_adjust = ($window.height()-adjust)*0.5;
		let w_adjust = ($window.width()-adjust)*0.5;
		$(".next-mask-logo").width(adjust);
		$(".next-mask-logo").height(adjust);
		$(".next-mask-top").height(h_adjust);
		$(".next-mask-bottom").height(h_adjust);
		$(".next-mask-right").css({"width":w_adjust+"px", "top":h_adjust+"px", "height":adjust+"px"});
		$(".next-mask-left").css({"width":w_adjust+"px", "top":h_adjust+"px", "height":adjust+"px"});		
	}		

	if(window.location.hash.substring(1) === "next-content"){
		$(".next-mask").addClass("next-hidden");
		$(".next-menu").css("z-index", "100");
		$nav.removeClass("next-hidden");
		$nav.addClass("animated fadeIn");
		$footer.removeClass("next-hidden");
		setup_grid();
		$("html, body").scrollTop($('.next-content').offset().top);
		start_slow_scroll();
	} else{
		//click to fade
		$content.addClass("next-hidden");
		$window.bind("resize", adjust_square).trigger("resize");

		$(".next-mask").click(function(e){
			$window.unbind("resize", adjust_square).trigger("resize");
			$(".click-fade").addClass("animated fadeOut");
			$(this).unbind("click");
			$(".next-menu").css("z-index", "100");
			$nav.removeClass("next-hidden");
			$nav.addClass("animated fadeIn");
			$content.removeClass("next-hidden");
			$footer.removeClass("next-hidden");
			start_slow_scroll();
			setup_grid();
			$(this).css("cursor", "default");
		})		
	}



	//scroll to project grids
	function start_slow_scroll(){
		
		if (window.addEventListener) window.addEventListener('DOMMouseScroll', slow_scroll_in, false);
		window.onmousewheel = document.onmousewheel = slow_scroll_in.bind(undefined, false);

		$(window).scroll(function(e){
			$(".next-featured").css("opacity", Math.max((1 - ($(window).scrollTop()/($(window).height()-nav_height))), 0))
		});
	}

	function slow_scroll_in(direct=false, e) {
	    var delta = 0;
	    if(event){
		    if (event.wheelDelta) delta = event.wheelDelta;
		    else if (event.detail) delta = -event.detail;	    	
	    }
	    let target = nav_open ? $(window).height() - nav_height : $(window).height();
	    if ((delta < 0 || direct) && $window.scrollTop() < target){
	    	if(!scrolling){
	    		slow_handle(target);
	    	}
    		if (event.preventDefault) event.preventDefault();
	    	event.returnValue = false;
	    }else{
	    	if(scrolling){
				$body.stop();
				scrolling = false;
	    	}
	    }
	
	}

	function slow_handle(target) {
	    scrolling = true;
	    var time = 1000 * (target-$window.scrollTop())/target;
	    $body.stop().animate({
	        scrollTop: target
	    }, time, "easeInOutCubic", function(){
	    	scrolling = false;
	    });
	}	


	//center the featured image
	function center_image(){
		var theWindow        = $(window),
		    $bg              = $(".featured-img"),
		    aspectRatio      = $bg.width() / $bg.height();
		    			    		
		function resizeBg() {
			if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
			    $bg
			    	.removeClass('bgwidth')
			    	.addClass('bgheight');
			} else {
			    $bg
			    	.removeClass('bgheight')
			    	.addClass('bgwidth');
			}					
		}
		                   			
		theWindow.resize(resizeBg).trigger("resize");		
	}

	center_image();


	//show nav
	(function(){
		let $nav = $(".next-nav");
		let $currentOut = undefined;
		let $wrapper = $(".next-subnav-wrapper");
		var mouseOnsub = false;
		$(".next-nav-item").mouseenter(function(){
			$(".next-subnav-group").css("height","0px");
			$currentOut = $("."+$(this).attr("data"));
			$currentOut.css("height", $currentOut.get(0).scrollHeight+"px");
			$nav.css("height", $wrapper.height()+"px");
		})
		$(".next-nav-item").mouseout(function(e){
			if($(e.relatedTarget).hasClass("next-nav-title")){
				$nav.css("height","65px");
			}
		});
		$(".next-subnav-group").mouseout(function(e){
			console.log(e);
			if(!$(e.relatedTarget).hasClass("next-nav-item") && !$.contains(e.target, e.relatedTarget) && !$(e.relatedTarget).hasClass("next-subnav-group")){
				$nav.css("height","65px");
			}
		});
	
	})();

	//navicon
	(function(){
		var $icon = $(".next-home-icon");
		var $nav_content = $(".next-nav-content");
		var bind = false;
		$(".home-icon").attr("src", "img/menuShape.svg");
		$window.scroll(function(e){
			check_icon_status();
		})

		function check_icon_status(){
			if($window.scrollTop() >= $window.height() - nav_height){
				if(!bind && !nav_open){
					bind = true;
					$(".home-icon").attr("src", "img/logoShape.svg");
					$icon.hover(function(){
						$(".home-icon").attr("src", "img/menuShape.svg");
						}, function(){
						$(".home-icon").attr("src", "img/logoShape.svg");
						});						
				}
			}else {
				if(bind && !nav_open){
					bind = false;
					$(".home-icon").attr("src", "img/menuShape.svg");
					$icon.unbind('mouseenter mouseleave');	
				}

			}
		}


		function open_nav(){
			nav_open = true;				
			$(".next-nav").css("width","100vw");
			$nav_content.css("background-color", "black");
			$nav_content.css("color","white");
			setTimeout(function(){
				$(".next-subnav-wrapper").css("display", "flex");
			},1000);
			if(bind){
				bind = false;
				$icon.unbind('mouseenter mouseleave');	
			}
		}

		function close_nav(){
			nav_open = false;					
			$nav = $(".next-nav");
			if($nav.height() != 65){
				$(".next-nav").css("height","65px");
				setTimeout(do_rest, 800);
			}else{
				do_rest();
			};
			function do_rest(){
				$(".next-nav").css("width","65px")
				$nav_content.css("background-color", "#57A2D4");
				check_icon_status();
				// $(".home-icon").attr("src", "img/logoShape.svg");
				// $icon.hover(function(){
				// 	$(".home-icon").attr("src", "img/menuShape.svg");
				// 	}, function(){
				// 	$(".home-icon").attr("src", "img/logoShape.svg");
				// 	});
			}
		}


		$(".next-home-icon").click(function(){
			if(!nav_open){
				open_nav();
			}else{
				close_nav();
			}
		})

		$(".nav-item-1").click(function(){
			close_nav();
			slow_scroll_in(true,undefined);
		})

		// $(".click-close").click(function(){
		// 	close_nav();
		// })
	})()

	$(".next-subnav-group li").click(function(){
		$(".selected").removeClass("selected");
    	$(this).addClass("selected");
	});


	function setup_grid(){
		let $grid = $('.next-grid');
		$grid.isotope({
		  // options
		  itemSelector: '.next-grid-item',
		  layoutMode: 'fitRows',
		  percentPosition: true,
		  hiddenStyle: {
		    opacity: 0
		  },
		  visibleStyle: {
		    opacity: 1
		  }
		});
		$(".next-filter").click(function(){
			let filter = "."+$(this).attr("data");
	
			$grid.isotope({
				filter: filter == ".type-all" ? "*" : filter
			})				
			slow_scroll_in(true,undefined);
			$nav.css("height","65px");
		})

	}

	$(".portrait-img").hover(function(){
		$(this).find(".grid-mask").css("opacity", "1");
		}, function(){
		$(this).find(".grid-mask").css("opacity", "0");
		});

	$(".landscape-img").hover(function(){
		$(this).find(".grid-mask").css("opacity", "1");
		}, function(){
		$(this).find(".grid-mask").css("opacity", "0");
		});


}); 


