$(function () {
  //	_loadCss("./css/layer.css");
  init();
});
var cn = {
  fail: "失败",
  pass: "成功",
  invalidSSID: "SSID长度范围是4~32.",
  LegalPin: "请输入合法的WIFI密码!",
};

var en = {
  fail: "Fail",
  pass: "Success",
  invalidSSID: "The range of SSID is 4~32.",
  LegalPin: "Please input legal WIFI password!",
};
function get_lan_wifiset(m) {
  //获取文字
  var lan = getCookie("language"); //语言版本
  //选取语言文字
  switch (lan) {
    case "Chinese":
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
  var wifi_status, ssid_flag, mode;
  var param = { funcNo: 1006 };
  request(param, function (data) {
    var flag = data.flag;
    var error_info = data.error_info;

    if (flag == "1") {
      //正确
      var result = data.results[0];
      wifi_status = result.wifi_status;
      ssid_flag = result.ssid_flag;
      mode = result.mode;
      maxSta = result.maxSta;
      initPage(wifi_status, ssid_flag, mode, maxSta);
      if (result.ip) {
        $("#ip").html(result.ip);
      }
      if (result.mac) {
        $("#mac").html(result.mac.toUpperCase());
      }
      if (result.ssid) {
        $("#ssid").val(result.ssid);
      }
      if (result.client_num) {
        $("#client_num").html(result.client_num + " /  " + result.maxSta);
      }
      var maxstation = result.maxSta;
      var osel = document.getElementById("select2"); //得到select的ID
      var opts = osel.getElementsByTagName("option");
      if (maxstation == 0) {
        opts[0].selected = true;
      } else if (maxstation == 1) {
        opts[1].selected = true;
      } else if (maxstation == 2) {
        opts[2].selected = true;
      } else if (maxstation == 3) {
        opts[3].selected = true;
      } else if (maxstation == 4) {
        opts[4].selected = true;
      } else if (maxstation == 5) {
        opts[5].selected = true;
      } else if (maxstation == 6) {
        opts[6].selected = true;
      } else if (maxstation == 7) {
        opts[7].selected = true;
      } else if (maxstation == 8) {
        opts[8].selected = true;
      } else if (maxstation == 9) {
        opts[9].selected = true;
      } else if (maxstation == 10) {
        opts[10].selected = true;
      }
    } else {
      //错误
      Alert(mifi_translate("fail"));
      Alert(mifi_translate(error_info));
    }
  });
  var encryp_type;
  document.getElementById("content3").style.display = "none";
  var param2 = { funcNo: 1009 };
  request(param2, function (data) {
    var flag = data.flag;
    var error_info = data.error_info;

    if (flag == "1") {
      //正确
      var result = data.results[0];
      encryp_type = result.encryp_type;
      initPage2(encryp_type);
      if (result.pwd) {
        $("#pwd").val(result.pwd);
      }
    } else {
      //错误
      Alert(mifi_translate(error_info));
    }
  });
}

function initPage(wifi_status, ssid_flag, mode, maxSta) {
  if (wifi_status == "0") {
    //OFF
    $("#status").html("OFF");
  }
  //	if(ssid_flag == "0"){//hide
  //		$("#ssid_nothidden").removeAttr("checked");
  //		$("#ssid_hidden").attr("checked","checked");
  //	}
}

//$("#select").bind('change', function (e) {
//	if($("#select option:eq(0)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(0)").attr("selected","selected");
//	}else if($("#select option:eq(1)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(1)").attr("selected","selected");
//	}else if($("#select option:eq(2)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(2)").attr("selected","selected");
//	}else if($("#select option:eq(3)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(3)").attr("selected","selected");
//	}else if($("#select option:eq(4)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(4)").attr("selected","selected");
//	}
//});

$("#select2").bind("change", function (e) {
  if ($("#select2 option:eq(0)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(0)").attr("selected", "selected");
  } else if ($("#select2 option:eq(1)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(1)").attr("selected", "selected");
  } else if ($("#select2 option:eq(2)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(2)").attr("selected", "selected");
  } else if ($("#select2 option:eq(3)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(3)").attr("selected", "selected");
  } else if ($("#select2 option:eq(4)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(4)").attr("selected", "selected");
  } else if ($("#select2 option:eq(5)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(5)").attr("selected", "selected");
  } else if ($("#select2 option:eq(6)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(6)").attr("selected", "selected");
  } else if ($("#select2 option:eq(7)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(7)").attr("selected", "selected");
  } else if ($("#select2 option:eq(8)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(8)").attr("selected", "selected");
  } else if ($("#select2 option:eq(9)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(9)").attr("selected", "selected");
  } else if ($("#select2 option:eq(10)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(10)").attr("selected", "selected");
  }
});

//$("#ssid_hidden").bind('click', function (e) {
//	$("#ssid_nothidden").removeAttr("selected");
//	$(this).attr("selected","selected");
//});

//$("#ssid_nothidden").bind('click', function (e) {
//	$("#ssid_hidden").removeAttr("selected");
//	$(this).attr("selected","selected");
//});

//$("#apply").bind('click', function(e) {
function applyFunction() {
  document.getElementById("content2").style.display = "inline";
  var mod, ssidhidden, nmaxsta;

  if ($("#select2 option:eq(0)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(0)").val();
  } else if ($("#select2 option:eq(1)").attr("selected") == "selected") {
    nmaxsta = $("option:eq(1)").val();
  } else if ($("#select2 option:eq(2)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(2)").val();
  } else if ($("#select2 option:eq(3)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(3)").val();
  } else if ($("#select2 option:eq(4)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(4)").val();
  } else if ($("#select2 option:eq(5)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(5)").val();
  } else if ($("#select2 option:eq(6)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(6)").val();
  } else if ($("#select2 option:eq(7)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(7)").val();
  } else if ($("#select2 option:eq(8)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(8)").val();
  } else if ($("#select2 option:eq(9)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(9)").val();
  } else if ($("#select2 option:eq(10)").attr("selected") == "selected") {
    nmaxsta = $("#select2 option:eq(10)").val();
  }
  var ssidVal = document.getElementById("ssid").value;
  if (ssidVal.length < 4 || ssidVal.length > 32) {
    Alert(mifi_translate("invalidSSID"));
  }

  var param = {
    funcNo: 1007,

    ssid: $("#ssid").val(),
    maxSta: nmaxsta,
  };
  request2(param, function (data) {
    var flag = data.flag;
    var error_info = data.error_info;

    if (flag == "1") {
      //正确
      //Alert(get_lan_wifiset('pass'));
      document.getElementById("content2").style.display = "none";
      return;
    } else {
      //错误
      Alert(mifi_translate("fail"));
      Alert(mifi_translate(error_info));
      document.getElementById("content2").style.display = "none";
    }
  });

  //});
}

//$("#restart").bind('click', function (e) {
//	var param = {funcNo:1008};
//	request(param,function(data){
//		var flag = data.flag;
//		var error_info = data.error_info;
//
//		if(flag == "1"){//正确
//			return;
//		}else{//错误
//			Alert(error_info);
//		}
//	});
//});

///wifi security
$("#SaveSubmit").bind("click", function (e) {
  applyFunction();
  var encryptype, pwd;
  document.getElementById("content3").style.display = "inline";
  if ($("#ecrytion option:eq(0)").attr("selected") == "selected") {
    encryptype = $("#ecrytion option:eq(0)").val();
  } else if ($("#ecrytion option:eq(1)").attr("selected") == "selected") {
    encryptype = $("#ecrytion option:eq(1)").val();
  } else if ($("option:eq(2)").attr("selected") == "selected") {
    encryptype = $("#ecrytion option:eq(2)").val();
  } else if ($("#ecrytion option:eq(3)").attr("selected") == "selected") {
    encryptype = $("#ecrytion option:eq(3)").val();
  } else if ($("#ecrytion option:eq(4)").attr("selected") == "selected") {
    encryptype = $("#ecrytion option:eq(4)").val();
  } else if ($("#ecrytion option:eq(5)").attr("selected") == "selected") {
    encryptype = $("#ecrytion option:eq(5)").val();
  }

  pwd = $("#pwd").val();
  var reg = /^[a-zA-Z0-9]{8,64}$/;
  if (!reg.test(pwd)) {
    Alert(mifi_translate("LegalPin"));
    return;
  }

  var param = { funcNo: 1010, encryp_type: encryptype, pwd: $("#pwd").val() };
  request2(param, function (data) {
    var flag = data.flag;
    var error_info = data.error_info;

    if (flag == "1") {
      //正确
      Alert(mifi_translate("pass"));
      document.getElementById("content3").style.display = "none";
      return;
    } else {
      //错误
      Alert(mifi_translate(error_info));
      document.getElementById("content3").style.display = "none";
    }
  });
});

//$("#select").bind('change', function(e) {
//    if ($("option:eq(0)").attr("selected") == "selected") {
//        $("option").removeAttr("selected");
//        $("option:eq(0)").attr("selected", "selected");
//    } else if ($("option:eq(1)").attr("selected") == "selected") {
//        $("option").removeAttr("selected");
//        $("option:eq(1)").attr("selected", "selected");
//    } else if ($("option:eq(2)").attr("selected") == "selected") {
//        $("option").removeAttr("selected");
//        $("option:eq(2)").attr("selected", "selected");
//    } else if ($("option:eq(3)").attr("selected") == "selected") {
//        $("option").removeAttr("selected");
//        $("option:eq(3)").attr("selected", "selected");
//    } else if ($("option:eq(4)").attr("selected") == "selected") {
//        $("option").removeAttr("selected");
//        $("option:eq(4)").attr("selected", "selected");
//    } else if ($("option:eq(5)").attr("selected") == "selected") {
//        $("option").removeAttr("selected");
//        $("option:eq(5)").attr("selected", "selected");
//    }
//});
$("#select2").bind("change", function (e) {
  if ($("#select2 option:eq(0)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(0)").attr("selected", "selected");
  } else if ($("#select2 option:eq(1)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(1)").attr("selected", "selected");
  } else if ($("#select2 option:eq(2)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(2)").attr("selected", "selected");
  } else if ($("#select2 option:eq(3)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(3)").attr("selected", "selected");
  } else if ($("#select2 option:eq(4)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(4)").attr("selected", "selected");
  } else if ($("#select2 option:eq(5)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(5)").attr("selected", "selected");
  } else if ($("#select2 option:eq(6)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(6)").attr("selected", "selected");
  } else if ($("#select2 option:eq(7)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(7)").attr("selected", "selected");
  } else if ($("#select2 option:eq(8)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(8)").attr("selected", "selected");
  } else if ($("#select2 option:eq(9)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(9)").attr("selected", "selected");
  } else if ($("#select2 option:eq(10)").attr("selected") == "selected") {
    $("#select2 option").removeAttr("selected");
    $("#select2 option:eq(10)").attr("selected", "selected");
  }
});
function initPage2(encryp_type) {
  var osel = document.getElementById("ecrytion"); //得到select的ID
  var opts = osel.getElementsByTagName("option");
  switch (encryp_type) {
    case 0:
      opts[0].selected = true;
      break;
    case 1:
      opts[1].selected = true;
      break;
    case 2:
      opts[2].selected = true;
      break;
    case 3:
      opts[3].selected = true;
      break;
    case 4:
      opts[4].selected = true;
      break;
    case 5:
      opts[5].selected = true;
      break;
    default:
      opts[0].selected = true;
      break;
  }
}

$("#ecrytion").bind("change", function (e) {
  if ($("ecrytion option:eq(0)").attr("selected") == "selected") {
    $("ecrytion option").removeAttr("selected");
    $("ecrytion option:eq(0)").attr("selected", "selected");
  } else if ($("ecrytion option:eq(1)").attr("selected") == "selected") {
    $("ecrytion option").removeAttr("selected");
    $("ecrytion option:eq(1)").attr("selected", "selected");
  } else if ($("option:eq(2)").attr("selected") == "selected") {
    $("ecrytion option").removeAttr("selected");
    $("ecrytion option:eq(2)").attr("selected", "selected");
  } else if ($("ecrytion option:eq(3)").attr("selected") == "selected") {
    $("ecrytion option").removeAttr("selected");
    $("ecrytion option:eq(3)").attr("selected", "selected");
  } else if ($("ecrytion option:eq(4)").attr("selected") == "selected") {
    $("ecrytion option").removeAttr("selected");
    $("ecrytion option:eq(4)").attr("selected", "selected");
  } else if ($("ecrytion option:eq(5)").attr("selected") == "selected") {
    $("ecrytion option").removeAttr("selected");
    $("ecrytion option:eq(5)").attr("selected", "selected");
  }
});
