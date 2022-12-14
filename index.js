
function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(number){
	document.getElementById("history-value").innerText=number;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(number){
	if(number==""){
		document.getElementById("output-value").innerText=number;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(number);
	}	
}
function getFormattedNumber(number){
	if(number=="-"){
		return "";
	}
	var n = Number(number);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(number){
	return Number(number.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){

        //Clear
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}

        //Backspace
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1); //sterge ultimul caracter
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
                //verific daca ultimul caracter e un operator
                //folosind functia isNotaNumber (isNaN)

				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1); //sterg ultimul caracter
				}
			}
			if(output!="" || history!=""){
                //conditie?true:false
                //daca acea conditie este adevarata, atunci prima valoare este asociata output-ului, altfel, cea de-a doua va fi 
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //daca output-ul este un numar
			output=output+this.id;
			printOutput(output);
		}
	});
}