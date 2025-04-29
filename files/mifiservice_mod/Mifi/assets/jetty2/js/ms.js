var mode = "0";

$(function(){
	init();
});

function init(){
	var param = {"funcNo":1021};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			if(result.mode == "1"){
				$("#radio").attr("onoroff","on");
				$("#radio").attr("checked","checked");
			}
		}else{//错误
			 Alert(mifi_translate(error_info)); 
		}
	});
}

$("#apply").bind('click', function (e) {
	if($("#radio").attr("onoroff") == "on"){
		mode = "1";
	}
	var param = {"funcNo":1022,"mode":mode};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			return;
		}else{//错误
			 Alert(mifi_translate(error_info)); 
		}
	});
});

$("#refresh").bind('click', function (e) {
	window.location = 'ms.html';
});

$("#radio").bind('click', function (e) {
	if($(this).attr("onoroff") == "on"){
		$(this).attr("onoroff","off");
		$(this).removeAttr("checked");
	}else{
		$(this).attr("onoroff","on");
		$(this).attr("checked","checked");
	}
});
