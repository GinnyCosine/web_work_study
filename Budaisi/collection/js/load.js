// JavaScript Document

$(document).ready(function(){
	
	/* initialize */
	initialize();
	swiper();
	$("#pc_menu nav").load("nav.html");
	$("#lan").load("lan.html");
	$("#mb_lan").load("lan.html");
	$("footer").load("footer.html");
	$("#mobile_menu nav").load("mobile_nav.html");
	$(".multilanguage").load("multilanguage.html");
	bannerresize();
	mvresize();
	imgswp();
	
	
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
		$(this).siblings().children("a").children(".title").children(".add").children(".add_line:nth-child(2)").animate({height:'show'});
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
	
	let vw = $(window).width()

	$(window).resize(function(){
		let vw_change = $(window).width()
	
		bannerresize();
		mvresize();
		$(".overlay").hide();	
		
		imgswp();
		closeMobileMenu();

		if (vw_change != vw) {
			viewer_height();
			vw = vw_change;
		}
	});

	viewer_height();
	setPageNum();

	$('#bb-custom-grid span').click(function(){
		setPageNum();
	});

	$('.prev-next a').click(function(){
		setPageNum();
	});

});

function viewer_height(){
	var ch = $('.bb-current').index() + 1;
	var h = $('div.bb-item:nth-child('+ ch +') img').height();
	while (h == 0) {
		h = $('div.bb-item:nth-child('+ ch +') img').height();
	}
	$('.bb-bookblock').css('height', h + 'px');
	$('div.bb-custom-grid article').css('height', (h+32) + 'px');
	$('div.prev-next').css('height', (h+32) + 'px');
	$('div.prev-next i').css('transform', 'translate(0, '+((h+32)/2)+'px)')
	$('div.prev-next i').css('-ms-transform', 'translate(0, '+((h+32)/2)+'px)')
	$('div.prev-next i').css('-webkit-transform', 'translate(0, '+((h+32)/2)+'px)')
}

function setPageNum(){
	var page = $('.bb-current').index() + 1;
	$('#pagenum').empty();
    $('#pagenum').append('第 '+ (page) +' 版');
}

function initialize(){
	let url = new URL(location.href);
	let params = url.searchParams;
	let id_ = params.get('id');
	let class_ = params.get('class');
	let type_ = params.get('type');
	$("title").empty();
	if (url.pathname.includes('intro.html')) {
		initializeIntro(id_, class_, type_);
	}
	else if (url.pathname.includes('class.html')) {
		initializeClass(class_, type_);
	}
	else if (url.pathname.includes('overview.html')) {
		initializeOverview(type_);
	}
}

function initializeOverview(type_){
	let project = '';
	$.ajaxSettings.async = false;
    $.getJSON('js/' + type_ + '/' + type_ +'.json', function(data){
		let title = '珍藏∕<a href="collection_overview.html?type='+ type_ + '">' + data.title + '</a>'
		$("title").append(data.title);
		$('article h1').empty();
		$('article h1').append(title);
		if (data.has_class == 1) {
			data.class_list.forEach(element => {
				let class_en = element.class.en;
				let class_zh = element.class.zh;
				let item = data.items_list[element.index].items[0];
				project += '<a href="collection_class.html?type='+ type_ +'&class='+ class_en +'">';
				project += '<div class="col-m-6 col-4">'
				project += '<div class="shbox">'
				project += '<div class="imgbox">'
				project += '<img src="images/'+ type_ +'/'+ class_en + '/' + item.id + '/' + item.id + '_01.jpg">';
				project += '</div>'
				project += '<div class="sh_tx">'
				project += '<h3>'+ class_zh +'</h3>'
				project += '<p></p>'
				project += '</div>'
				project += '<div class="shmorebt"><h4>More</h4></div>'
				project += '</div>'
				project += '</div>'
				project += '</a>'			
			});
		}
		else {
			data.items.forEach(item => {
				project += '<a href="collection_intro.html?type='+ type_ +'&id='+ item.id +'">';
				project += '<div class="col-m-6 col-4">'
				project += '<div class="shbox">'
				project += '<div class="imgbox">'
				project += '<img src="images/' + type_ + '/' + item.id + '/' + item.id + '_01.jpg">';
				project += '</div>'
				project += '<div class="sh_tx">'
				project += '<h3>'+ item.name +'</h3>'
				project += '<p></p>'
				project += '</div>'
				project += '<div class="shmorebt"><h4>More</h4></div>'
				project += '</div>'
				project += '</div>'
				project += '</a>'
			});
		}
	});
	$('#project').empty();
	$('#project').append(project);
}

