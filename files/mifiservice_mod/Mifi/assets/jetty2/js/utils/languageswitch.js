
var static isChinese = true;


function SwitchToEnglish(){
	
	if(isChinese == true)
		isChinese = false;
		
	location.reload(true);

}

function SwitchToChinese(){
	
	if(isChinese == false)
		isChinese = true;
		
	location.reload(true);

}