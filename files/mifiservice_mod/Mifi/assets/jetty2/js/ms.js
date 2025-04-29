var mode = "0";

$(function () {
  init();
});

function init() {
  var param = { funcNo: 1021 };
  request(param, function (data) {
    var flag = data.flag;
    var error_info = data.error_info;

    if (flag == "1") {
      //正确
      var result = data.results[0];
      if (result.mode == "1") {
        $("#radio").attr("onoroff", "on");
        $("#radio").attr("checked", "checked");
      }
    } else {
      //错误
      Alert(mifi_translate(error_info));
    }
  });
}

$("#radio").bind("click", function (e) {
  if ($(this).attr("onoroff") == "on") {
    $(this).attr("onoroff", "off");
    $(this).removeAttr("checked");
  } else {
    $(this).attr("onoroff", "on");
    $(this).attr("checked", "checked");

    // Confirm before enabling debug mode
    if (confirm("Are you sure you want to enable debug mode?")) {
      var param = { funcNo: 1022, mode: "1" };
      request(param, function (data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {
          Alert("Debug mode enabled");
        } else {
          Alert(mifi_translate(error_info));
        }
      });
    }
  }
});

$("#bootloader").bind("click", function (e) {
  if ($(this).attr("onoroff") == "on") {
    $(this).attr("onoroff", "off");
    $(this).removeAttr("checked");
  } else {
    $(this).attr("onoroff", "on");
    $(this).attr("checked", "checked");

    // Confirm before rebooting
    if (confirm("Are you sure you want to reboot to bootloader?")) {
      var param = { funcNo: 2000 };
      request(param, function (data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {
          Alert("Rebooting to bootloader...");
        } else {
          Alert(mifi_translate(error_info));
        }
      });
    }
  }
});

// Remove the old apply button handler since we're handling actions directly
$("#apply").bind("click", function (e) {
  window.location.reload();
});
