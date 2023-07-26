/* common */
let pcTrigger = true,
	moTrigger = true,
	windowW = $(window).innerWidth(),
	scrollTop = "",
	windowH	 = "";

$(function(){
	$(".accordion-list .item .arrow-down").on("click", function(){
		let $this = $(this);
		let $detail = $this.parent(".tit").siblings(".detail");

		if(!$detail.is(":visible")){
			$this.addClass("on");
			$this.parent(".tit").siblings(".detail").slideDown("500");
		} else{
			$this.removeClass("on");
			$this.parent(".tit").siblings(".detail").slideUp("500");
		}
	});

	$(window).resize(function(){
		windowW = $(this).innerWidth();
		headerFn(windowW);
	});

	$(window).scroll(function(){
		scrollTop = $(this).scrollTop();
		scrollMotion();
	});

	headerFn(windowW);
	pageLoadFn();
	roadMotionFn();
});

function headerFn(windowW){
	if(windowW > 980) {
		if(moTrigger){
			pcTrigger = true;
			moTrigger = false;

			// mo style remove
			$(".nav .sub-menu").css("display", "").stop().slideUp();
			$(".header").removeClass("on");
			$(".menu li").removeClass("on");

			// mo event unbind
			$(".header .util-btn .ico-menu a").unbind("click");
			$(".header .nav .menu h2").unbind("click");
			$(".header .nav .ico-close").unbind("click");

			// pc event bind
			$(".header .nav").mouseover(function(){
				$(this).addClass("on");
			});
			
			$(".header .nav").mouseleave(function(){
				$(this).removeClass("on");
			});
		}
	} else {
		if(pcTrigger){
			pcTrigger = false;
			moTrigger = true;

			// pc event unbind
			$(".header .nav").unbind("mouseover mouseleave");

			// mo event bind
			$(".header .util-btn .ico-menu a").on("click", function(){
				let $header = $(this).parents(".header");

				if(!$header.hasClass("on")){
					$header.addClass("on");
					$("body").css({"overflow": "hidden"});
				} else{
					$header.removeClass("on");
					$("body").css({"overflow": "auto"});
				}
				
			});

			$(".header .nav .menu h2").on("click", function(){
				let $li = $(this).parent("li");
				let $subMenu = $(this).siblings(".sub-menu");

				if(!$li.hasClass("on")){
					$li.addClass("on").siblings().removeClass("on");
					$(".menu .sub-menu").stop().slideUp();
					$subMenu.stop().slideDown();
				} else{
					$li.removeClass("on");
					$subMenu.stop().slideUp();
				}
			});

			$(".header .nav .ico-close").on("click", function(){
				let $header = $(this).parents(".header");
				$header.removeClass("on");
				$(".menu .sub-menu").stop().slideUp();
				$(".menu li").removeClass("on");
			});
		}
	}
}

function pageLoadFn(){
	$(".wrap").stop().fadeIn(300);
}

function pageEventFn(url){
	$(".wrap").stop().fadeOut(300, function(){
		location.href = url;
	});
}

function roadMotionFn(){
	$(".motion").each(function(){
		$(this).addClass("onTrans");
	});
}

function scrollMotion(){
	scrollTop = $(window).scrollTop();
	// windowH = window.innerHeight;
	windowH = window.innerHeight * 3/4;
	let objY, objH = 0;

	$(".motion").each(function(){
		objY = $(this).offset().top;
		objH = $(this).outerHeight();

		if(scrollTop > objY - windowH) {
			$(this).addClass("onTrans");

			if(scrollTop > objY + objH) {
				$(this).removeClass("onTrans");
			}
		}

		else {
			$(this).removeClass("onTrans");
		}
	});
}