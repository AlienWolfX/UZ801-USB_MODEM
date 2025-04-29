$(function(){
//	_loadCss("./css/layer.css");
	init();
});

function init(){
	var param = {funcNo:1011};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			if(result.ip){
				$("#ip").html(result.ip);
			}
			if(result.dns1){
				$("#dns1").val(result.dns1);
			}
			if (result.dns2) {
			    $("#dns2").val(result.dns2);
			}
			if(result.range_low){
				$("#range_low").val(result.range_low);
			}
			if(result.range_high){
				$("#range_high").val(result.range_high);
			}
			if(result.device_arr){
				showCurrentDev(result.device_arr);
			}
		}else{//错误
		    Alert(mifi_translate(error_info)); 
		}
	});
}

function showCurrentDev(deviceAttr){
	if(deviceAttr == "" || deviceAttr == undefined){
		return;
	}
	var html = "";
	for(var i = 0;i < deviceAttr.length;i++){
		html += '<tr><th>' + i+1 +'</th><th>' + deviceAttr[i].name + '</th><th>' + deviceAttr[i].ip
		      + '</th><th>' + deviceAttr[i].mac + '</th><th>' + deviceAttr[i].media + '</th></tr>';
	}
	$("#list").show();
	$("#table").append(html);
}

$("#apply").bind('click', function (e) {
    var param = { funcNo: 1012, dns1: $("#dns1").val(), dns2: $("#dns2").val() };
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			return;
		}else{//错误
			alert(error_info);
		}
	});
});
