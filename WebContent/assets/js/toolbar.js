var url=chrome.extension.getURL("toolbar.html");
var height = "35px";
var iframe = "<iframe src='"+url+"' id='monToolbar' style='height:"+height+";position:fixed;width:100%;top:0;left:0;'></iframe>";

$("html").append(iframe);

$("body").css({
	'-webkit-transform' : 'translateY('+height+')'
});


