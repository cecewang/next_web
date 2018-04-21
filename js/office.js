"use strict";

$(function(){	
	var nav_open = false;
	var $nav = $(".next-nav");
	var $content = $('.next-office-content');
	var $footer = $('.next-footer');
	var $body = $('html,body');
	var $window = $(window);
	var scrolling = false;
	var nav_height = 65;


	//scroll to project grids
	function start_slow_scroll(){
		
		if (window.addEventListener) window.addEventListener('DOMMouseScroll', slow_scroll_in, false);
		window.onmousewheel = document.onmousewheel = slow_scroll_in.bind(undefined, false);

		$(window).scroll(function(e){
			$(".next-office-featured").css("opacity", Math.max((1 - ($(window).scrollTop()/($(window).height()-nav_height))), 0))
		});
	}
	start_slow_scroll();

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
		var $bg              = $(".featured-img"),
		    bgAspectRatio      = $bg.width() / $bg.height();

		    			    		
		function resizeBg() {
			if ( ($window.width() / $window.height()) < bgAspectRatio ) {
			    $bg
			    	.removeClass('bgwidth')
			    	.addClass('bgheight');
			} else {
			    $bg
			    	.removeClass('bgheight')
			    	.addClass('bgwidth');
			}					
		}
		                   			
		$window.resize(function(){
			resizeBg();
		}).trigger("resize");
	}

	center_image();


	//show the menu
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
		$(".home-icon").attr("src", "img/logoShape.svg");
			$icon.hover(function(){
				$(".home-icon").attr("src", "img/menuShape.svg");
				}, function(){
				$(".home-icon").attr("src", "img/logoShape.svg");
			});	

		function open_nav(){
			nav_open = true;				
			$(".next-nav").css("width","100vw");
			$nav_content.css("background-color", "black");
			$nav_content.css("color","white");
			setTimeout(function(){
				$(".next-subnav-wrapper").css("display", "flex");
			},1000);
			$icon.unbind('mouseenter mouseleave');	
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
				$(".home-icon").attr("src", "img/logoShape.svg");
				$icon.hover(function(){
					$(".home-icon").attr("src", "img/menuShape.svg");
					}, function(){
					$(".home-icon").attr("src", "img/logoShape.svg");
					});
			}
		}

		$(".next-home-icon").click(function(){
			if(!nav_open){
				open_nav();
			}else{
				close_nav();
			}
		})

		// $(".click-close").click(function(){
		// 	close_nav();
		// })
	})();


	$(".next-subnav-group li").click(function(){
		$(".selected").removeClass("selected");
    	$(this).addClass("selected");
	});

	$(".next-stuff-item").hover(function(){
		$(this).find(".grid-mask").css("opacity", "1");
		}, function(){
		$(this).find(".grid-mask").css("opacity", "0");
		});



	let $accordion = $(".accordion-wrapper");

	function start_accordion(open, close, duration=500){
		$accordion.css("display",'block')
		setTimeout(function(){
			open();
			$accordion.click(function(e){
				if (!$.contains(e.currentTarget, e.target)){
					close();
					setTimeout(function(){
						$accordion.unbind("click");
						$accordion.css("display","none");	
					}, duration)
				}
			})
		})
	}

	function bind_info_click(){
		$(".grid-mask").click(function(){
			console.log("clicked");
			start_accordion(function(){
				$(".stuff-wrapper").css("transform", "translateX(0)");
				// $(".left-footer").html("Close");
			}, function(){
				$(".stuff-wrapper").css("transform", "translateX(-100%)");
				// $(".left-footer").html("Info");	

			})

		});
	}

	bind_info_click();

});