function initializeClass(class_, type_){
	$.ajaxSettings.async = false;
    $.getJSON('js/' + type_ + '/' + type_ +'.json', function(data){
		let items;
		let classZh;
		data.class_list.forEach(element => {
			if (class_ == element.class.en) {
				items = data.items_list[element.index].items;
				classZh = element.class.zh;
			}
		});
		let ch = '';
		items.forEach(item => {
			var filespec = 'images/' + type_ + '/' + class_ + '/' + item.id + '/' + item.id + '_01.jpg';
			let status;
			$("#confirm").load(filespec, function(responseTxt, statusTxt, xhr){
				status = statusTxt;
			});

			if (status == "error") {
				return;
			}
			ch += '<a href="collection_intro.html?type='+ type_ +'&class=' + class_ + '&id=' + item.id + '">';
			ch += '<div class="col-m-6 col-3"><div class="shbox"><div class="imgbox">';
			ch += '<img src="'+ filespec +'"></div><div class="sh_tx">';
			ch += '<h3>' + item.name + '</h3><p></p></div><div class="shmorebt"><h4>More</h4></div></div></div></a>';
		});
		$('#list').empty();
		$('#list').append(ch);

		$('#header').empty();
		let header = '<h1>珍藏∕<a href="collection_overview.html?type='+ type_ +'">' + data.title +'</a>∕';
		header += '<a href="collection_class.html?type='+ type_ +'&class=' + class_ + '">'+ classZh + '</a></h1>';
		$("title").append(classZh);
		$('#header').append(header);
	});
}

function initializeIntro(id_, class_, type_){
	if (class_ == null)
		introNoClass(id_, type_);
	else
		introWithClass(id_, class_, type_);
}

function introNoClass(id_, type_){
	$.ajaxSettings.async = false;
	$.getJSON('js/' + type_ + '/' + type_ + '.json', function(data){
		$('#morede').hide();
		$('#morech h2').empty();
		$('#morech h2').append('更多' + data.title);
	
		let item_;
		let cnt = 0;
		let morelist_ch = '';
		data.items.forEach(item => {
			if (item.id == id_) {
				item_ = item;
			}
			else if (cnt < 6){
				morelist_ch += '<div class="col-2"><div class="shbox">';
				morelist_ch += '<div class="imgbox"><img src="images/'+type_+'/'+ item.id +'/'+ item.id +'_01.jpg"></div>';
				morelist_ch += '<div class="shmorebt"><h4>More</h4></div></div></div>';
				cnt++;
			}
		});
		$('#moredecon .imglist').empty();
		$('#moredecon .imglist').append(morelist_ch);

		$("title").append(item_.name);
	
		$('#header').empty();
		let header = '<h1>珍藏∕<a href="collection_overview.html?type='+ type_ +'">' + data.title + '</a>∕';
		header += '<a href="collection_intro.html?type='+ type_ + '&id=' + id_ + '">' + item_.name + '</a></h1>';
		$('#header').append(header);

		$('#intro').empty();
		let intro = '<h1>' + item_.name + '</h1>';
		intro += '<p>' + item_.intro + '</p>';
		$('#intro').append(intro);

		let bg_img = '';
		let sm_img = '';
		$('.swiper-wrapper').empty();
		for (i = 1; i <= item_.image; i++) {
			bg_img += '<div class="bcon swiper-slide"><img src="images/' + type_ + '/' + id_ + '/' + id_ + '_0' + i + '.jpg"></div>';
			sm_img += '<div class="bbox swiper-slide"><img src="images/' + type_ + '/' + id_ + '/' + id_ + '_0' + i + '.jpg"></div>';
		}
		$('.swiper-wrapper').eq(0).append(bg_img);
		$('.swiper-wrapper').eq(1).append(sm_img);
	});
}

