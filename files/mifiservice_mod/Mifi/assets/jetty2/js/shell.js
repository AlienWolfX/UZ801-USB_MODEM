function executeCommand() {
  const cmd = document.getElementById("cmdInput").value;
  const output = document.getElementById("output");

  const data = {
    funcNo: "1020",
    cmd: cmd,
  };

  fetch("http://192.168.100.1/ajax", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      const timestamp = new Date().toLocaleTimeString();

      // Create command line element
      const cmdLine = document.createElement("div");
      cmdLine.className = "cmd-line";
      cmdLine.textContent = `[${timestamp}] $ ${cmd}`;
      output.appendChild(cmdLine);

      // Create output element
      if (result.flag === "1") {
        const cmdOutput = document.createElement("pre");
        cmdOutput.className = "cmd-output";
        cmdOutput.textContent = result.result;
        output.appendChild(cmdOutput);
      } else {
        const cmdError = document.createElement("div");
        cmdError.className = "cmd-error";
        cmdError.textContent = `Command failed: ${result.result}`;
        output.appendChild(cmdError);
      }

      output.scrollTop = output.scrollHeight;
    })
    .catch((error) => {
      const errorDiv = document.createElement("div");
      errorDiv.className = "cmd-error";
      errorDiv.textContent = `Error: ${error.message}`;
      output.appendChild(errorDiv);
      output.scrollTop = output.scrollHeight;
    });

  document.getElementById("cmdInput").value = "";
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("cmdInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        executeCommand();
      }
    });
});
