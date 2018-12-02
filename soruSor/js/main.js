$(document).ready(function () {
	var  height = $(document).height();
	$("#container").css({marginTop:(height-350)/2})
	createQuestion();
	answerQuestion();
})
var result,x,y,m;
var operator = ["+","-","/","x"];
function createQuestion(){
	
	 	x = Math.floor(Math.random() * Math.floor(9998)+1);
		y = Math.floor(Math.random() * Math.floor(9998)+1);
		shuffle(operator);
		$("#question span").html(x+" "+operator[0]+" "+y+" = ?");
		solveQuestion();
}
function solveQuestion(){
	var a,b,c;
	m = Math.floor(Math.random() * Math.floor(5)+1);
	switch (operator[0]){
		case "+":
			result = x + y;
			a = x + y +m;
			b = x + y -m
			c = x + y +m+1;
			break;
		case "/":
				result = x / y;
				if(x%y!=0){
					m = m/10;
				}
				a = x / y -m-m;
				b = x / y +m+m;
				c = (x / y)+m;
			
			break;
		case "x":
			result = x * y;
			a = (x*y) + m;
			b = (x+m) * y;
			c = x * (y-m);
			break;
		case "-":
			result = x - y;
			a = (x-y) -m;
			b = (x+m) - y;
			c = (x+m+1)-y;
			break;
	}
	answerControl(a,b,c);
}
function answerControl(a,b,c){
	if(a == b || b==c || a==c){
		solveQuestion();
	}
	else{
		var answers = [result,a,b,c];
		shuffle(answers);
		for(var i=0;i<answers.length;i++){
			answers[i] = answers[i].toFixed(3);
			answers[i] = Number(answers[i]);
			$(".option").eq(i).append("<span class='optispan'>"+answers[i]+"</span>");
		}
	}
}
var tick = 0;
function answerQuestion(){
	
	$(".op").click(function (){
		if(tick == 0){
			tick = 1;
			var value = $(this).html();
			value = strip(value);
			result = result.toFixed(3);
			result = Number(result);
			length = value.length;
			value = value.substring(4,length);
			value = parseFloat(value);
			if(result == value){
				$(this).removeClass("option").addClass("correct");
			}
			else{
				$(this).removeClass("option").addClass("wrong");
				for(var i =0;i<4;i++){
					var val = $(".op").eq(i).html();
					val = strip(val);
					val = val.substring(4,length);
					val = parseFloat(val);
					if(val == result){
						$(".op").eq(i).removeClass("option").addClass("correct");
					}
				}
			}
		}
		setTimeout(function(){
			$(".optispan").remove();
			$(".op").removeClass("wrong").addClass("option");
			$(".op").removeClass("correct").addClass("option");
			tick = 0;
			createQuestion();
		},500)

	})
}
function strip (html){
	var div = document.createElement("div");
	div.innerHTML = html;
	var text = div.textContent || div.innerText || "";
	return text;
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}