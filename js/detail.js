"use strict";

$(function(){	
	var nav_open = false;
	var $nav = $(".next-nav");
	var $content = $('.next-content');
	var $footer = $('.next-footer');
	var $body = $('html,body');
	var $window = $(window);
	var scrolling = false;


	//center the featured image
	function center_image(){
		var $bg              = $(".featured-img"),
		    $projectImg      = $(".project-img"),
		    bgAspectRatio      = $bg.width() / $bg.height(),
		    proAspectRatio     = 1.5;

		    			    		
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

		function resizePro() {
			if ( ($window.width() / 3 / ($window.height() / 3)) < proAspectRatio ) {
			    $projectImg
			    	.removeClass('prowidth')
			    	.addClass('proheight');
			} else {
			    $projectImg
			    	.removeClass('proheight')
			    	.addClass('prowidth');
			}					
		}
		                   			
		$window.resize(function(){
			resizePro();
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
//detail.html



	(function(){
		let count = 0;
		let current = 0;
		let previous = 0;
		let $left_controller = $(".left-controller");
		let $right_controller = $(".right-controller");
		let $container = $(".next-project-featured");
		let $accordion = $(".accordion-wrapper");

		let images = [
			"http://www.deelay.me/3000/http://www.next-architecture.net/images/gallery/retail/brgr_downtown/_MG_0073.jpg",
			// "http://www.next-architecture.net/images/gallery/retail/brgr_downtown/_MG_0073.jpg",
			"http://www.next-architecture.net/images/gallery/retail/brgr_downtown/_MG_0120.jpg",
			"http://www.next-architecture.net/images/gallery/retail/brgr_downtown/_MG_0092.jpg",
			"http://www.next-architecture.net/images/gallery/retail/brgr_downtown/_MG_0068.jpg",
			"http://www.next-architecture.net/images/gallery/retail/brgr_downtown/_MG_0139.jpg",

		]
		let $images = [];

		images.forEach(function(img){
			let image = new Image();
			image.onload = function () {
			   count++;
				if(count == images.length){
			   		finish_loading();
			    }
			}
			image.onerror = function () {
			   console.error("Cannot load image");
			   count++;
			   	if(count == images.length){
			   		finish_loading();
			    }
			}
			image.src = img;
			let $image = $(image);
			$container.append($image);
			$image.addClass("featured-img");
			$images.push($image);

		})

		// var videos = ["img/sample-detail-video.mp4"]
		// var $videos = [];

		// videos.forEach(function(img){
		// 	let video = new Video();
		// 	image.onload = function () {
		// 	   count++;
		// 		if(count == videos.length){
		// 	   		finish_loading();
		// 	    }
		// 	}
		// 	video.onerror = function () {
		// 	   console.error("Cannot load video");
		// 	   count++;
		// 	   	if(count == videos.length){
		// 	   		finish_loading();
		// 	    }
		// 	}
		// 	video.src = video;
		// 	let $video = $(video);
		// 	$container.append($video);
		// 	$video.addClass("featured-img");
		// 	$videos.push($video);

		// })


		function finish_loading(){
			$(".next-info-footer").removeClass("next-hidden");
			$(".next-info-footer").addClass("animated fadeIn");
			center_image();
			$images[current].fadeIn(1000);
			// $videos[current].fadeIn(1000);
			change_num(current + 1);
			$('.home-icon').removeClass("next-tick");
			bind_controller();
			bind_info_click();
			bind_more_click();

		}

		function change_num(number){
			$(".flex-num ").html(number+"/"+images.length);
		}

		function bind_controller(){
			$left_controller.click(function(){
				previous = current;
				current = (current - 1 + images.length) % images.length;
				$images[current].fadeIn(500);
				$images[previous].fadeOut(500);
				
				change_num(current + 1);

			})
			$right_controller.click(function(){
				previous = current;
				current = (current + 1) % images.length;
				$images[current].fadeIn(500);
				$images[previous].fadeOut(500);
				
				change_num(current + 1);
			})
		}

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
			$(".flex-info").click(function(){
				start_accordion(function(){
					$(".info-wrapper").css("transform", "translateX(0)");
					$(".left-footer").html("Close");
				}, function(){
					$(".info-wrapper").css("transform", "translateX(-100%)");
					$(".left-footer").html("Info");	

				})

			});
		}
		


		function bind_more_click(){
			$(".flex-catlog").click(function(){
				start_accordion(function(){
					$(".img-controller").css("background", "rgba(255,255,255,0.5)");
					$(".catlog-wrapper").css("transform", "translateX(0)");
					$(".right-footer").html("Close");
				},function(){
					$(".img-controller").css("background", "rgba(255,255,255,0)");
					$(".catlog-wrapper").css("transform", "translateX(100%)");
					$(".right-footer").html("More Work");
				})

			})

		}

		$(".project-thumbnail").hover(function(){
			var print = $(this);
			// console.log(print);
			$(this).find(".grid-mask").css("opacity", "1");
			}, function(){
			$(this).find(".grid-mask").css("opacity", "0");
			});

	})()


}); 


