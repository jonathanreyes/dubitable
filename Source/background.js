/******************************************************************************
Global Variables
******************************************************************************/
var dubitableDomains = new Object();
var credibleDomains = new Object();
var startpageURL = "chrome://";

//When we pass this object to the popup, it will update its alerts portion
var alertStatusObject = {
  domain: "",
  tag: "none"
  //TODO JSR: handle when domain has a note
}

//When we pass this object to the popu, it will update its sync portion
var syncStatusObject = {
  success: false,
  syncResultString: ""
}

//Paths for D Icons
var greenDPath = "icons/greenD.png";
var yellowDPath = "icons/yellowD.png";
var redDPath = "icons/redD.png";
var greyDPath = "icons/greyD.png";

//alarm names
var retrySourcesSyncAlarmName = "retrySourcesSync";

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
  alertStatusObject.domain = "";
  alertStatusObject.tag = "untagged";
  chrome.browserAction.setIcon({path: greyDPath});
}

function monthToString(month) {
  switch (month) {
    case 1: return "January";
    case 2: return "February";
    case 3: return "March";
    case 4: return "April";
    case 5: return "May";
    case 6: return "June";
    case 7: return "July";
    case 8: return "August";
    case 9: return "September";
    case 10: return "October";
    case 11: return "November";
    case 12: return "December";
    default: return "";
  }
}

/******************************************************************************
String Builders
******************************************************************************/

function buildDubitableAlert(domain) {
  // alertString = domain + " is dubitable!\n";
  // alertString += "This domain has been tagged as " + dubitableDomains[domain]["type"] + ".\n";

  // if (dubitableDomains[domain]["notes"].length > 0) {
  //   alertString += "Notes: " + dubitableDomains[domain]["notes"];
  // }

  alertStatusObject.domain = domain;
  alertStatusObject.tag = dubitableDomains[domain]["type"];
}

function buildCredibleAlert(domain) {
  // alertString = domain + " is a credible source.";

  alertStatusObject.domain = domain;
  alertStatusObject.tag = "credible";
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

    if (!changeInfo.url.includes(startpageURL)) {
      //get domain from the tab's new URL
      var tabDomain = extractDomain(changeInfo.url);

      //check domain against list of dubitable domains
      var domainFoundInList = searchForTabUrlInDubitableDomains(tabDomain);

      if (!domainFoundInList) {
        domainFoundInList = searchForTabUrlInCredibleDomains(tabDomain);
      }

      ///TODO JSR: finish implementing special searches
      // specialChecks(tabDomain, changeInfo.url);

      //this tab is open to a domain not tagged as either credible or 
      //dubitable, so tell user to proceed with caution
      if (!domainFoundInList) {
        chrome.browserAction.setIcon({path: yellowDPath});
        // alertString = untaggedAlertString;

        alertStatusObject.domain = "";
        alertStatusObject.tag = "untagged";
      }
    }
  }
});

chrome.tabs.onCreated.addListener(function (tab) {
  resetIconAndAlertString();
  //no need to check the domain, since the URL may not be set yet
});

//TODO JSR body of this and onUpdated listener can be abstracted into helper function?
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    resetIconAndAlertString();

    if (tab.hasOwnProperty('url')) {
      if (!tab.url.includes(startpageURL)) {
        //get domain from the tab's new URL
        var tabDomain = extractDomain(tab.url);

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
          // alertString = untaggedAlertString;

          alertStatusObject.domain = "";
          alertStatusObject.tag = "untagged";
        }
      }
    }
  });
})

/******************************************************************************
Fetch credible and non-credible json objects from OpenSources.co's GitHub
******************************************************************************/
//pull the latest set of noncredible sources from OpenSources and save it in dubitableDomains
var credibleSourcesURL = "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/credible/credible.json";
var nonCredibleSourcesURL = "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/notCredible/notCredible.json"

function handleSyncError(error) {
  // lastSyncString = "Last Sync failed with error: " + error + ". \n Trying again in 5 minutes.";
  //tell the popup that the sync failed
  syncStatusObject.success = false;
  syncStatusObject.syncResultString = "";

  //TODO JSR: change icon to indicate failed sync

  //set an alarm to try the sync again in 5 minutes
  chrome.alarms.create(retrySourcesSyncAlarmName, {delayInMinutes: 5});
}

function syncSources(userRequestedRefresh) {
  fetch(nonCredibleSourcesURL, {method: 'GET'})
  .then(function (response) {
    return response.json();
  }).then(function (j) {
    //after we've fetched the dubitable domains, fetch the credible domains
    fetch(credibleSourcesURL, {method: 'GET'})
    .then(function (response2) {
      return response2.json();
    }).then(function (j2) {
      //Once we've fetched both sets of domains, set the globals
      dubitableDomains = j;
      credibleDomains = j2;

      //Update sync message with current time
      var currentDate = new Date();
      var lastSyncString = "Sources synced on "
                        + monthToString(currentDate.getMonth() + 1) + " "
                        + currentDate.getDate() + ", "
                        + currentDate.getFullYear() + " at " 
                        + currentDate.getHours() + ":";

      //format minutes
      if (currentDate.getMinutes() < 10) {
        lastSyncString += "0";
      }
      lastSyncString += currentDate.getMinutes() + ":";

      //format seconds
      if (currentDate.getSeconds() < 10) {
        lastSyncString += "0";
      }
      lastSyncString += currentDate.getSeconds();

      syncStatusObject["success"] = true;
      syncStatusObject["syncResultString"] = lastSyncString;

      //if we sync'd because of a user request (button press), update popup text
      if (userRequestedRefresh) {
          chrome.runtime.sendMessage({sync: syncStatusObject}, function(response) {return; });
      }
    }).catch(function(error2) {
      handleSyncError(error2);
    });
  }).catch(function(error) {
    handleSyncError(error);
  });
}

//create an alarm that will fire immediately on install, then again every 24 hours
chrome.alarms.create('getLatestSourceLists', {when: Date.now(), periodInMinutes: 1440});

//Whenever the alarm fires, get the latest sources lists from OpenSources.co
//(alarm will either be the 24 hour automatic or the 5 minute sync retry)
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.hasOwnProperty('name')) {
    if (alarm['name'].includes('getLatestSourceLists')
        || alarm['name'].includes(retrySourcesSyncAlarmName)) {
      syncSources(false);
    }
  }
});

/******************************************************************************
Background-Popup Messaging
******************************************************************************/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.hasOwnProperty("request") && message['request'] === "syncNow") {
    //if we get a request to sync sources now, first clear any retry alarms that may be set
    chrome.alarms.clear(retrySourcesSyncAlarmName);

    //then, sync sources now
    syncSources(true);
  }

  //the popup will send us a handshake everytime it opens
  //always respond with status of current page (alert) and latest sync
  chrome.runtime.sendMessage({alert: alertStatusObject, sync: syncStatusObject}, function(response) {return; });
});

