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