$(document).ready(function() {
	alignment();
	keypad();
	numpad();
})

$( window ).resize(function() { //ekran boyutu değişitiğinde
  alignment();
});

function alignment() { // dikey hizalama
	var height = $(window).height();
	var divHeight = $("#container").height();
	height = (height-divHeight)/2;
	$("#container").css({marginTop:height});
}
var operatorControl = 0;
var displayCont = 0;
function keypad() {  //ekrandaki butonlara basıldığında
	
	$(".keys td").click(function () {
		displayControl();
		var display = $("#display span").html(); //ekrandaki değer
		if(displayCont == 0){
			display = operatorBug_cons(display);
			var id = $(this).attr("id");
			if(id != undefined){ // sil veya karekök ise
				if(id == "square_root"){
					display = Math.sqrt(display);
					length = display.toString().length;
					if(length >= 14){
						display = display.toString().substring(0,14);
					}
				}
				if(id == "delete"){
					display = dele(display);
				}
			}
			else{
				var value = $(this).html(); //basılan tuşun değeri
				value = strip(value);
				if(value == "="){
					display = result(display);
				}
				else if(value == "C"){ //hepsini sil
					display = ""; //ekranı boşalt
				}
				else{
					if(value == "+" || value == "-" || value == "/" || value == "x" || value == "."){
						if(operatorControl == 0){
		    				display += value;
		    				display = operatorBug_firstInput(display);
		    			}
					}
					else{
							display += value;
		    				display = zero(display,value);	
					}
					
				}
			}
		}
		else{
	    	display = dele(display);
	    }
	    $("#display span").html(display); // ekrana yaz
	})

}
function numpad(){ //klavyede numpad 
	
	$(document).keyup(function(e){
		displayControl();
		var display = $("#display span").html(); //ekrandaki değer
		if(displayCont == 0){
			display = operatorBug_cons(display);
			var keyCode = e.keyCode || e.which;
		    if (keyCode >= 96 && keyCode <= 105) {
		        keyCode -= 48;
		        var number = String.fromCharCode(keyCode);
		        	display += number;
					display = zero(display,number);
			}
		    switch (keyCode){
		    	case 32: //space basılınca
		    		display = "";
		    		break;
		    	case 111:
		    		if(operatorControl == 0){
		    			display += "/";
		    			display = operatorBug_firstInput(display);
		    		}
		    		break;
		    	case 106:
		    		if(operatorControl == 0){
		    			display += "x";
		    			display = operatorBug_firstInput(display);
		    		}
		    		break;
		    	case 109:
		    		if(operatorControl == 0){
		    			display += "-";
		    			display = operatorBug_firstInput(display);
		    		}
		    		break;
		    	case 107:
		    		if(operatorControl == 0){
		    			display += "+";
		    			display = operatorBug_firstInput(display);
		    		}
		    		break;
		    	case 110: // numpad'deki , basılınca
			    	if(operatorControl == 0){
			    		display += ".";
			    	}
		    		break;
		    	case 190: // . basılınca
		    		if(operatorControl == 0){
			    		display += ".";
			    	}
		    		break;
		    	case 13: // enter = işlemi yapar
		    		display = result(display);
		    		break;
		    	case 8: // klavyedeki sil tuşu
					display = dele(display);
		    	break;
		    }
	    }
	    else{
	    	display = dele(display);
	    }
	    $("#display span").html(display); // ekrana yaz
	})
}

function displayControl(){
	var length = $("#display").html().length;
	if(length == 28){
		displayCont = 1;
		alert("Ekran Dolu!");
	}
	else{
		displayCont = 0;
	}
}

function result (display){ // işlemi yap
	var combi = ["+","-","/","x","."];
	length = display.length;
	lastChar = display.substring(length-1,length);
	var wrongCont = 0;
	combi.forEach(function(i){
		if(lastChar == i){
			alert("Hatalı İşlem!");
			wrongCont = 1;
		}
	})
	if(wrongCont == 0){
		display = display.replace("x","*"); // x'i * ile değiştir 
		display = eval(display);
		length = display.toString().length;
		if(!Number.isInteger(display)){
			display = display.toFixed(13);
			display = Number(display);
		}
		if(length>=14){
			display = display.toString().substring(0,14);
		}
	}
	return display;
}

function dele(display){ //sondan bir hane sil
	var length = display.length;
	display = display.substring(0,length-1);
	return display;
}
function operatorBug_cons (display){ //ardışık operatör girdisini engelleme
	operatorControl = 0;
	var combi = ["+","-","/","x","."];
	var length = display.length;
	var lastChar = display.substring(length-1,length);
	combi.forEach(function(i){
		if(lastChar == i){
			operatorControl = 1;
		}
	})
	return display;
}
function operatorBug_firstInput (display){ //ilk girdi olarak operatör girmeyi engelleme
	var multiple = display.indexOf("x");
	var sum = display.indexOf("+");
	var sub = display.indexOf("-");
	var divide = display.indexOf("/");

	if(sum == 0 || sub == 0 || divide == 0 || multiple == 0){
		display = dele(display);
	}
	return display;
}
function zero (display,value){ 
	var length = display.length;
	var multiple = display.indexOf("x");
	var sum = display.indexOf("+");
	var sub = display.indexOf("-");
	var divide = display.indexOf("/");
	var lastChar = display.substring(length-3,length); //son 3 haneyi alır
	if(display.indexOf("0")==0 && value == "0" && display.indexOf(".")==-1){
		display = "0";
	}
	else if(display.indexOf("0")==0 && value != "0" && display.indexOf(".")==-1){
		display += value;
		display = display.substring(1,length);
	}
	else if(lastChar.indexOf("0")==1 && (lastChar.indexOf("+")==0 || lastChar.indexOf("-")==0 || lastChar.indexOf("x")==0 || lastChar.indexOf("/")==0) && lastChar.indexOf(".") != 2){
		display = display.substring(0,length-2); //son iki hanenin ilki operatör ikincisi 0 ise 0'ı sil
		display += value;
	}
	return display;
}
function strip(html) //html tag temizleme
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText;
}