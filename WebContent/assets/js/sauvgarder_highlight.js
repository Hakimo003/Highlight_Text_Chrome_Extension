console.log("hello from sauvgarder !");


chrome.extension.sendMessage({directive: "getEmail"}, function(response) {
	  
	  var url = document.URL.toString();
	  var email=response.ID;
	  var contents,content_array=[];
	  
	  chrome.storage.sync.get(url, function (object) {
		  contents = JSON.parse(object[url]);
		  
		  for(i=0;i<contents.length;i++){
				content_array.push(contents[i]);
		  }
			
			$.ajax({
	              url: "http://localhost:8080/Projet-JEE/EnregistrerServlet",
	              type: "POST",
	              data: {	contenu: JSON.stringify(content_array),
	            	  		email:email,
	            	  		doc:url
	            	  	}, 
	             success: function(data) {
	                    console.log("enregistrement avec succes !");
	             },
	             error: function(e) {
	            	console.log("error from save !");
	            }
	      });
	  });
});



