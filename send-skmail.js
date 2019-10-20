// ==UserScript==
// @name         mail-send
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @match        http://sokker.org/mailbox/*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';
	
	function processMessage(query) {

		const querySplit = query.split('&');
		const owner = decodeURI(querySplit[0].replace('?owner=', ''));
		const subject = decodeURI(querySplit[1].replace('player=', ''));
		const lang = decodeURI(querySplit[2].replace('lang=', ''));

		const messageEN = "Hello my friend,\n\nI'm from the Romania team staff.\nI would kindly ask you to give us the [b][player][/b]'s skills.\nI wish you all the best :).\n\nRomania!".replace('[player]', subject);
		const messageRO = "Salutare,\n\nSunt membru in echipa de scouting a nationalei.\nSelectionetul nostru ne-a rugat sa actualizam baza de date cu jucatori. Prin urmare te rog sa imi trimiti skilurilui lui [b][player][/b]\nMultumesc si mult success :).\n\nHAI ROMANIA!".replace('[player]', subject);
		
		let message = messageEN;
		if(lang !== 'EN') {
			message = messageRO;
		}

		setTimeout(function() {
			$('#send_to').val(owner);
			$('#title').val(subject);
			$('#replyFormText').val(message);
		}, 1000);
	}

    const link = location.href;
    const position = link.indexOf('?owner');
    if( position !== -1) {
        let query = link.substring(position);
        processMessage(query);
    }

})();
