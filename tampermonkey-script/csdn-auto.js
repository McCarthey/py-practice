// ==UserScript==
// @name         CSDN auto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       McCarthey
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    /**
     * 1. 用于csdn网页自动点击“点击阅读更多”
     * 2. 无需登录，展开所有评论
     * 3. 显示评论分页栏
     */
    document.querySelector('.btn-readmore').click()
    document.querySelector('.comment-list-box').style.maxHeight = '4500px'
    document.querySelector('#commentPage').classList.remove('d-none')
})();