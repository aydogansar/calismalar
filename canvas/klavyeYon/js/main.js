var h,w,width,height,xK,yK;
	var x=10;
	var y=10;
$(document).ready(function (){
	alignment();

$(document).keydown(function (e){
		alignment();
		var myCanvas = document.getElementById("main");
		var code = (e.which) ? e.which: e.keyCode;
		switch(code){
			case 37:
				x -=10;
				break;
			case 38:
				y -=10;
				break;
			case 39:
				x +=10;
				break;
			case 40:
				y +=10;
				break;
		}
		if(x < 0){
			x = 0;
		}
		if(y < 0){
			y = 0;
		}
		if(x >= 1190){
			x=1190;
		}
		if(y >= 550){
			y=550;
		}
		canvas(x,y);
		

})	
})
$( window ).resize(function() { //ekran boyutu değişitiğinde
  		alignment();
});
function canvas(x,y){
	var myCanvas = document.getElementById("main");
	var ctx = myCanvas.getContext("2d");
	
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	ctx.fillRect(x,y,50,50);
	ctx.stroke();
	
}
function alignment (){
	/*height = $("body").height();
	width = $("body").width();
	//$("#container").css({height:height,width:width});
	//$("#main").css({width:width,height:height});
	xK = 290/width;
	yK = 142/height;
	w=50*xK;
	h=50*yK;*/
	canvas(x,y);
	
}
