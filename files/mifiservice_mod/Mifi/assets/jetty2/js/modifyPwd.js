$(function(){
//	_loadCss("./css/layer.css");
	init();
});
var cn = {
            "fail" : "失败",
            "pass" : "成功",
            "inputOldpin": "请输入旧密码!",
             "inputLegalpin": "请输入合法密码!",
             "inputnewpin": "请输入新密码!",
             "cannotSame": "新密码不能与旧密码一样!",
             "modifyOk": "修改成功!"
                     
        };

var en = {
            "fail": "Fail",
             "pass": "Success",
             "inputOldpin": "Please input old password!",
             "inputLegalpin": "Please input legal password!",
             "inputnewpin": "Please input new password!",
             "cannotSame": "The new password can not be the same as the old password!",
             "modifyOk": "Successful modification!"
             
        };
function get_lan_modifypwd(m) {
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

}

$("#apply").bind('click', function(e) {

    var oldpwd = $("#oldpwd").val();
    var newpwd = $("#newpwd").val();
    var reg = /^[a-zA-Z0-9]$/;

    if (oldpwd == "") {
        //Alert("Please input old password!");
        Alert(mifi_translate('inputOldpin'));
        return;
    }
    /*
    if(!reg.test(oldpwd)){
    Alert("Please input legal password!");
    return;
    }
    */
    if (newpwd == "") {
        //Alert("Please input new password!");
        Alert(mifi_translate('inputnewpin'));
        return;
    }
    /*
    if(!reg.test(newpwd)){
    Alert("Please input legal password!");
    return;
    }
    */
    if (oldpwd == newpwd) {
        //Alert("The new password can not be the same as the old password!");
        Alert(mifi_translate('cannotSame'));
        //Alert(lang["The new password can not be the same as the old password!"]);
        return;
    }

    var param = { "funcNo": 1020,
        "oldpwd": oldpwd,
        "newpwd": newpwd
    };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
           // Alert("Successful modification!");
            Alert(mifi_translate('modifyOk'));
            return;
        } else {//错误
             Alert(mifi_translate(error_info)); 
        }
    });
});

