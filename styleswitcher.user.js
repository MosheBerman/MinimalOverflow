// ==UserScript==
//
// @name	Stylesheet Switcher
//
// @namespace	http://mosheberman.com
// @description   Loads a B&W theme into the StackExchange sites and adds a toggler to the SE topbar.
// @version 0.0.6.8
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

//
//	Invoke the userscript:
//

main();

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
		
			//apply the new stylesheet
			linkElements[i].href = sheet;
			
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
	themeSwitcherDivider.className = "lsep";
	themeSwitcherDivider.innerText = "| ";
	
	//Set up the toggler
	themeSwitcher.innerText = "toggle theme";
	themeSwitcher.onclick = toggle;
	
	//Add the divider and the toggler in the navbar
	document.getElementById("hlinks-custom").appendChild(themeSwitcherDivider);
	document.getElementById("hlinks-custom").appendChild(themeSwitcher);
}


//
//	Toggle the stylesheet
//

function toggle(){
	
	//Find the stylesheet "link" element
	
	for(var i=0; i<linkElements.length; i++){	
		if(linkElements[i].getAttribute("rel") == "stylesheet"){
			
			//If the stylesheet is not the "new" (gray) one, apply it
	
			if(linkElements[i].href == pathToOldStylesheet){
				switchToStylesheet(pathToNewStylesheet);
			}else{
									
				//Otherwise, switch (back) to the old stylesheet
				switchToStylesheet(pathToOldStylesheet);
				return;
			}
		}
	}	
}

//
//	Store a global reference to the initial stylesheet
//

function storePathToOriginalStylesheet(){

	for(var i=0; i<linkElements.length; i++){	
		if(linkElements[i].getAttribute("rel") == "stylesheet"){
			pathToOldStylesheet = linkElements[i].href;
			return;
		}
	}
	
}


//
//	The entry point of the userscript.
//	I called it main for lack of originality.
//	It's not like C/Java programs start with main 
//	or anything like that. :P
//

function main(){
	injectSwitcherIntoPage();
	storePathToOriginalStylesheet();
	switchToStylesheet(pathToNewStylesheet);
}


