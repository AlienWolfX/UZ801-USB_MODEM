$(function(){
//	_loadCss("./css/layer.css");
	init();
});
var cn = {
            "fail" : "失败",
            "pass" : "成功",
            "inpuname": "请输入名称!",
            "inputApn" :"请输入APN",
            "savePass" : "保存成功!",
            "chooseProfile": "请选择配置和输入信息!"
            
           
        };

var en = {
            "fail": "Fail",
             "pass": "Success",
             "inpuname" : "Please input Name!",
             "inputApn" :"Please input Apn!",
             "savePass" : "Saved successfully!",
             "chooseProfile" : "Please choose profile and input information!"
        };
function get_lan_wwanConfig(m) {
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

	var param = {funcNo:1016};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			showCheckedRadio(result.profile_num);	
			showProfileInfo(result.info_arr);
		}else{//错误
			 Alert(mifi_translate(error_info)); 
		}
	});
}

function showCheckedRadio(num){
	if(num == "1" || num == "2" || num == "3" || num == "4" || num == "5"){
		$("#profile"+num).show();
		$("#p"+num).attr("checked","checked");
	}else{
		$("#mifi_apn_is_auto").attr("checked","checked");
	}
}

function showProfileInfo(info_arr){
	if(info_arr == "" || info_arr == undefined){
		return;
	}
	for(var i = 0;i < info_arr.length;i++){
		var dom = $("#profile"+info_arr[i].no)
		dom.find("input:eq(0)").val(info_arr[i].name);
		dom.find("input:eq(1)").val(info_arr[i].apn);
		dom.find("input:eq(2)").val(info_arr[i].user);
		dom.find("input:eq(3)").val(info_arr[i].pwd);
		dom.find("option").removeAttr("selected");
		dom.find("option:eq("+info_arr[i].auth+")").attr("selected","selected");
	}
}

$("#p1,#p2,#p3,#p4,#p5,#mifi_apn_is_auto").bind('click', function (e) {
	$("input[type='radio']").each(function(){
		$(this).removeAttr("checked");
		$(".profile").hide();
	});
	$("#profile"+$(this).val()).show();
	$(this).attr("checked","checked");
});

$(".select").live('change', function (e) {
	if($(this).find("option:eq(0)").attr("selected") == "selected"){
		$(this).find("option").removeAttr("selected");
		$(this).find("option:eq(0)").attr("selected","selected");
	}else if($(this).find("option:eq(1)").attr("selected") == "selected"){
		$(this).find("option").removeAttr("selected");
		$(this).find("option:eq(1)").attr("selected","selected");
	}else if($(this).find("option:eq(2)").attr("selected") == "selected"){
		$(this).find("option").removeAttr("selected");
		$(this).find("option:eq(2)").attr("selected","selected");
	}else if($(this).find("option:eq(3)").attr("selected") == "selected"){
		$(this).find("option").removeAttr("selected");
		$(this).find("option:eq(3)").attr("selected","selected");
	}
});

$("#save").bind('click', function (e) {

	var n = $("input[checked='checked']").attr("id").substring(1);
	if(n == "1" || n == "2" || n == "3" || n == "4" || n == "5"){
		var dom = $("#profile"+n);
		var param = {
			funcNo:1017,
			no:n,
			name:dom.find("input:eq(0)").val(),
			apn:dom.find("input:eq(1)").val(),
			user:dom.find("input:eq(2)").val(),
			pwd:dom.find("input:eq(3)").val(),
			auth:dom.find("option[selected='selected']").val()
		};
		if (param.name == "") {
		    Alert(mifi_translate('inpuname'));
			return;
		}
		if (param.apn == "") {
		    Alert(mifi_translate('inputApn'));
			//Alert("Please input Apn!")
			return;
		}
		request(param,function(data){
			var flag = data.flag;
			var error_info = data.error_info;
			
			if(flag == "1"){//正确
			    Alert(mifi_translate('savePass'));
			}else{//错误
			    Alert(mifi_translate('fail'));
				 Alert(mifi_translate(error_info)); 
			}
		});
	}else{
	    Alert(mifi_translate('chooseProfile'));
		
	}
});

$("#mifi_apn_connect1").bind('click', function (e) {
 
	var no = $("input[checked='checked']").attr("id").substring(1);
	if(no == "1" || no == "2" || no == "3" || no == "4" || no == "5"){
		
	}else{
		no = "0";
	}
	var param = {funcNo:1018,profile_num:no};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
		    Alert(mifi_translate('pass'));
			return;
		}else{//错误
		    Alert(mifi_translate('fail'));
			 Alert(mifi_translate(error_info)); 
		}
	});
});