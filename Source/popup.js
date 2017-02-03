//once the popup opens, ping the background script
chrome.runtime.sendMessage({request: "Handshake"}, function(response) {
  return;
});

//Background replies to the ping with the alert and/or sync messages; display them
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.hasOwnProperty("alert")) {
    document.getElementById('alertParagraph').innerHTML = message.alert;
  }

  if (message.hasOwnProperty("sync")) {
    document.getElementById('syncMessageParagraph').innerHTML = message.sync
  }
});

//on sync now button click, tell background script to refresh sources lists
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('syncNowButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({request: "syncNow"}, function (response) {return;});
  })
})