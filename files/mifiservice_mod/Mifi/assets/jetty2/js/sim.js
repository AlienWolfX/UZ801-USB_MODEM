$(function(){
//	_loadCss("./css/layer.css");
	setInterval(update,20000);
	update();
});
var cn = {
    "Ready": "就绪",
     "Absent" : "无SIM卡",
     "Pin Required" : "Pin锁",
     "PUK Required" : "PUK锁",
      "Network Locked" : "网络锁"
   


};

var en = {
    "Ready": "Ready",
    "Absent": "Absent",
    "Pin Required": "Pin Required",
    "PUK Required": "PUK Required",
    "Network Locked": "Network Locked"
    
};
function get_SIM(m) {
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
function update(){
	var param = {funcNo:1015};
	request(param, function(data) {
	    var flag = data.flag;
	    var error_info = data.error_info;
	    var b = "ready";
	    var d = "Absent";
        var e = "Pin Required";
        var f = "PUK Required";
        var g = "Network Locked";

	    if (flag == "1") {//正确
	        var result = data.results[0];
	        if (result.sim_status) {
	            if (result.sim_status.toLowerCase() == b)
	                $("#simsta").html(mifi_translate('Ready'));
	            else if (result.sim_status.toLowerCase() == d.toLowerCase())
	                $("#simsta").html(mifi_translate('Absent'));
			    else if (result.sim_status.toLowerCase() == e.toLowerCase())
			        $("#simsta").html(mifi_translate('Pin Required'));
			    else if (result.sim_status.toLowerCase() == f.toLowerCase())
			        $("#simsta").html(mifi_translate('PUK Required'));
			    else if (result.sim_status.toLowerCase() == g.toLowerCase())
			        $("#simsta").html(mifi_translate('Network Locked'));
	            else
	                $("#simsta").html(result.sim_status);
	        }
	        if (result.imsi) {
	            $("#sim_imsi").html(result.imsi);
	        }
	        if (result.iccid) {
	            $("#sim_iccid").html(result.iccid);
	        }
	    } else {//错误
	         Alert(mifi_translate(error_info)); 
	    }
	});
}

