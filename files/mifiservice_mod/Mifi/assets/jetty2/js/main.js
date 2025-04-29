$(function(){
//	_loadCss("./css/layer.css");
	setInterval(init,5000);
	init();
});
var cn = {
            "connected" : "网络已连接",
            "disconnected" : "网络已断开",
            "UNKNOWN" : "未知"
           
          
           
        };

var en = {
            "connected": "Connected",
             "disconnected": "Disconnected",
             "UNKNOWN": "UNKNOWN"
           
           
           
        };
function get_lan_main(m) {
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
     
    var param = { funcNo: 1001 };

    var isEn = 0;
    var b = "Connected";
    var c = "UNKNOWN";

    if (getCookie("language") == null) {
        setCookie("language", "English");  //default is English
        window.location = 'main.html';
    }
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//
			var result = data.results[0];
			if(result.rssi){//
				mifi_signal_bar(result.rssi);
			}
			if (result.netmode) {//
			    if (result.netmode.toLowerCase() == c.toLowerCase())
			        $("#network1").html(mifi_translate('UNKNOWN'));
			    else
			        $("#network1").html(result.netmode);				
			        
			}
			if (result.oper) {//
			    $("#operation").html(result.oper);
			}			
						
			if(result.netstatus){//
			    if (result.netstatus.toLowerCase() == b.toLowerCase())
			        $("#activate").html(mifi_translate('connected'));
				else
				    $("#activate").html(mifi_translate('disconnected'));
				    
			}
		}else{//����
			 Alert(mifi_translate(error_info)); 
		}
    });
    var qqq = getCookie("language");
    if (getCookie("language") == "Chinese") {
        $("#zh").html("简体中文");
        $("#en").html("英文");
        $("#ru").html("俄文");
        $("#zh").attr("selected", "selected");
        $("#en").removeAttr("selected");
        $("#ru").removeAttr("selected");
        document.getElementById("helpEn").style.display = "none";
        document.getElementById("HelpZh").style.display = "inline";

    }
    else if (getCookie("language") == "Russion") {
        $("#zh").html("китайский язык ");
        $("#en").html("английский");
        $("#ru").html("русский язык");
        $("#ru").attr("selected", "selected");
        $("#en").removeAttr("selected");
        $("#zh").removeAttr("selected");
        document.getElementById("body6").style.display = "inline";
        document.getElementById("body7").style.display = "none";

    }
    else {
        $("#zh").html("Chinese");
        $("#en").html("English");
        $("#ru").html("Russion");
        $("#en").attr("selected", "selected");
        $("#zh").removeAttr("selected");
        $("#ru").removeAttr("selected");
        document.getElementById("body6").style.display = "inline";
        document.getElementById("body7").style.display = "none";
        
    }
}
$("#select").bind('change', function(e) {
    if ($("#en").attr("selected") == "selected") {
        $("#en").attr("selected", "selected");
        $("#zh").removeAttr("selected");
        $("#ru").removeAttr("selected");
        setCookie("language", "English");
        window.location = 'main.html';
    } else if ($("#zh").attr("selected") == "selected") {
        $("#zh").attr("selected", "selected");
        $("#en").removeAttr("selected");
        $("#ru").removeAttr("selected");
        setCookie("language", "Chinese");
        window.location = 'main.html';
    }
    else {
        $("#ru").attr("selected", "selected");
        $("#zh").removeAttr("selected");
        $("#en").removeAttr("selected");
        setCookie("language", "Russion");
        window.location = 'main.html';
    }
});

//�ź�ǿ�ȴ���
function mifi_signal_bar(signalnum){

	switch(signalnum)
	{
		case 0:
			document.getElementById("signal_grid").className = "rssi0";
			break;
		case 1:
			document.getElementById("signal_grid").className = "rssi1";
			break;
		case 2:
			document.getElementById("signal_grid").className = "rssi2";
			break;
		case 3:
			document.getElementById("signal_grid").className = "rssi3";
			break;
		case 4:
			document.getElementById("signal_grid").className = "rssi4";
			break;
		case 5:
			document.getElementById("signal_grid").className = "rssi5";
			break;
		default:
			document.getElementById("signal_grid").className = "rssi0";
			break;
	}
}
