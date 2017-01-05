// ==UserScript==
// @name         Code HiliteMe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Beautiful code everywhere!
// @author       smac89
// @include      */*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js
// @run-at       document-end
// @resource     hljs.css    //cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// ==/UserScript==

/* NOTES
* https://greasyfork.org/en/help/meta-keys
* https://highlightjs.org/static/demo/
// @match https://raw.githubusercontent.com/*
*
*/

// Simply enter the name of the extension you want to detect
// and assign it a highlighter, then let us do the rest

var STYLE_OPTIONS =  {
    style: "None",
    linenos: false
};

let aliases;

// Give the option of customizing the output to use the browser's built-in pretty printer

$(function() {
    'use strict';

    var $code = $("body > pre:first");
    var file = window.location.href.split("/").pop();
    
    alert(hljs.listLanguages());

    if ($code.exists()) {

        


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
    }
});

$.fn.extend({
    exists: function() {
        return this.length !== 0;
    }
});

