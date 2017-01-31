//dubitableDomains is a map of domains to categories
//domains must be all lower case!
//categories are integers from 1 to 4
var dubitableDomains = new Object();
var credibleDomains = new Object();
var alertString = "";

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
  alertString = domain + " is dubitable!\n";
  alertString += "This domain has been tagged as " + dubitableDomains[domain]["type"] + ".\n";

  if (dubitableDomains[domain]["notes"].length > 0) {
    alertString += "Notes: " + dubitableDomains[domain]["notes"];
  }
}

//function to find if tab's url is in dubitableDomains
function searchForTabUrlInDubitableDomains(tabDomain) {
  var tabDomainIsDubitable = false;

  for (domain in dubitableDomains) {
    if (tabDomain.includes(domain.toLowerCase())) {
      //this tab is open to a dubitable domain, alert the user
      chrome.browserAction.setIcon({path: "icons/redD.png"});
      buildDubitableAlert(domain);
      tabDomainIsDubitable = true;
    }
  }

  if (tabDomainIsDubitable === false) {
    chrome.browserAction.setIcon({path: "icons/greenD.png"});
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
    alertString = "";
    chrome.browserAction.setIcon({path: "icons/greenD.png"});

    //get domain from the tab's new URL
    var tabDomain = extractDomain(changeInfo.url);

    //check domain against list of dubitable domains
    searchForTabUrlInDubitableDomains(tabDomain);

    ///TODO JSR: finish implementing special searches
    // specialChecks(tabDomain, changeInfo.url);
  }
});

//pull the latest set of noncredible sources from OpenSources and save it in dubitableDomains
var nonCredibleSourcesURL = "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/notCredible/notCredible.json"
fetch(nonCredibleSourcesURL, {method: 'GET'})
.then(function (response) {
  return response.json();
}).then(function (j) {
  // alert(JSON.stringify(j));
  dubitableDomains = j;
});

//pull the latest set of credible sources from OpenSources and save if in credibleDomains
var credibleSourcesURL = "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/credible/credible.json";
fetch(credibleSourcesURL, {method: 'GET'})
.then(function (response) {
  return response.json();
}).then(function (j) {
  // alert(JSON.stringify(j));
  credibleDomains = j;
});

chrome.runtime.onMessage.addListener(function(message,sender, sendResponse) {
  chrome.runtime.sendMessage({data: alertString}, function(response) {
    return;
  });
});

