function listenMessage(msg) {
  var res = "Result  : ".concat(msg);
  $(".result").html(res);
  // alert(msg);
}

$(document).ready(function () {
  if (window.addEventListener) {
    window.addEventListener(
      "message",
      function (e) {
        listenMessage(e.data);
      },
      false
    );
  } else {
    window.attachEvent("onmessage", listenMessage);
  }
});