function introWithClass(id_, class_, type_){
	let morelist_cl = '';
	$.ajaxSettings.async = false;
	$.getJSON('js/' + type_ + '/' + type_ + '.json', function(data){			
		data.class_list.forEach(element => {
			if (class_ == element.class.en) {
				let classZh = element.class.zh;
				$('#morede h2').empty();
				$('#morede h2').append('更多' + classZh + data.more);
				$('#morech h2').empty();
				$('#morech h2').append('更多' + data.title);
				let items = data.items_list[element.index].items;
				let item_;
				let cnt = 0;
				let morelist_ch = '';
				items.forEach(item => {
					if (item.id == id_) {
						item_ = item;
					}
					else if (cnt < 6){
						morelist_ch += '<div class="col-2"><div class="shbox">';
						morelist_ch += '<div class="imgbox"><img src="images/'+type_+'/'+ class_ + '/'+ item.id +'/'+ item.id +'_01.jpg"></div>';
						morelist_ch += '<div class="shmorebt"><h4>More</h4></div></div></div>';
						cnt++;
					}
				});
				$('#moredecon .imglist').empty();
				$('#moredecon .imglist').append(morelist_ch);

				$("title").append(item_.name);
		
				$('#header').empty();
				let header = '<h1>珍藏∕<a href="collection_overview.html?type='+ type_ +'">' + data.title + '</a>∕';
				header += '<a href="collection_class.html?type='+ type_ +'&class=' + class_ + '">'+ classZh + '</a>∕';
				header += '<a href="collection_intro.html?type='+ type_ +'&class=' + class_ + '&id=' + id_ + '">' + item_.name + '</a></h1>';
				$('#header').append(header);
		
				$('#intro').empty();
				let intro = '<h1>' + item_.name + '</h1>';
				intro += '<p>' + item_.intro + '</p>';
				$('#intro').append(intro);
		
				let bg_img = '';
				let sm_img = '';
				$('.swiper-wrapper').empty();
				for (i = 1; i <= item_.image; i++) {
					bg_img += '<div class="bcon swiper-slide"><img src="images/' + type_ + '/' + class_ + '/' + id_ + '/' + id_ + '_0' + i + '.jpg"></div>';
					sm_img += '<div class="bbox swiper-slide"><img src="images/' + type_ + '/' + class_ + '/' + id_ + '/' + id_ + '_0' + i + '.jpg"></div>';
				}
				$('.swiper-wrapper').eq(0).append(bg_img);
				$('.swiper-wrapper').eq(1).append(sm_img);
			}
			else {
				let item = data.items_list[element.index].items[0];
				morelist_cl += '<div class="col-2"><div class="shbox">';
				morelist_cl += '<div class="imgbox"><img src="images/'+type_+'/'+ element.class.en + '/'+ item.id + '/'+ item.id +'_01.jpg"></div>'
				morelist_cl += '<div class="shmorebt"><h4>More</h4></div></div></div>';
			}
		});
		$('#morechcon .imglist').empty();
		$('#morechcon .imglist').append(morelist_cl);
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
	var img = new Image();
	img.src = $(".bg_img img").attr("src");
	img.onload = () => {
		var h = img.height;
		var w = img.width; 
		var conh = conw/w*h;
		$(".imgswbox").width(imgw);
		$(".imgswbox").height(conw/560*800);
		
		$(".bg_img").width(conw);
		$(".bg_img").height(conh);
		
		$(".bg_img img").width(conw);
		$(".bg_img img").height(conh);
		
		$(".bbox").width(bw);
		$(".bbox").height(bw);
		
		$(".bbox img").width(bw);
		$(".bbox img").height(bw);
	}
};

function closeMobileMenu(){
	$("#mobile_menu").animate({width:'hide',opacity:'hide'},400);
	$(".add_line").animate({height:'show'});
	$("#mobile_menu .layer1 ul").slideUp();
	$("#cover").fadeOut(370);
	$("body").removeClass("no-scroll");
}