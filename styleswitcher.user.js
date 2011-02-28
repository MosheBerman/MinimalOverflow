// ==UserScript==
//
// @name	Stylesheet Switcher
//
// @namespace	http://mosheberman.com
// @description   Loads a B&W theme into the StackExchange sites and adds a toggler to the SE topbar.
// @version 0.1.2.3
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
//
// @author Moshe Berman
//
// ==/UserScript==

//
//	Potential DOM conflict:
//	This script uses the id "id_toggler_link" for the toggle link.
//


/* ---------------------- (Global) Variables ----------------------- */

//This URL will be loaded as the page's stylesheet "link" element
var pathToNewStylesheet = "https://github.com/MosheBerman/MinimalOverflow/raw/master/clean.css";

//A variable to store a reference to the original stylesheet, used 
//for the toggler, in case the user wants to revert to the original
var pathToOldStylesheet = "";

//store a reference to the link elements on the page - used
//in multiple functions for 
var linkElements = document.getElementsByTagName("link");


//FF hack
if(unsafeWindow){
	var localStorage = unsafeWindow.localStorage;
}

/* --------------	Invoke the userscript: --------------- */

main();

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


//
//	Toggle the stylesheet
//

function toggle(){
			
	//If the stylesheet is not the "new" (gray) one, apply it

	if(localStorage['pathToStylesheet'] == pathToNewStylesheet){
		localStorage['pathToStylesheet'] = pathToOldStylesheet;			
		document.getElementById("id_toggler_link").innerText = "clean css";
		document.getElementById("id_toggler_link").textContent = "clean css";		
	}else{								
		//Otherwise, switch (back) to the old stylesheet
		localStorage['pathToStylesheet'] = pathToNewStylesheet;			
		document.getElementById("id_toggler_link").innerText = "all css";	
		document.getElementById("id_toggler_link").textContent = "all css";		
	}
}


//
//	Toggle the stylesheet and then apply it to the page
//

function toggleAndApplyStylesheet(){
	toggle();
	switchToStylesheet(localStorage['pathToStylesheet']);
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
//	Create the switcher UI next to the FAQ link
//

function injectSwitcherIntoPage(){

	//create the switcher link
	var themeSwitcher = document.createElement("a");
	var themeSwitcherDivider = document.createElement("span");
	
	//set up the divider
	themeSwitcherDivider.className = "lsep";
	themeSwitcherDivider.innerText = "| ";
	themeSwitcherDivider.textContent = "| ";	
	
	themeSwitcher.id = "id_toggler_link";
	
	//
	//	TODO: Proper detection here
	//
	
	//Set up the toggler
	themeSwitcher.innerText = "all css";	
	themeSwitcher.textContent = "all css";
	
	//Commenting this line makes it work in FF
	document.getElementById('id_toggler_link').onclick = toggleAndApplyStylesheet;
	
	//Add the divider and the toggler in the navbar
	document.getElementById("hlinks-custom").appendChild(themeSwitcherDivider);
	document.getElementById("hlinks-custom").appendChild(themeSwitcher);
}

//
//	The entry point of the userscript.
//	I called it main for lack of originality.
//	It's not like C/Java programs start with main 
//	or anything like that. :P
//

function main(){

	//store the path to the original stylesheet
	storePathToOriginalStylesheet();
	
	//add a switcher to the menu
	injectSwitcherIntoPage();
	
	//configure persistence if it hasn't been set up yet
	if(!localStorage['pathToStylesheet']){
		toggle();
	}
	
	//Clean up the Stack Exchange logo as necessary
	removeStackExchangeFromLogo();
		
	//switch to the selected stylesheet
	switchToStylesheet(localStorage['pathToStylesheet']);
}

//
//	Remove the " - Stack Exchange" text from the logo alt text
//

function removeStackExchangeFromLogo(){

	document.getElementById("hlogo").innerHTML = "" + document.getElementById("hlogo").innerHTML.replace(" - Stack Exchange","");	
	
	
}

//
//	A debugging function
//


function _alert(string){
	alert(string);
}
