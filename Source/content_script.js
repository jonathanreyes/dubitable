var dubitableDomains = new Object();
var credibleDomains = new Object();

chrome.storage.sync.get("dubitableDomains", function(data) {
  dubitableDomains = data["dubitableDomains"];
});

chrome.storage.sync.get("credibleDomains", function(data) {
  credibleDomains = data["credibleDomains"];
});

//funcion to extract domain from a url string 
function extractDomain(url) {
  var domain;
  
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  //find & remove port number
  domain = domain.split(':')[0];

  //return as all lower case for consistency
  return domain.toLowerCase();
}

function buildDubitableAlert(domain) {
  var alertString = domain + " is dubitable!\n";
  alertString += "This domain has been tagged as " + dubitableDomains[domain]["type"] + ".\n";

  if (dubitableDomains[domain]["notes"].length > 0) {
    alertString += "Notes: " + dubitableDomains[domain]["notes"];
  }

  // alert(alertString);
  // chrome.browserAction.getPopup({}, function(popupURL) {
      popupURL.getElementById('alertParagraph').value = alertString;
  //   }
  // );
}

//function to find if tab's url is in dubitableDomains
function searchForTabUrlInDubitableDomains(tabDomain) {
  for (domain in dubitableDomains) {
    if (tabDomain.includes(domain.toLowerCase())) {
      //this tab is open to a dubitable domain, alert the user
      // buildDubitableAlert(domain, dubitableDomains[domain]);
      buildDubitableAlert(domain);
    }
  }
}

function specialChecks(tabDomain, fullUrl) {
  //TODO JSR: provide warnings on facebook pages
  if (tabDomain.includes("facebook.com")) {
    ;
  } else if (tabDomain.includes("newyorker.com")) {
    if (fullUrl.includes("borowitz-report")) {
      buildDubitableAlert("The New Yorker's Borowitz Report", dubitableDomains["borowitz-report"]);
    }
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.hasOwnProperty('url')) {
    //get domain from the tab's new URL
    var tabDomain = extractDomain(changeInfo.url);

    //check domain against list of dubitable domains
    searchForTabUrlInDubitableDomains(tabDomain);

    ///TODO JSR: finish implementing special searches
    // specialChecks(tabDomain, changeInfo.url);
  }
});