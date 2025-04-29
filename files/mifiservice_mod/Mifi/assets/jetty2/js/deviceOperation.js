$(function(){
//	_loadCss("./css/layer.css");
	init();
});
var cn = {
    "fail": "失败",
    "pass": "成功"
   

};

var en = {
    "fail": "Fail",
    "pass": "Success"
  

};
function get_lan_operation(m) {
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
function init() {
    document.getElementById("content2").style.display = "none";

}

$("#restart").bind('click', function(e) {
    document.getElementById("content2").style.display = "inline";
	var param = {funcNo:1013};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;

		if (flag == "1") {//正确
		    Alert(mifi_translate('pass'));
			return;
            } else {//错误
                Alert(mifi_translate('fail'));
			     Alert(mifi_translate(error_info)); 
		}
    });
    setTimeout(function() {
        location.reload(true);
      
       
    }, 80000);
});

$("#factory").bind('click', function(e) {
   document.getElementById("content2").style.display = "inline";
	var param = {funcNo:1014};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;

		if (flag == "1") {//正确
		    Alert(mifi_translate('pass'));
			return;
    } else {//错误
            Alert(mifi_translate('fail'));
			 Alert(mifi_translate(error_info)); 
		}
    });
    setTimeout(function() {
        location.reload(true);


    }, 60000);
});
