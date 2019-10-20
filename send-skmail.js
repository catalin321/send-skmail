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

		const messageEN = "Hi, mate!\n\nI'm scouter for Romanian National Teams, and I would like to up-date your player [b][player][/b] into the NTDB. Please send me his skills.\n\nBest regards!!".replace('[player]', subject);
		const messageRO = "Salut!,\n\nTe rog sa-mi trimiti atributele jucatorului [b][player][/b] pentru a-i face up-date in NTDB.\n\nMultumesc!".replace('[player]', subject);
		
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
