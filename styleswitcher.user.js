// ==UserScript==
//
// @name	Stylesheet Switcher
//
// @namespace	http://mosheberman.com
// @description   Load a stylesheet into a website
// @version 0.0.5.3
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
var pathToNewStylesheet = "https://github.com/MosheBerman/MinimalOverflow/raw/master/clean.css"

var pathToOldStylesheet = "";

//
//	TODO: Build Switcher UI 
//

function switchToStylesheet(sheet){

	//store a reference to the link elements on the page
	var linkElements = document.getElementsByTagName("link");

	for(var i=0; i<linkElements.length; i++){	
		if(linkElements[i].getAttribute("rel").toString() == "stylesheet"){
	
			//If the path to the old stylesheet hasn't been set,	
			//store it for use later
			if(pathToOldStylesheet == ""){
				pathToOldStylesheet = linkElements[i].href;
			}
		
			//apply the new stylesheet
			linkElements[i].href = pathToNewStylesheet;
			
			//We only want to replace the first stylesheet, so return.
			//If SO decides to override anything here, just put it in a 
			//second stylesheet and link tag.
			return;
		}
	}
}

switchToStylesheet(pathToNewStylesheet);