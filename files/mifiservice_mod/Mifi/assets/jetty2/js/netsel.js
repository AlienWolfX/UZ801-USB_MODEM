$(function(){
//	_loadCss("./css/layer.css");
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
function init(){
	var net_mode = $.session.get("net_mode");
	if(net_mode == 0){
		$("option").removeAttr("selected");
		$("option:eq(0)").attr("selected","selected");
	}else if(net_mode == 1){
		$("option").removeAttr("selected");
		$("option:eq(1)").attr("selected","selected");
	}else if(net_mode == 2){
		$("option").removeAttr("selected");
		$("option:eq(2)").attr("selected","selected");
	}
}

$("#select").bind('change', function (e) {
	if($("option:eq(0)").attr("selected") == "selected"){
		$("option").removeAttr("selected");
		$("option:eq(0)").attr("selected","selected");
	}else if($("option:eq(1)").attr("selected") == "selected"){
		$("option").removeAttr("selected");
		$("option:eq(1)").attr("selected","selected");
	}else if($("option:eq(2)").attr("selected") == "selected"){
		$("option").removeAttr("selected");
		$("option:eq(2)").attr("selected","selected");
	}
});

$("#apply").bind('click', function (e) {
	var stat;
	
	
	if($("option:eq(0)").attr("selected") == "selected"){
		stat = $("option:eq(0)").val();
	}else if($("option:eq(1)").attr("selected") == "selected"){
		stat = $("option:eq(1)").val();
	}else if($("option:eq(2)").attr("selected") == "selected"){
		stat = $("option:eq(2)").val();
	}
	var param = {funcNo:1005,net_mode:stat};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			$.session.set("net_mode", stat);
			Alert(mifi_translate('pass'));
			return;
		}else{//错误
		    Alert(mifi_translate('fail'));
			 Alert(mifi_translate(error_info)); 
		}
	});
});

function get_lan(m) {
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