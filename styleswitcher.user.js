// ==UserScript==
//
// @name	Stylesheet Switcher
//
// @namespace	http://mosheberman.com
// @description   Loads a B&W theme into the StackExchange sites and a toggler
// @version 0.0.5.8
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

/* ---------------------- (Global) Variables ----------------------- */

//This URL will be loaded as the page's stylesheet "link" element
var pathToNewStylesheet = "https://github.com/MosheBerman/MinimalOverflow/raw/master/clean.css"

//A variable to store a reference to the original stylesheet, used 
//for the toggler, in case the user wants to revert to the original
var pathToOldStylesheet = "";

//store a reference to the link elements on the page - used
//in multiple functions for 
var linkElements = document.getElementsByTagName("link");

/* --------------------- Functions --------------------- */

//	
//	The core function that switches the stylesheet
//

function switchToStylesheet(sheet){

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
	var themeSwitcherDivider = document.createElement("span");
	
	//set up the divider
	themeSwitcherDivider.class = "lsep";
	themeSwitcherDivider.innerText = "|";
	
	//Set up the toggler
	themeSwitcher.innerText = "toggle theme";
	themeSwitcher.onclick = toggle;
	
	//Add the divider and the toggler
		document.getElementById("hlinks-custom").appendChild(themeSwitcherDivider);
	document.getElementById("hlinks-custom").appendChild(themeSwitcher);
}

function toggle(){
	
	//Find the stylesheet "link" element
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
				
				//Switch (back) to the old stylesheet
				switchToStylesheet(pathToOldStylesheet);
			}
		}
	}	
}

switchToStylesheet(pathToNewStylesheet);
injectSwitcherIntoPage();



