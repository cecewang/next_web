"use strict";

$(function(){	
	var nav_open = false;
	var $nav = $(".next-nav");
	var $body = $('html,body');
	var $window = $(window);


	//center the featured image
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


	//show the menu
	(function(){
		let $nav = $(".next-nav");
		let $currentOut = undefined;
		let $wrapper = $(".next-subnav-wrapper");
		$(".next-nav-item").mouseenter(function(){
			$(".next-subnav-group").css("height","0px");
			$currentOut = $("."+$(this).attr("data"));
			$currentOut.css("height", $currentOut.get(0).scrollHeight+"px");
			$nav.css("height", $wrapper.height()+"px");
		})
		$nav.mouseout(function(e){
			if(!$.contains(e.currentTarget, e.relatedTarget))
				$nav.css("height", "65px");
		})
	})();


	(function(){
		var $icon = $(".next-home-icon");
		var $nav_content = $(".next-nav-content");

		$icon.hover(function(){
			$(".home-icon").attr("src", "img/menuShape.svg");
			}, function(){
			$(".home-icon").attr("src", "img/logoShape.svg");
			});

		function open_nav(){
			$(".next-nav").css("width","100vw");
			$nav_content.css("background-color", "black");
			$nav_content.css("color","white");
			setTimeout(function(){
				$(".next-subnav-wrapper").css("display", "flex");
			},1000);
			$icon.unbind('mouseenter mouseleave');	
			nav_open = true;				
		}

		function close_nav(){
			$(".next-nav").css("width","65px");
			$nav_content.css("background-color", "#57A2D4");
			$icon.hover(function(){
				$(".home-icon").attr("src", "img/menuShape.svg");
				}, function(){
				$(".home-icon").attr("src", "img/logoShape.svg");
				});
			nav_open = false;			
		}

		$(".next-nav-content").click(function(){
			if(!nav_open){
				open_nav();
			}else{
				close_nav();
			}
		});

		// $(".click-close").click(function(){
		// 	close_nav();
		// })
	})()


//detail.html

	$(".flex-info").click(function(){
		if($(this).html() == "Info"){
			$(".info-wrapper").css("transform", "translateX(0)");
			$(this).html("Close");
		}else{
			$(".info-wrapper").css("transform", "translateX(-100%)");
			$(this).html("Info");	
		}

	});

}); 


