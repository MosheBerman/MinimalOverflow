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

function injectSwitcherIntoPage(){

	//create the switcher link
	var themeSwitcher = document.createElement("a");
	
	//Set up the toggler
	themeSwitcher.innerText = "Toggle Theme";
	themeSwitcher.onclick = toggle();
	document.getElementById("hlinks-custom").appendChild(themeSwitcher);
}

function toggle(){
	
	//Find the "stylesheet" <link /> element
	for(var i=0; i<linkElements.length; i++){	
		if(linkElements[i].getAttribute("rel").toString() == "stylesheet"){
			
			//If the stylesheet is not the "new" (gray) one, apply it
			if(linkElements[i].href != pathToNewStylesheet){
				switchToStylesheet(pathToNewStylesheet);
			}else{
				//If the old stylesheet hasn't been referenced before
				//return, since we don't want to break the page's styling
				//altogether
				if(pathToOldStylesheet == ""){
					return;
				}
				
				//Switch to the old stylesheet
				switchToStyleSheet(pathToOldStyleSheet);
			}
		}
	}	
}

switchToStylesheet(pathToNewStylesheet);
injectSwitcherIntoPage();



