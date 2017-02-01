/******************************************************************************
Global Variables
******************************************************************************/
//dubitableDomains is a map of domains to categories
//domains must be all lower case!
//categories are integers from 1 to 4
var dubitableDomains = new Object();
var credibleDomains = new Object();
var untaggedAlertString = "This site hasn't been tagged, but you should nonetheless be vigilant of dubitable information.";
var alertString = "";

//Paths for D Icons
var greenDPath = "icons/greenD.png";
var yellowDPath = "icons/yellowD.png";
var redDPath = "icons/redD.png";
var greyDPath = "icons/greyD.png";

/******************************************************************************
Utility Functions
******************************************************************************/
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

function resetIconAndAlertString() {
  alertString = "";
  chrome.browserAction.setIcon({path: greyDPath});
}

/******************************************************************************
String Builders
******************************************************************************/

function buildDubitableAlert(domain) {
  alertString = domain + " is dubitable!\n";
  alertString += "This domain has been tagged as " + dubitableDomains[domain]["type"] + ".\n";

  if (dubitableDomains[domain]["notes"].length > 0) {
    alertString += "Notes: " + dubitableDomains[domain]["notes"];
  }
}

function buildCredibleAlert(domain) {
  alertString = domain + " is a credible source.";
}

/******************************************************************************
Domain Check/Search Functions
******************************************************************************/
//function to find if tab's url is in dubitableDomains
function searchForTabUrlInDubitableDomains(tabDomain) {
  var tabDomainIsDubitable = false;

  for (domain in dubitableDomains) {
    if (tabDomainIsDubitable == false && tabDomain.includes(domain.toLowerCase())) {
      //this tab is open to a dubitable domain, alert the user
      chrome.browserAction.setIcon({path: redDPath});
      buildDubitableAlert(domain);
      tabDomainIsDubitable = true;
    }
  }

  return tabDomainIsDubitable;
}

//function to find if tab's url is in credibleDomains
function searchForTabUrlInCredibleDomains(tabDomain) {
  var tabDomainIsCredible = false;

  for (domain in credibleDomains) {
    if (tabDomainIsCredible == false && tabDomain.includes(credibleDomains[domain]["url"].toLowerCase())) {
      //this tab is open to a credible domain, alert the user
      chrome.browserAction.setIcon({path: greenDPath});
      buildCredibleAlert(credibleDomains[domain]["url"]);
      tabDomainIsCredible = true;
    }
  }

  return tabDomainIsCredible;
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

/******************************************************************************
Tab Listeners
/*****************************************************************************/

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.hasOwnProperty('url')) {
    resetIconAndAlertString();

    //get domain from the tab's new URL
    var tabDomain = extractDomain(changeInfo.url);

    //check domain against list of dubitable domains
    var domainFoundInList = searchForTabUrlInDubitableDomains(tabDomain);

    if (!domainFoundInList) {
      domainFoundInList = searchForTabUrlInCredibleDomains(tabDomain);
    }

    ///TODO JSR: finish implementing special searches
    // specialChecks(tabDomain, changeInfo.url);

    if (!domainFoundInList) {
      //this tab is open to a domain not tagged as either credible or dubitable, tell user to proceed with caution
      chrome.browserAction.setIcon({path: yellowDPath});
      alertString = untaggedAlertString;
    }
  }
});

chrome.tabs.onCreated.addListener(function (tab) {
  resetIconAndAlertString();
  //no need to check the domain, since the URL may not be set yet
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    resetIconAndAlertString();
    if (tab.hasOwnProperty('url')) {
      var tabDomain = extractDomain(tab.url);
      searchForTabUrlInDubitableDomains(tabDomain);
    }
  });
})

/******************************************************************************
Fetch credible and non-credible json objects from OpenSources.co's GitHub
******************************************************************************/
//pull the latest set of noncredible sources from OpenSources and save it in dubitableDomains
var nonCredibleSourcesURL = "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/notCredible/notCredible.json"
fetch(nonCredibleSourcesURL, {method: 'GET'})
.then(function (response) {
  return response.json();
}).then(function (j) {
  dubitableDomains = j;
});

//pull the latest set of credible sources from OpenSources and save if in credibleDomains
var credibleSourcesURL = "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/credible/credible.json";
fetch(credibleSourcesURL, {method: 'GET'})
.then(function (response) {
  return response.json();
}).then(function (j) {
  credibleDomains = j;
});

/******************************************************************************
Background-Popup Messaging
******************************************************************************/
chrome.runtime.onMessage.addListener(function(message,sender, sendResponse) {
  chrome.runtime.sendMessage({data: alertString}, function(response) {
    return;
  });
});

