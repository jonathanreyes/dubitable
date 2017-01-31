chrome.storage.onChanged.addListener(function (changes, areaName) {
  alert("onChanged Fired");
  if (areaName === "local") {
    if (changes["popupText"]) {
      document.getElementById("alertParagraph").innerHTML = changes["popupText"];
    }
  }
});