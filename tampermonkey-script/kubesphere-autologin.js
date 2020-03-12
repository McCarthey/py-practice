// ==UserScript==
// @name         青云自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://ks.nk8s.cn/login*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const btnSubmit = document.querySelector("button[type='submit']")
    username.value = 'randall@duomai.com'
    password.value = 'Duomai123'
    btnSubmit.disabled = false
    btnSubmit.click()
})();