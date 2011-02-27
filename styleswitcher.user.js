// ==UserScript==
//
// @name	Stylesheet Switcher
//
// @namespace	http://mosheberman.com
// @description   Load a stylesheet into a website
// @version 0.0.4.9
//
// @include	http://stackoverflow.com/
//
//
// ==/UserScript==

//This URL will be loaded as the page's stylesheet and this overrides any other stylesheets as of now
var pathToStylesheet = "http://mosheberman.com/clean.css";

var linkElements = document.getElementsByTagName("link");
	
for(var i=0; i<linkElements.length; i++){	
	if(linkElements[i].getAttribute("rel").toString() == "stylesheet"){
		linkElements[i].href = pathToStylesheet;
	}
}
