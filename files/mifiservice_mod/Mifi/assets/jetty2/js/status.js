$(function(){
//	_loadCss("./css/layer.css");
	setInterval(update,5000);
	update();
	setInterval(update2,5000);
	update2();
	init();
});
var cn = {
            "fail" : "失败",
            "pass" : "成功",
           
        };

var en = {
            "fail": "Fail",
             "pass": "Success"
           
        };
        
function get_lan_status(m) {
    //获取文字
    var lan = getCookie('language');     //语言版本
    //选取语言文字
    switch (lan) {
        case 'Chinese':
            var t = cn[m];
            break;
        default:
            var t = en[m];
    }

    //如果所选语言的json中没有此内容就选取其他语言显示
    if (t == undefined) t = cn[m];
    if (t == undefined) t = en[m];
  

    if (t == undefined) t = m; //如果还是没有就返回他的标识

    return t;
}
function init(){
	var conn_mode = $.session.get("conn_mode");
	if(conn_mode == "1"){//手动
		$("#manual").attr("selected","selected");
		$("#auto").removeAttr("selected");
	}else{//auto
		$("#auto").attr("selected","selected");
		$("#manual").removeAttr("selected");
	}

}

function update2(){
    var param = {funcNo:1002};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			if(result.IP){//IP
				$("#mifi_ip").html(result.IP);
			}
			if(result.mask){//掩码
				$("#g3_mask").html(result.mask);
			}
			if(result.dns1){//DNS
				$("#g3_dns").html(result.dns1);
			}
			if (result.dns2) {//DNS
			    $("#g3_dns2").html(result.dns2);
			}			
			if(result.ssid){//ssid
				$("#ssid").html(result.ssid);
			}
			if(result.wlan_ip){//wlan IP
				$("#wlan_ip").html(result.wlan_ip);
			}
			if (result.pwd) {//密码
			    $("#password").html(result.pwd);
			}				
		}else{//错误
			 Alert(mifi_translate(error_info)); 
		}
	});	
}
function update(){
	var param = {funcNo:1003};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];

			$("#mifi_tx_data").html(parseInt(result.up_bytes) + " KB");
			$("#mifi_rx_data").html(parseInt(result.down_bytes) + " KB");
			$("#client_num").html(result.client_num + " /  " + result.maxSta);
			  //Alert(get_lan_status('pass'));

		}else{//错误
		    Alert(mifi_translate('fail'));
			 Alert(mifi_translate(error_info)); 
			
		}
	});
}

$("#connect").bind('change', function (e) {
	if($("#manual").attr("selected") == "selected"){
		$("#manual").attr("selected","selected");
		$("#auto").removeAttr("selected");
	}else{
		$("#auto").attr("selected","selected");
		$("#manual").removeAttr("selected");
	}
});

$("#apply").bind('click', function (e) {
	var connmode;
	
	if($("#auto").attr("selected") == "selected"){
		connmode = $("#auto").val();
	}else if($("#manual").attr("selected") == "selected"){
		connmode = $("#manual").val();
	}
	var param = {funcNo:1004,conn_mode:connmode};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			$.session.set("conn_mode", connmode);
			Alert(mifi_translate('pass'));
			return;
		}else{//错误
		    Alert(mifi_translate('fail'));
			 Alert(mifi_translate(error_info)); 
		}
	});
});
