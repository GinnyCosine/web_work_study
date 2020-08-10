// JavaScript Document

$(document).ready(function(){
	
	/* initialize */
	let url = new URL(location.href);
	let params = url.searchParams;
	let id_ = params.get('id');
	let class_ = params.get('class');

	initializeJSON(id_, class_);
	swiper();
	$("#pc_menu nav").load("nav.html");
	$("#lan").load("lan.html");
	$("#mb_lan").load("lan.html");
	$("footer").load("footer.html");
	$("#mobile_menu nav").load("mobile_nav.html");
	$(".multilanguage").load("multilanguage.html");
	
	/* mobile menu */
	$("#menubtn").click(function(){
		$("#mobile_menu").animate({width:'show',opacity:'show'},400);
		$("#cover").fadeIn(370);
		$("body").addClass("no-scroll");
	});

	$("#mobile_menu").on('click','.layer1',function(){
		var _index = $(this).index();
		$("#mobile_menu .layer1 ul").eq(_index).slideToggle();
		$(this).siblings().children(".layer2").slideUp();
		$("#mobile_menu .layer1 .add .add_line:nth-child(2)").eq(_index).animate({height:'toggle'});
		$(this).siblings().children("a").children(".add").children(".add_line:nth-child(2)").animate({height:'show'});
		// $("#mb_lan .search_input").animate({height:'hide',opacity:'hide'},230);
	});
	
	$("body").on('click','#lan #search',function(){
		$("#lan .search_input").animate({width:'toggle',opacity:'toggle'},400);
	});

	$("body").on('click','#mb_lan #search',function(){
		$("#mb_lan .search_input").animate({height:'toggle',opacity:'toggle'},230);
	});
	
	$("#cover").click(function(){
		closeMobileMenu();
	});

	$('#mobile_menu .cross').click(function(){
		closeMobileMenu();
	});

	$(".blackbt").click(function(){	
		var _index = $(this).index();
		$(this).addClass("ch_bg").siblings().removeClass("ch_bg");
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
	
	
	bannerresize();
	mvresize();
	imgswp();
	
	$(window).resize(function(){
	
		bannerresize();
		mvresize();
		$(".overlay").hide();	
		
		imgswp();
		closeMobileMenu();
	});
	
});

function initializeJSON(id_, class_){
	$.ajaxSettings.async = false;
	class_list = ['shen', 'dan', 'jing', 'chou', 'tsa'];
	let morelist_cl = '';
	class_list.forEach(element => {
		if (class_ == element) {
			$.getJSON('js/json/'+ class_ +'.json', function(data){
				$('#morede h2').empty();
				$('#morede h2').append('更多' + data.class.zh + '角');
		
				let character_;
				let cnt = 0;
				let morelist_ch = '';
				data.characters.forEach(character => {
					if (character.id == id_) {
						character_ = character;
					}
					else if (cnt < 6){
						morelist_ch += '<div class="col-2"><div class="shbox">';
						morelist_ch += '<div class="imgbox"><img src="images/'+ class_ + '/'+ character.id +'_01.jpg"></div>';
						morelist_ch += '<div class="shmorebt"><h4>More</h4></div></div></div>';
						cnt++;
					}
				});
				$('#moredecon .imglist').empty();
				$('#moredecon .imglist').append(morelist_ch);
		
				$('#header').empty();
				let header = '<h1>珍藏∕<a href="list.html">戲偶(按角色分)</a>∕';
				header += '<a href="' + data.class.en + '.html">'+ data.class.zh + '</a>∕';
				header +='<a href="character.html?id='+ id_ + '&class=' + class_ + '">' + character_.name + '</a></h1>';
				$('#header').append(header);
		
				$('#intro').empty();
				let intro = '<h1>' + character_.name + '</h1>';
				intro += '<p>' + character_.intro + '</p>';
				$('#intro').append(intro);
		
				let bg_img = '';
				let sm_img = '';
				$('.swiper-wrapper').empty();
				for (i = 1; i <= character_.image; i++) {
					bg_img += '<div class="bcon swiper-slide"><img src="images/' + data.class.en + '/' + character_.id + '_0' + i + '.jpg"></div>';
					sm_img += '<div class="bbox swiper-slide"><img src="images/' + data.class.en + '/' + character_.id + '_0' + i + '.jpg"></div>';
				}
				$('.swiper-wrapper').eq(0).append(bg_img);
				$('.swiper-wrapper').eq(1).append(sm_img);
			});
		}
		else {
			$.getJSON('js/json/'+ element +'.json', function(data){
				morelist_cl += '<div class="col-2"><div class="shbox">';
				morelist_cl += '<div class="imgbox"><img src="images/'+ element + '/'+ data.characters[0].id +'_01.jpg"></div>'
				morelist_cl += '<div class="shmorebt"><h4>More</h4></div></div></div>';
				$('#morechcon .imglist').empty();
				$('#morechcon .imglist').append(morelist_cl);
			});
		}
	});
}

function swiper(){
    galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 7,
        slidesPerView: 6,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                direction: 'vertical',
                slidesPerView: 10
            }
        }
    });

    galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        speed: 300,
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });
}

function bannerresize(){
	var fw = $(window).width();
	var fh = (fw/1920*654);
	$("#b_pic").height(fh);
	$("#b_pic img").height(fh);
};

function mvresize(){
	var mw = $("#main_v").width();
	var mh = mw/1920*1100;
	$("#main_v").height(mh);
};

function imgswp(){
	var iw = $(window).width();
	var oimg = (iw > 1200)?iw*0.9*0.5:iw;
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

function closeMobileMenu(){
	$("#mobile_menu").animate({width:'hide',opacity:'hide'},400);
	$(".add_line").animate({height:'show'});
	$("#mobile_menu .layer1 ul").slideUp();
	$("#cover").fadeOut(370);
	$("body").removeClass("no-scroll");
}