chrome.storage.onChanged.addListener(function (changes, areaName) {
  alert(areaName);
  if (areaName === "local") {
    if (changes["popupText"]) {
      document.getElementById("alertParagraph").innerHTML = changes["popupText"];
    }
  }
});