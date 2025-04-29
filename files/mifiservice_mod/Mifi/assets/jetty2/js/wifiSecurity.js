$(function(){
//	_loadCss("./css/layer.css");
	init();
});
var cn = {
    "fail": "失败",
    "pass": "成功",
    "LegalPin":"请输入合法的WIFI密码!"
  


};

var en = {
    "fail": "Fail",
    "pass": "Success",
    "LegalPin": "Please input legal WIFI password!"
    
};
function get_lan_security(m) {
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

    var encryp_type;
    document.getElementById("content2").style.display = "none";
	var param = {funcNo:1009};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			encryp_type = result.encryp_type;
			initPage(encryp_type);
			if(result.pwd){
				$("#pwd").val(result.pwd);
			}	
		}else{//错误
			 Alert(mifi_translate(error_info)); 
		}
	});
}

function initPage(encryp_type){
	
	switch(encryp_type){
		case 0:
			$("option").removeAttr("selected");
			$("option:eq(0)").attr("selected","selected");
			break;
		case 1:
			$("option").removeAttr("selected");
			$("option:eq(1)").attr("selected","selected");
			break;
		case 2:
			$("option").removeAttr("selected");
			$("option:eq(2)").attr("selected","selected");
			break;
		case 3:
			$("option").removeAttr("selected");
			$("option:eq(3)").attr("selected","selected");
			break;
		case 4:
			$("option").removeAttr("selected");
			$("option:eq(4)").attr("selected","selected");
			break;
		case 5:
			$("option").removeAttr("selected");
			$("option:eq(5)").attr("selected","selected");
			break;
		default:
			$("option").removeAttr("selected");
			$("option:eq(0)").attr("selected","selected");
			break;
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
	}else if($("option:eq(3)").attr("selected") == "selected"){
		$("option").removeAttr("selected");
		$("option:eq(3)").attr("selected","selected");
	}else if($("option:eq(4)").attr("selected") == "selected"){
		$("option").removeAttr("selected");
		$("option:eq(4)").attr("selected","selected");
	}else if($("option:eq(5)").attr("selected") == "selected"){
		$("option").removeAttr("selected");
		$("option:eq(5)").attr("selected","selected");
	}
});

$("#apply").bind('click', function(e) {

    var encryptype, pwd;
    document.getElementById("content2").style.display = "inline";
	if($("option:eq(0)").attr("selected") == "selected"){
		encryptype = $("option:eq(0)").val();
	}else if($("option:eq(1)").attr("selected") == "selected"){
		encryptype = $("option:eq(1)").val();
	}else if($("option:eq(2)").attr("selected") == "selected"){
		encryptype = $("option:eq(2)").val();
	}else if($("option:eq(3)").attr("selected") == "selected"){
		encryptype = $("option:eq(3)").val();
	}else if($("option:eq(4)").attr("selected") == "selected"){
		encryptype = $("option:eq(4)").val();
	}else if($("option:eq(5)").attr("selected") == "selected"){
		encryptype = $("option:eq(5)").val();
	}
	
	pwd = $("#pwd").val();
	var reg =/^[a-zA-Z0-9]{8,64}$/;
	if (!reg.test(pwd)) {
	    Alert(mifi_translate('LegalPin'));
		return;
	}
	
	var param = {funcNo:1010,
				encryp_type:encryptype,
				pwd:$("#pwd").val()
	};
	request2(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
		    Alert(mifi_translate('pass'));
		    document.getElementById("content2").style.display = "none";
			return;
		}else{//错误
		     Alert(mifi_translate(error_info)); 
		    document.getElementById("content2").style.display = "none";			
		}
	});
});

