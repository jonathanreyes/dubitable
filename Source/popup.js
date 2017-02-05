// //global variable matching source tags to information strings
// var tags = {
//   fake: {
//     name: "Fake News",
//     description: "Sources that entirely fabricate information, disseminate deceptive content, or grossly distort actual news reports."
//   },
//   satire: {
//     name: "Satire",
//     description: "Sources that use humor, irony, exaggeration, ridicule, and false information to comment on current events."
//   },
//   bias: {
//     name: "Extreme Bias",
//     description: "Sources that come from a particular point of view and may rely on propaganda, decontextualized information, and opinions distorted as facts."
//   },
//   conspiracy: {
//     name: "Conspiracy Theory",
//     description: "Sources that are well-known promoters of kooky conspiracy theories."
//   },
//   rumor: {
//     name: "Rumor Mill",
//     description: "Sources that traffic in rumors, gossip, innuendo, and unverified claims."
//   },
//   state: {
//     name: "State News",
//     description: "Sources in repressive states operating under government sanction."
//   },
//   junksci: {
//     name: "Junk Science",
//     description: "Sources that promote pseudoscience, metaphysics, naturalistic fallacies, and other scientifically dubious claims."
//   },
//   hate: {
//     name: "Hate News",
//     description: "Sources that actively promote racism, misogyny, homophobia, and other forms of discrimination."
//   },
//   clickbait: {
//     name: "Clickbait",
//     description: "Sources that provide generally credible content, but use exaggerated, misleading, or questionable headlines, social media descriptions, and/or images."
//   },
//   unreliable: {
//     name: "Proceed With Caution",
//     description: "Sources that may be reliable but whose contents require further verification."
//   },
//   political: {
//     name: "Political",
//     description: "Sources that provide generally verifiable information in support of certain points of view or political orientations."
//   },
//   credible: {
//     name: "Credible",
//     description: "Sources that circulate news and information in a manner consistent with traditional and ethical practices in journalism."
//   }
// };

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
      document.getElementById('syncMessageParagraph').innerHTML = message.sync.syncResultString;
    } else {
      document.getElementById('syncMessageParagraph').innerHTML = "Last sync attempt failed, trying again in 5 minutes";
    }
  }
});

//on sync now button click, tell background script to refresh sources lists
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('syncNowButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({request: "syncNow"}, function (response) {return;});
  })
})