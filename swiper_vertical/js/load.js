// JavaScript Document

$(document).ready(function(){
	
	$("nav").load("nav.html");
	$("#lan").load("lan.html");
	$("footer").load("footer.html");
	$(".mobile_nav").load("nav.html");
	$(".multilanguage").load("multilanguage.html");
	
	$(".menu").click(function(){ 
		$(".overlay").slideToggle();
	});
	
	// //change small and angle
	// $(".bbox").eq(0).addClass("ch_bg");
	// $(".bcon").eq(0).show();	
	
	// $(".bbox").click(function(){	
	// 	var _index = $(this).index();
	// 	$(this).addClass("ch_bg").siblings().removeClass("ch_bg");
	// 	$(".bcon").eq(_index).fadeIn(2000).siblings().fadeOut(2000);	
	// });	
	
	
	$(".blackbt").click(function(){	
		var _index = $(this).index();
		//$(this).addClass("ch_bg").siblings().removeClass("ch_bg");
		$(".yearblock").eq(_index).fadeIn(2000).siblings().fadeOut(2000);	
	});	
	
	$("#morede").click(function(){
		$("#moredecon").slideToggle(1000);
		$(".moredebox i:eq(0)").toggle(100);
		$(".moredebox i:eq(1)").toggle(100);
	});	
	
	$("#morech").click(function(){	
		$("#morechcon").slideToggle(1000);
		$(".morechbox i:eq(0)").toggle(100);
		$(".morechbox i:eq(1)").toggle(100);
	});	
	
	
	imgswp();
	bannerresize();
	mvresize();
	
	$(window).resize(function(){
		
	imgswp();
	bannerresize();
	mvresize();
	
	$(".overlay").hide();
	
	
	});
	
});

function bannerresize(){
	var fw = $(window).width();
	var fh = (fw/1920*654);
	$("#b_pic").height(fh);
	$("#b_pic img").height(fh);
};

function mvresize(){
	var mw = $("#main_v").width();
	var mh = $mw/1920*1100;
	$("#main_v").height(mh);
};

function imgswp(o){
	var iw = $(window).width();
	var oimg = iw*0.9*0.5;
	var imgw = oimg*0.9;
	var bw = imgw*0.12;
	var conw = imgw*0.8;
	var conh = conw/560*800;
	
	$(".imgswbox").width(imgw);
	$(".imgswbox").height(conh);
	
	$(".bg_img").width(conw);
	$(".bg_img").height(conh);
	
	$(".bg_img img").width(conw);
	$(".bg_img img").height(conh);
	
	$(".bbox").width(bw);
	$(".bbox").height(bw);
	
	$(".bbox img").width(bw);
	$(".bbox img").height(bw);
};