var mode = "0";

$(function () {
  init();
  updateStatusIndicators();
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

function updateStatusIndicators() {
  // Check debug mode status
  var param = { funcNo: 1021 };
  request(param, function (data) {
    if (data.flag == "1") {
      var result = data.results[0];
      if (result.mode == "1") {
        $("#debug_status").addClass("status-active");
        $("#radio").prop("checked", true);
        // Enable ADB when DIAG is active
        $("#adb_status").addClass("status-active");
        $("#adb").prop("checked", true);
      } else {
        $("#debug_status").removeClass("status-active");
        $("#radio").prop("checked", false);
      }
    }
  });
}

$("#radio").on("change", function () {
  if (this.checked) {
    if (
      confirm(
        "Are you sure you want to enable debug mode? This will also enable ADB."
      )
    ) {
      var param = { funcNo: 1022, mode: "1" };
      request(param, function (data) {
        if (data.flag == "1") {
          Alert("Debug mode and ADB enabled");
          $("#debug_status").addClass("status-active");
          // Also enable ADB
          $("#adb_status").addClass("status-active");
          $("#adb").prop("checked", true);
        } else {
          Alert(mifi_translate(data.error_info));
          $(this).prop("checked", false);
        }
      });
    } else {
      $(this).prop("checked", false);
    }
  } else {
    var param = { funcNo: 1022, mode: "0" };
    request(param, function (data) {
      if (data.flag == "1") {
        Alert("Debug mode disabled");
        $("#debug_status").removeClass("status-active");
        // Also disable ADB
        $("#adb_status").removeClass("status-active");
        $("#adb").prop("checked", false);
      } else {
        Alert(mifi_translate(data.error_info));
        $(this).prop("checked", true);
      }
    });
  }
});

$("#adb").on("change", function () {
  if (this.checked) {
    if (confirm("Are you sure you want to enable ADB?")) {
      var param = { funcNo: 1022 };
      request(param, function (data) {
        if (data.flag == "1") {
          Alert("ADB enabled");
          $("#adb_status").addClass("status-active");
        } else {
          Alert(mifi_translate(data.error_info));
          $(this).prop("checked", false);
        }
      });
    } else {
      $(this).prop("checked", false);
    }
  } else {
    var param = { funcNo: 1022, mode: "0" };
    request(param, function (data) {
      if (data.flag == "1") {
        Alert("ADB disabled");
        $("#adb_status").removeClass("status-active");
      } else {
        Alert(mifi_translate(data.error_info));
        $(this).prop("checked", true);
      }
    });
  }
});

$("#bootloader").on("click", function () {
  if (confirm("Are you sure you want to reboot to bootloader?")) {
    var param = { funcNo: 2000 };
    request(param, function (data) {
      if (data.flag == "1") {
        Alert("Rebooting to bootloader...");
      } else {
        Alert(mifi_translate(data.error_info));
      }
    });
  }
});

$("#apply").bind("click", function (e) {
  window.location.reload();
});
