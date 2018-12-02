var width,height,w,h,xK,yK;
$(document).ready(function (){
	alignment();
	$("#main").mousemove(function (event){
			alignment();
			var offset = $("#main").offset();
			var x = (event.pageX - offset.left)-20;
			var y = (event.pageY  - offset.top)-20;
			if(x<0){
				x=0;
			}
			if(y<0){
				y=0;
			}
			if(x>1190){
				x=1190;
			}
			if(y>550){
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
	ctx.clearRect(0, 0, myCanvas.width,myCanvas.height);
	ctx.beginPath();
	ctx.fillRect(x,y,50,50);
	ctx.stroke();
	
	
}
function alignment (){
	var myCanvas = document.getElementById("main");
	height = $("body").height();
	width = $("body").width();
	//$("#container").css({height:height,width:width});
	//$("#main").css({width:width,height:height});
	/*xK = 290/width;
	yK = 142/height;
	w = 50*xK;
	h = 50*yK;*/
}