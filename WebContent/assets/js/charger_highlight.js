console.log("hello from charger !");


chrome.extension.sendMessage({directive: "getEmail"}, function(response) {
	  var email=response.ID;
	  var url = document.URL.toString();
	  var contents = [];
	  $.ajax({
		    url: "http://localhost:8080/Projet-JEE/ChargerServlet",
		    type: "POST",
		    dataType:' text',
		    data :{
		    		doc:url,
		    		el:email
		    	},
		    success: function(dd) {
		    	  console.log("Chargement avec sucess !");
		    	  
		    	  contents=dd.split("Served at: /Projet-JEE");
		    	  dd=JSON.parse(contents[1]);
		    	  
		    	  for(i=0;i<dd.length;i++){
		    		  console.log(dd[i].text);
		              var sel = window.getSelection && window.getSelection(window.find(dd[i].text));
		              if(sel && sel.rangeCount > 0){
		            	  var range = sel.getRangeAt(0);
		            	  window.getSelection().removeAllRanges();
		            	  var wrapper = document.createElement('span');

		            	  wrapper.style.cssText =  "   display: inline!important;"+
		                                  "font-family: inherit!important;"+
		                                  "font-style: inherit!important;"+
		                                  "font-variant: inherit!important;"+
		                                  "font-weight: inherit!important;"+
		                                  "border-color: transparent !important;"+
		                                  "color: #000000!important;"+
		                                  "background-color: #d43f3a!important;"+
		                                  "font-size: inherit!important;"+
		                                  "-webkit-transition-property: color, background-color, -webkit-box-shadow;"+
		                                  "-webkit-transition-duration: 0.5s, 0.5s, 0.5s;"+
		                                  "-webkit-transition-timing-function: linear, linear, linear;"+
		                                  "padding: 0.2em!important;"+
		                                  "-webkit-box-shadow: rgba(0,0,0,0.42) 3px 3px 4px!important;"+
		                                  "border-radius: 6px!important;";
		                                  
		            	  wrapper.appendChild(range.extractContents());	
		            	  range.insertNode(wrapper);
		          }
		      }
		    	  
		  },
		  error: function(e) {
			  console.log("error from charger ! ");
		  }
		});
});


