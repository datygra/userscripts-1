// ==UserScript==
// @name         Code HiliteMe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Beautiful code everywhere!
// @author       smac89
// @include      */*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require      https://raw.githubusercontent.com/smac89/userscripts/master/codehiliteme/highlight.js/build/highlight.min.js
// @run-at       document-end
// @resource     hljs.css    https://raw.githubusercontent.com/smac89/userscripts/master/codehiliteme/highlight.js/build/styles/default.min.css
// @resource     langs.json  https://raw.githubusercontent.com/smac89/userscripts/master/codehiliteme/supported_langs.json
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

/* NOTES
* https://greasyfork.org/en/help/meta-keys
* https://highlightjs.org/static/demo/
*/


// Give the option of customizing the output to use the browser's built-in pretty printer
var STYLE_OPTIONS =  {
    style: "None",
    linenos: false
};


var CodeHiliteMe = (function() {
    const _private = this;
    const extension_map = $.parseJSON(GM_getResourceText("langs.json"));

    // Add the highlight js stylesheet
    GM_addStyle(GM_getResourceText('hljs.css'));

    return {
        hiliteit: function() {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },

        ishilitable: function() {
            var $code = $("body > pre:first-child");
            var filename = window.location.href.split("/").pop().toLowerCase();

            if ($code.exists() && filename) {

                var ext = filename.substr(filename.lastIndexOf('.')).toLowerCase();
                var language = '';

                // if the extension is not found, then attempt to treat the file as a special file
                if (ext in extension_map) {
                    language = extension_map[ext];
                } else if (filename in extension_map) {
                    language = extension_map[filename];
                } else {
                    return false;
                }

                var text = $code.text();
                $code.replaceWith(`<pre><code class="${language}"></code></pre>`);
                $('code').text(text);

                return true;
            }
            return false;
        }
    };
}());

$(function() {
    'use strict';

    if (CodeHiliteMe.ishilitable()) {
        CodeHiliteMe.hiliteit();
    }
});

$.fn.extend({
    exists: function() {
        return this.length !== 0;
    }
});


// GM_xmlhttpRequest({
//     url: window.location.href,
//     method: "HEAD",
//     // headers: {
//     //     "Accept-Charset": "utf-8",
//     //     "Accept": "text/html",
//     //     "Content-Type": "application/x-www-form-urlencoded"
//     // },
//     onload: function(resp) {
//         console.log(resp.responseHeaders);
//         alert(resp.responseHeaders.match(/^content-type:\W+(.+)/gim));
//         // $code.replaceWith(resp.responseText);
//     },
//     onerror: function(resp) {
//         alert(resp.responseText);
//     }
// });

// GM_xmlhttpRequest({
//     url: "http://hilite.me/api",
//     method: "POST",
//     data: {
//         code: escape($code.text()),
//         lexer: "python",
//         style: STYLES[STYLE_OPTIONS[file_ext] || STYLE_OPTIONS['default']],
//         // style: 'fruity',
//         linenos: true,
//         options: ['stripnl'] //http://pygments.org/docs/lexers/
//     },
//     headers: {
//         "Accept-Charset": "utf-8",
//         "Accept": "text/html",
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     onload: function(resp) {
//         alert(resp.statusText);
//         $code.replaceWith(resp.responseText);
//     },
//     onerror: function(resp) {
//         alert("Request failed!" + resp.responseText);
//     }
// });

// var blob = new Blob([$.parseHTML(`<pre><div class="${language}">${$code.text()}</div></pre>`).join("")], {
//     type: 'text/html',
//     endings: 'native'
// });

// var reader = new FileReader();
// reader.onload = function(evt) {
//     console.log(evt.target.result);
//     $code.replaceWith(evt.target.result);
// };

// reader.readAsText(blob);
