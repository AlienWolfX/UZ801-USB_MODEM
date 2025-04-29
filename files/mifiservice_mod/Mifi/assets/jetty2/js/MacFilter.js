$(function() {
    //	_loadCss("./css/layer.css");
    init();
    init2();
    InitMacList();
    bindingEvents();
});
var cn = {
    "fail": "失败",
    "pass": "成功",
    "LegalPin": "请输入合法的WIFI密码!",
    "Set":"设置",
    "Save All": "全部保存",
    "invalidMac":"非法地址" 
  


};

var en = {
    "fail": "Fail",
    "pass": "Success",
    "LegalPin": "Please input legal WIFI password!",
    "Set": "Set",
    "Save All": "Save All",
    "invalidMac": "Invalid Address" 
    
};
function get_lan_mac(m) {
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


function InitMacList() {
    var param = { funcNo: 1052 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            var result = data.results[0];
            nType = result.type; //black list:0 white list:1 close:3

            var osel = document.getElementById("selectMactype"); //得到select的ID
            var opts = osel.getElementsByTagName("option");
            if (nType == 0) {
                opts[0].selected = true;
                opts[1].selected = false;
                opts[2].selected = false;

            } else if (nType == 1) {
                opts[1].selected = true;
                opts[0].selected = false;
                opts[2].selected = false;
            } else if (nType == 3) {
                opts[2].selected = true;
                opts[1].selected = false;
                opts[0].selected = false;
            }
            $("#typename").html(nType);
            showMacList(result.info_arr);


        } else {//错误
            alert(error_info);
        }
    });
}
function showMacList(deviceAttr) {
    if (deviceAttr == "" || deviceAttr == undefined) {
        return;
    }
    var html = "";
    var temp = "";
    var buttonIds = ["set1", "set2", "set3", "set4", "set5", "set6", "set7", "set8", "set9", "set10"];
    var buttonidName;
    for (var i = 0; i < deviceAttr.length; i++) {
        buttonidName = buttonIds[i];
        temp = '<input id="' + 'Macinput' + deviceAttr[i].id + '"' + ' name="wifi.mac" maxlength="17" value="' + deviceAttr[i].macaddr + '">';
        html += '<tr><td>' + deviceAttr[i].id + '</td><td>' + temp + '</td><td>   <input type="button" id=' + buttonidName + ' class="button" value="'+mifi_translate('Set')+'"></input> </td></tr>';
    }

    html += '<tr><td></td><td>' + '<input type="submit" id="Submit1" class="button" value="' + mifi_translate('Save All') + '" lang="Save All"></input>' + '</td></tr>';
    $("#list").show();
    $("#table").append(html);
}



function setMacfilterList() {

    var obj = document.getElementById("selectMactype");
    var index = obj.selectedIndex; //序号，取当前选中选项的序号
    var stat = obj.options[index].value; //获取值 

    var param = { funcNo: 1053, type: stat };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            commitMacfilter();

        } else {//错误
            alert(error_info);
        }
    });
}
function validate_mac(ch) {
    if (ch >= 65 && ch <= 90) return true;
    if (ch >= 97 && ch <= 122) return true;
    if (ch >= 48 && ch <= 58) return true;
    return false;
}
function setMacfilterMac(nId, nMac) {
    var i, c;

    if (nMac.length == 17) {
        if (nMac.charAt(2) != ':' || nMac.charAt(5) != ':' || nMac.charAt(8) != ':' || nMac.charAt(11) != ':' || nMac.charAt(14) != ':') {
            Alert(mifi_translate('invalidMac'));
            return;
        }
        for (i = 0; i < nMac.length; ++i) {
            c = nMac.charCodeAt(i);
            if (!validate_mac(c)) {
                Alert(mifi_translate('invalidMac'));
                return;
            }
        }
    }
    else if(nMac.length == 0) {
     }
    else {
        Alert(mifi_translate('invalidMac'));
        return;
    }
    
    
    var param = { funcNo: 1054, id: nId, mac: nMac };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确

            Alert(mifi_translate('pass'));


        } else {//错误
            alert(error_info);
        }
    });
}

function commitMacfilter() {
    var param = { funcNo: 1055 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            Alert(mifi_translate('pass'));

        } else {//错误
            alert(error_info);
        }
    });
}


//事件绑定
bindingEvents = function() {
    $("#set1").die().live("click", function() {
        setMacfilterMac(1, $("#Macinput1").val());

    });
    $("#set2").die().live("click", function() {
        setMacfilterMac(2, $("#Macinput2").val());
    });
    $("#set3").die().live("click", function() {
        setMacfilterMac(3, $("#Macinput3").val());
    });
    $("#set4").die().live("click", function() {
        setMacfilterMac(4, $("#Macinput4").val());
    });
    $("#set5").die().live("click", function() {
        setMacfilterMac(5, $("#Macinput5").val());
    });
    $("#set6").die().live("click", function() {
        setMacfilterMac(6, $("#Macinput6").val());
    });
    $("#set7").die().live("click", function() {
        setMacfilterMac(7, $("#Macinput7").val());
    });
    $("#set8").die().live("click", function() {
        setMacfilterMac(8, $("#Macinput8").val());
    });
    $("#set9").die().live("click", function() {
        setMacfilterMac(9, $("#Macinput9").val());
    });
    $("#set10").die().live("click", function() {
        setMacfilterMac(10, $("#Macinput10").val());
    });

    $("#Submit1").die().live("click", function() {
        setMacfilterList();

    });
}

$("#selectMactype").bind('change', function(e) {


});

function showMacList2(deviceAttr) {
    if (deviceAttr == "" || deviceAttr == undefined) {
        return;
    }
    var html = "";
    var temp = "";
    var buttonIds = ["set1", "set2", "set3", "set4", "set5", "set6", "set7", "set8", "set9", "set10"];
    var buttonidName;
    for (var i = 0; i < deviceAttr.length; i++) {
        buttonidName = buttonIds[i];
        temp = '<input id="' + 'Macinput' + deviceAttr[i].id + '"' + ' name="wifi.mac" maxlength="17" value="' + deviceAttr[i].macaddr + '">';
        html += '<tr><td>' + deviceAttr[i].id + '</td><td>' + temp + '</td><td>   <input type="button" id=' + buttonidName + ' class="button" value="'+mifi_translate('pass')+ '" ></input> </td></tr>';
    }

    html += '<tr><td></td><td>' + '<input type="submit" id="Submit1" class="button" value="' + mifi_translate('Save All') + '" lang="Save all"></input>' + '</td></tr>';
    $("#list").show();
    $("#table").append(html);
}

function showCurrentDev(deviceAttr) {
    if (deviceAttr == "" || deviceAttr == undefined) {

        $("#list2").show();
        $("#noData").show();
        $("#table2").hide();
      
        return;
    }
    var html = "";
    var iTmp = 0;
    for (var i = 0; i < deviceAttr.length; i++) {
        iTmp = i + 1;
        html += '<tr><th>' + iTmp + '</th><th>' + deviceAttr[i].name + '</th><th>' + deviceAttr[i].ip
		      + '</th><th>' + deviceAttr[i].mac + '</th><th>' + deviceAttr[i].media + '</th></tr>';
    }
    $("#list2").show();
    $("#table2").append(html);
    $("#noData").hide();
}
function init2() {
    var param = { funcNo: 1011 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            var result = data.results[0];
            if (result.device_arr) {
                showCurrentDev(result.device_arr);
            }
            
            
        } else {//错误
            alert(error_info);
        }
    });
}
