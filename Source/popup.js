var untaggedString = " hasn't been tagged, but you should nonetheless be vigilant of dubitable information.";

//once the popup opens, ping the background script
chrome.runtime.sendMessage({request: "Handshake"}, function(response) {
  return;
});

//Background replies to the ping with the alert and/or sync messages; display them
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.hasOwnProperty("alert")) {
    if (message.alert.tag === "untagged") { //current page is untagged
      document.getElementById('alertParagraph').innerHTML = message.alert.domain + untaggedString;
    } else if (message.alert.tag === "none") { //current page is a start page (no URL)
      document.getElementById('alertParagraph').innerHTML = "";
    } else if (message.alert.tag === "credible") { //current page is credible
      document.getElementById('alertParagraph').innerHTML = message.alert.domain + " is a credible source."
      var credibleRow = document.getElementById(message.alert.tag);
      // credibleRow.style.bgcolor = "green";
      // credibleRow.style.color = "white";
      credibleRow.style.color = "green";
    } else { //current page is dubitable
      document.getElementById('alertParagraph').innerHTML = message.alert.domain + " is dubitable! It has has been tagged as:";

      for (idx in message.alert.tag) {
        var tagRow = document.getElementById(message.alert.tag);

        if (tagRow) {
          // tagRow.style.bgcolor = "red";
          // tagRow.style.color = "white";
          tagRow.style.color = "red";
        }
      }
    }
  }

  if (message.hasOwnProperty("sync")) {
    if (message.sync.success) {
      document.getElementById('syncMessageParagraph').innerHTML = "Sources synced at " + message.sync.syncResultString;
    } else {
      document.getElementById('syncMessageParagraph').innerHTML = "Sources failed to sync at " + message.sync.syncResultString + ". Trying again in 5 minutes";
    }
  }
});

//on sync now button click, tell background script to refresh sources lists
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('syncNowButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({request: "syncNow"}, function (response) {return;});
  })
})