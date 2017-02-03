chrome.runtime.sendMessage({request: "Handshake"}, function(response) {
  return;
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  document.getElementById('alertParagraph').innerHTML = message.alert;
  document.getElementById('syncMessageParagraph').innerHTML = message.sync
});