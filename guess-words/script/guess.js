(function($) {
	// var downUrl = [];
	// 模拟数据
	var downUrl = [{AppUrl:"#",AppId:"123123"},{AppUrl:"#",AppId:"123123"},{AppUrl:"#",AppId:"123123"},{AppUrl:"#",AppId:"123123"},{AppUrl:"#",AppId:"123123"}];

	// onload
	var imgPath = "images/";
	var loadingPage = (function(){
		var sourceArr = [
			// 'loading.png'
			'icons/uc.png',
			'icons/vidmate.png',
			'icons/easytouch.png',
			'icons/es.png',
			'index_tit.png',
			'index_star.png',
			'vol.1.png',
			'start_btn.png',
			'index_bg.png',
			'game_bg.jpg',
			'topbar_bg.png',
			'back.png',
			'share.png',
			'star.png',
			'tips_0.png',
			'tips_1.png',
			'tips_2.png',
			'game_bg.jpg',
			'light_bg.png',
			'share.png'
		];
		for (var i = 0; i < sourceArr.length; i++) {
			sourceArr[i] = (imgPath + sourceArr[i]);
		}
		var loadImage = function(path, callback){
			var img = new Image();
			img.onload = function(){
				img.onload = null;
				callback(path);
			}
			img.src = path;
		}
		var imgLoader = function(imgs, callback){
			var len = imgs.length, i = 0;
			while(imgs.length){
				loadImage(imgs.shift(), function(path){
					callback(path, ++i, len);
				});
			}
		}
		var rateNum = document.getElementById('loading');
		var bodyh = document.documentElement.clientHeight;
		rateNum.style.height=bodyh+"px";
		imgLoader(sourceArr, function(path, curNum, total){
			var percent = curNum/total;
			document.getElementById('loadingSpan').innerHTML = Math.floor(percent*100)+"%";
			if(percent == 1){
				setTimeout(showPage,500);
			}
		});
	})();
	// showPage();
	function showPage(){
		$("#loading").remove();
		$('.full_bg').show();
	}
	var crazy = {},
		crazyData = {
			"questions": [{
				"q": "Give you a great browsing experience",
				"answer": "UC",
				"ID": 1,
				"image": "images/icons/uc.png",
				"keyboard": "APUSEOZTBVGYXBYD"
			}, {
				"q": "Your BEST choice for entertainment!",
				"answer": "VIDMATE",
				"ID": 2,
				"image": "images/icons/vidmate.png",
				"keyboard": "ARTYISELOGMBYD"
			}, {
				"q": "Float on your screen—You can move it anywhere.",
				"answer": "EASYTOUCH",
				"ID": 3,
				"image": "images/icons/EASYTOUCH.png",
				"keyboard": "USEOGMBYD"
			}, {
				"q": "A free, full-featured file and application manager.",
				"answer": "ES",
				"ID": 4,
				"image": "images/icons/es.png",
				"keyboard": "FPUFEOZTBVGYXBYD"
			}, {
				"q": "A fantastic web experience at the fastest speeds.",
				"answer": "OPERA",
				"ID": 5,
				"image": "images/icons/OPERA.png",
				"keyboard": "ZNCGMERASKEYD"
			}]
		};
	//获取随机数
	crazy.getRandomNum = function(maxNum) {
		return Math.floor(Math.random() * maxNum);
	};
	//获取文字
	crazy.getWord = function(item) {
		var keyboard = item.answer.split('').concat(item.keyboard.split('')),
			html = '';
		for (var i = 0, l = keyboard.length; i < l; i++) {
			html += '<li class="word-item">' + keyboard.splice(this.getRandomNum(keyboard.length), 1) + '</li>';
		}
		return html;
	};
	//获取空文本框
	crazy.getTextArea = function(num) {
		var html = '';
		for (var i = 0; i < num; i++) {
			html += '<li class="text-item"></li>';
		}
		return html;
	};
	//绑定事件
	crazy.bind = function(answer, id) {
		$('.next-btn').off('click');
		$('.word-item').on('click', function() {
			if (!$('.text-item').hasClass('error')) {
				var text = this.innerHTML,
					num = $(this).index();
				for (var i = 0, l = $('.text-item').length; i < l; i++) {
					if (!$('.text-item').eq(i).attr('data-key')) {
						$('.text-item').eq(i).html(this.innerHTML).attr({
							'data-key': text,
							'data-index': num
						});
						this.style.visibility = 'hidden';
						break;
					}
				}
				if ($('.text-item[data-key]').length === l) {
					crazy.checkAnswer(answer, id);
				}
			}
		});
		$('.text-item').on('click', function() {
			this.innerHTML = '';
			$('.word-item').eq($(this).attr('data-index')).css('visibility', 'visible');
			$(this).removeAttr('data-key data-index');
			$('.text-item').removeClass('error');
		});
		$('.prev_btn').on('click', function() {
			$('.prev_btn').off('click');
			id--;
			// 回首页
			if (id == 0) {
				// 添加游戏背景
				$(".full_bg").removeClass("game_bg");
				$('.play-btn').show();
				$('.text-wrap,.word-wrap,.progress,.share-icon,.pic-wrap,.text_q,.top_bar').hide();
				$(".awards").show();
				return false;
			};
			id--;
			var html = $('.main').clone(false);
			html.css('left', -5000);
			$('.main').after(html).animate({
				right: 5000
			}, 400, function() {
				$('.main').eq(0).remove();
			});
			// console.log(id);
			crazy.init(crazyData.questions[id]);
			$('.main').animate({
				left: 0
			}, 400);
		});
		$('.next-btn').on('click', function() {
			// $('.next-btn').off('click');
			$('.success-mask').hide();
			$('.success,.bg_share_btn').hide();

			if (id === crazyData.questions.length) {
				$('.text-wrap,.word-wrap,.progress,.share-icon,.pic-wrap,.text_q,.top_bar').hide();
				$('.complete,.light_bg,.bg_share_btn').fadeIn();
				//share
				$(".bg_share_btn,.red_btn").on("click",function(){
					// HdShare(5);
				});
				return false;
			}

			var html = $('.main').clone(false);
			html.css('left', 5000);
			$('.main').after(html).animate({
				left: -5000
			}, 400, function() {
				$('.main').eq(0).remove();
			});
			// console.log(id);
			crazy.init(crazyData.questions[id]);
			$('.main').animate({
				left: 0
			}, 400);
		});
	};
	//检测答案是否正确
	crazy.checkAnswer = function(right, index) {
		var answer = '';
		$('.text-item').each(function() {
			answer += this.innerHTML;
		});
		if (answer === right) {
			$('.success-mask,.bg_share_btn').fadeIn();
			crazy.save(index);
			// if (index === crazyData.questions.length) {
			// 	$('.complete,.light_bg').fadeIn();

			// } else {
				// 3题后变化背景显示不同tips
				if (index>2) {
					$(".success").removeClass("pop_box_0").addClass("pop_box_1");
				}else{
					$(".success").removeClass("pop_box_1").addClass("pop_box_0");
				}
				var app = downUrl[index - 1];
				// console.log(index,app);
				$('.success .download_btn').eq(0).attr({href:app.AppUrl}).on("click",function(e){
					// HdDownload(app.AppId);
					e.preventDefault();
				});
				$('.success').find('.qid').html(index).end().find('.answer').html(right).end().fadeIn();
				//share
				$(".bg_share_btn").on("click",function(e){
					// HdShare(5);
					e.preventDefault();
				});
			// }
		} else {
			$('.text-item').addClass('error');
		}
	};
	//存储进度
	crazy.save = function(num) {
		if (window.localStorage) {
			localStorage.setItem("crazyIndex", num);
		}
	};
	//读取进度
	crazy.load = function() {
		if (window.localStorage) {
			return window.parseInt(localStorage.getItem('crazyIndex') || 0, 10);
		}
	};
	//初始化
	crazy.init = function(item) {
		// console.log(localStorage.getItem('crazyIndex'))
		$('.pic-wrap img').attr('src', item.image);
		$('.progress-current').html(item.ID);
		$('.text_q').html(item.q);
		$('.text-wrap').html(this.getTextArea(item.answer.length));
		$('.word-wrap').html(this.getWord(item));
		this.bind(item.answer, item.ID);
		$(".share_btn").on("click",function(){
			// HdShare(5);
		});
	};
	$('.progress-current').html(crazy.load() + 1);
	$('.progress-total').html(crazyData.questions.length);
	$('body').on('click', '.play-btn', function() {
		// 添加游戏背景
		$(".full_bg").addClass("game_bg");
		// var index = crazy.load();
		var index = 0;
		if (crazyData.questions.length === index) {
			index = 0;
		}
		crazy.init(crazyData.questions[index]);
		// $(this).fadeOut(400, function() {
		$('.play-btn').hide();
		$('.pic-wrap,.text_q,.top_bar').fadeIn();
		$('.text-wrap').fadeIn();
		$('.word-wrap').fadeIn();
		$('.progress').fadeIn();
		$(".share-icon").show();
		$(".awards").hide();
		// });
	});
	// index
	$(".close_btn").click(function() {
		$(this).parents(".pop_box").hide();
		$(".success-mask").hide();
		if ($(this).parents(".pop_box").hasClass("complete")) {
			// $(".guess_index").show();
			// $(".guess_guide").hide();
			$('.text-wrap,.text_q,.word-wrap,.progress,.share-icon').hide();
			$(".pic-wrap,.play-btn,.awards").show();
			$(".pic-wrap img").attr('src', 'http://img3.91.com/uploads/images/topic/yuanxiao2015/images/main_pic.png');
			Clear();
		}
	});

})(jQuery);
