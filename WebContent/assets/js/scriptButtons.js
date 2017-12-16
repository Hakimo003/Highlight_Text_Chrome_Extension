$('.btn').tooltip();

$("#marquer").on("click",function(tab){
	

	if(	$("#load").hasClass("btn btn-success")){
		$("#load").removeClass("btn btn-success");
		$("#load").addClass("btn btn-danger");
	}
	
	if(	$("#save").hasClass("btn btn-success")){
		$("#save").removeClass("btn btn-success");
		$("#save").addClass("btn btn-danger");
	}
	
	if($(this).hasClass("btn btn-danger")){
		console.log("marquer");
		$(this).removeClass("btn btn-danger");
		$(this).addClass("btn btn-success");
		
		chrome.extension.sendMessage({directive: "activer"});

	}else if($(this).hasClass("btn btn-success")){
		console.log("desactiver le marquage");
		
		$(this).removeClass("btn btn-success");
		$(this).addClass("btn btn-danger");

		chrome.extension.sendMessage({directive: "desactiver"});
	}
	



});

$("#load").on("click",function(){
	console.log("load");
	
	if(	$("#save").hasClass("btn btn-success")){
		$("#save").removeClass("btn btn-success");
		$("#save").addClass("btn btn-danger");
	}
	
	if(	$("#marquer").hasClass("btn btn-success")){
		$("#marquer").removeClass("btn btn-success");
		$("#marquer").addClass("btn btn-danger");
	}
	if($(this).hasClass("btn btn-danger")){
		$(this).removeClass("btn btn-danger");
		$(this).addClass("btn btn-success");
	}
	
	chrome.extension.sendMessage({directive: "desactiver"});
	chrome.extension.sendMessage({directive: "load"});
	



	
});

$("#save").on("click",function(){
	console.log("save");
	if($(this).hasClass("btn btn-danger")){
		$(this).removeClass("btn btn-danger");
		$(this).addClass("btn btn-success");
	}
	
	if(	$("#marquer").hasClass("btn btn-success")){
		$("#marquer").removeClass("btn btn-success");
		$("#marquer").addClass("btn btn-danger");
	}
	if(	$("#load").hasClass("btn btn-success")){
		$("#load").removeClass("btn btn-success");
		$("#load").addClass("btn btn-danger");
	}
	
	chrome.extension.sendMessage({directive: "desactiver"});
	chrome.extension.sendMessage({directive: "save"});
	
});




