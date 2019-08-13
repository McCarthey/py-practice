// ==UserScript==
// @name         QQ音乐付费无损音乐免费下载
// @version      1.1.4
// @match        *://y.qq.com/*
// @match        *://music.163.com/*
// @description  提供QQ音乐付费歌曲，320K下载、无损FLAC下载、无损APE下载、歌词下载，可以解析歌单列表、歌手歌单、分类歌单、专辑列表；提供网易云音乐歌曲、歌单解析。
// @grant        unsafeWindow
// @require      http://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @license      MIT
// @namespace    http://tool.liumingye.cn/qqws/
// ==/UserScript==
(function () {
	'use strict';
	var SiteUrl = window.location.href;
	var ReQQ = /y\.qq\.com\/n\/yqq\/(song|playsquare|album|playlist|singer)/i;
	var ReQQplayer = /y\.qq\.com\/portal\/player.html/i;
	var Re163 = /music\.163\.com\/(#\/|)(song|playlist)(\?id=|\/)([0-9]+)/i;
	var openUrl = function (a,b){
		var url = "http://lab.liumingye.cn/api/?name=" + encodeURIComponent(a);
		b && (url += "&type=" + b);
		window.open(url);
	}
	if (ReQQ.test(SiteUrl)) {
		var BtnA = $('<a href="javascript:;" class="mod_btn_green"><i class="mod_btn_green__icon_play"></i>VIP解析</a>');
		var BtnB = $('<a href="javascript:;" class="mod_btn"></i>歌名搜索</a>');
		var $name = $('.data__name_txt');
		$name.parent('.data__name').after(BtnA,BtnB);
		$('.data__actions').css('bottom', '-10px');
		BtnA.click(function () {
			openUrl(window.location.href);
		})
		BtnB.click(function () {
			openUrl($name.text().replace(/[\r\n]/g, "").replace(/for/i, "f o r"),"qq");
		})
		// 判断是否下架
		var interval = setInterval(function(){
			if($('.data__name_txt').length == 0){
				clearInterval(interval);
				var BtnA = $('<a href="javascript:;" class="mod_btn_green"><i class="mod_btn_green__icon_play"></i>解析该下架歌曲</a>');
				$('.none_txt__symbol').after(BtnA);
				BtnA.click(function () {
					openUrl(window.location.href);
				})
				
			}
		},1000);
	}else if (ReQQplayer.test(SiteUrl)) {
		var BtnA = $('<a style="margin-top:-10px;" href="javascript:;" class="mod_btn">VIP解析</a>');
		var BtnB = $('<a style="margin-top:-10px;" href="javascript:;" class="mod_btn">歌名搜索</a>');
		$('.mod_songlist_toolbar').after(BtnA,BtnB);
		BtnA.click(function () {
			openUrl($('.mod_btn_comment').attr('href').replace('#comment_box', ''));
		})
		BtnB.click(function () {
			openUrl($('.js_song').text().replace(/[\r\n]/g, "").replace(/for/i, "f o r"));
		})
	}else if (Re163.test(SiteUrl)) {
		var BtnA = $('<a href="javascript:;" class="u-btni u-btn2 u-btn2-2 u-btni-addply f-fl"><i>VIP解析</i></a>');
		var BtnB = $('<a href="javascript:;" class="u-btni u-btn2 u-btn2-2 u-btni-addply f-fl"><i>歌名搜索</i></a>');
		$('.m-info').find('#content-operation').find('.u-btni-addply').before(BtnA,BtnB);
		$('.u-btni').css('padding', '0 4px 0 0');
		$('.u-btni').css('margin-top', '5px');
		$('.u-btn2').css('margin-top', '5px');
		BtnA.click(function () {
			openUrl(window.location.href);
		})
		BtnB.click(function () {
			openUrl($('.f-ff2').eq(0).text().replace(/[\r\n]/g, "").replace(/for/i, "f o r"),"netease");
		})
	}
})();