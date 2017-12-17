// ==UserScript==
// @name         Mod
// @version      1
// @description  Mod for pockey
// @author       @BlazingFire007#7911
// @match        https://pockey.io
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==
(function(){
    window.stop();
    GM_xmlhttpRequest({
        method: 'GET',
        url: "https://pockey.io",
        onload: function(ev) {
            document.open();
            let index = ev.responseText.replace('<script type="text/javascript" src="game.core.js"></script>', '<script type="text/javascript" src="https://cdn.rawgit.com/BlazingFire007/Misc/a7e7389b/ahhh.js"></script>');
            document.write(index);
            document.close();
        }
    });
})();
