var content_array = [];
var url = document.URL.toString();
function highlight(){

	var sel = window.getSelection && window.getSelection();
	if(sel && sel.rangeCount > 0){
		var range = sel.getRangeAt(0);
		var selectedLines = range.toString().split("\n");
		console.log("new line : "+selectedLines);
		
		if(range.toString().trim() === ""){
					return;
		}

		for (var i = selectedLines.length - 1; i >= 0; i--) {
			if(selectedLines[i].trim() === ""){
				return;
			}
		}
	    
		var wrapper = document.createElement('span'); 
	 

		wrapper.style.cssText = "   display: inline!important;"+
	 								"font-family: inherit!important;"+
									"font-style: inherit!important;"+
									"font-variant: inherit!important;"+
									"font-weight: inherit!important;"+
									"border-color: transparent !important;"+
									"color: #000000!important;"+
									"background-color: rgba(255,165,0,0.7)!important;"+
									"font-size: inherit!important;"+
									"-webkit-transition-property: color, background-color, -webkit-box-shadow;"+
									"-webkit-transition-duration: 0.5s, 0.5s, 0.5s;"+
									"-webkit-transition-timing-function: linear, linear, linear;"+
									"padding: 0.2em!important;"+
									"-webkit-box-shadow: rgba(0,0,0,0.42) 3px 3px 4px!important;"+
									"border-radius: 6px!important;";
									
		wrapper.appendChild(range.extractContents());	
		range.insertNode(wrapper);

		getExistingHighlights();
		
		storeHighlights(selectedLines);

  }
}

function storeHighlights(selectedLines){
	content_array.push(selectedLines);
	
	var obj= {};
	obj[url] = JSON.stringify(content_array);
	console.log('current obj[url] : ',obj[url]);
	chrome.storage.sync.set(obj);
}
    
function getExistingHighlights(){
		//console.log("document : "+url);
		chrome.storage.sync.get(url, function (object) {
			console.log('old array : ',object[url]);
			contents = JSON.parse(object[url]);
			for(i=0;i<contents.length;i++){
				content_array.push(contents[i]);
			}
		});
		
}

document.addEventListener("mouseup", highlight);
