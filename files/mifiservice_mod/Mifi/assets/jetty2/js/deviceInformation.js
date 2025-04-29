$(function(){
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
function get_lan_device(m) {
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

    var param = { funcNo: 1029 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            var result = data.results[0];
            //保存需要的数据
            
            $("#imei").val(result.imei);
            $("#FWversion").html(result.fwversion);
            $("#manufacturer").html(result.manufacture);
            $("#dbmSignal").html(result.dbm);
                 
        } else {//错误
             Alert(mifi_translate(error_info)); 
        }
    });
   
	//$("#imei").html($.session.get("imei"));
	//$("#FWversion").html($.session.get("fwversion"));
}

$("#apply").bind('click', function(e) {

    var nImei = $("#imei").val();
  
//    var reg = /^[0-9]$/;

//    if (!reg.test(nImei)) {
//        Alert("Invalid IMEI!");
//        return;
//    }

    var param = { "funcNo": 2002,
         "imei": nImei
     
    };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确

            Alert(mifi_translate('pass'));
            return;
        } else {//错误
            Alert(mifi_translate('fail'));
			return;
        }
        //location.reload(true);
    });
});
