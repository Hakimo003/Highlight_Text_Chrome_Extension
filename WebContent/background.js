
var cc;

	  
chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
	chrome.identity.getProfileUserInfo(function(info) {
		  cc=info.email;
	});
        switch (request.directive) {
            case "getEmail" :
            	console.log("email :"+cc);
            	sendResponse({ID: cc});break;
        case "activer":
        	chrome.tabs.executeScript(null, {file: "assets/js/activer_highlight.js"});
            sendResponse({}); 
            break;
            
         case "desactiver" :
        	
        		 chrome.tabs.executeScript(null, { file: "assets/js/desactiver_highlight.js" });
        	 

       
sendResponse({}); 
         break;
                  case "load" :
                	  chrome.tabs.executeScript(null, { file: "assets/js/jquery-2.2.0.min.js" }, function() {
              		    chrome.tabs.executeScript(null, { file: "assets/js/charger_highlight.js" });
              		});
      
sendResponse({}); 
         break;
                  case "save" :
                		 chrome.tabs.executeScript(null, { file: "assets/js/jquery-2.2.0.min.js" }, function() {
                 		    chrome.tabs.executeScript(null, { file: "assets/js/sauvgarder_highlight.js" });
                 		});  
         
sendResponse({}); 
         break;
        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);

/*

chrome.browserAction.onClicked.addListener(function(tab) {
	console.log(tab.url);
	chrome.tabs.executeScript(tab.id,{file: "highlight.js"});
});*/



