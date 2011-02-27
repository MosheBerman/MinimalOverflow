// ==UserScript==
//
// @name	Stylesheet Switcher
//
// @namespace	http://mosheberman.com
// @description   Load a stylesheet into a website
// @version 0.0.5.1
//
// @include      http://stackoverflow.com/*
// @include      http://meta.stackoverflow.com/*
// @include      http://superuser.com/*
// @include      http://meta.superuser.com/*
// @include      http://serverfault.com/*
// @include      http://meta.serverfault.com/*
// @include      http://askubuntu.com/*
// @include      http://meta.askubuntu.com/*
// @include      http://answers.onstartups.com/*
// @include      http://meta.answers.onstartups.com/*
// @include      http://nothingtoinstall.com/*
// @include      http://meta.nothingtoinstall.com/*
// @include      http://seasonedadvice.com/*
// @include      http://meta.seasonedadvice.com/*
// @include      http://stackapps.com/*
// @include      http://*.stackexchange.com/*
// @exclude      http://chat.stackexchange.com/*
// @exclude      http://chat.*.stackexchange.com/*
// @exclude      http://api.*.stackexchange.com/*
// @exclude      http://data.stackexchange.com/*
// @exclude      http://*/reputation
//
// @author Moshe Berman
//
// ==/UserScript==

//This URL will be loaded as the page's stylesheet and this overrides any other stylesheets as of now
//var pathToStylesheet = "http://mosheberman.com/clean.css";
var pathToStylesheet = "https://github.com/MosheBerman/MinimalOverflow/raw/master/clean.css"
//
//	TODO: Build Switcher UI 
//

var linkElements = document.getElementsByTagName("link");
	
for(var i=0; i<linkElements.length; i++){	
	if(linkElements[i].getAttribute("rel").toString() == "stylesheet"){
		linkElements[i].href = pathToStylesheet;
	}
}
