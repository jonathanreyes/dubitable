//dubitableDomains is a map of domains to categories
//domains must be all lower case!
//categories are integers from 1 to 4
var dubitableDomains = new Object();
dubitableDomains['100percentfedup.com'] = [2,3];
dubitableDomains['21stcenturywire.com'] = [2,3];
dubitableDomains['70news.wordpress.com'] = [1];
dubitableDomains['abcnews.com.co'] = [1];
dubitableDomains['activistpost.com'] = [2,3];
dubitableDomains['addictinginfo.org'] = [3];
dubitableDomains['americannews.com'] = [1];

//funcion to extract domain from a url string 
//credit: https://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
function extractDomain(url) {
  var domain;
  
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  // alert("1: " + domain);

  //find & remove port number
  domain = domain.split(':')[0];

  // alert("2: " + domain + "\n" + "3: " + domain.toLowerCase());

  //return as all lower case for consistency
  return domain.toLowerCase();
}

//function to find if tab's url is in dubitableDomains
function searchForTabUrlInDubitableDomains(tabDomain) {
  for (domain in dubitableDomains) {
    // alert(domain + "--" + tabDomain) + " -- " + tabDomain.includes(domain);

    if (tabDomain.includes(domain)) {
      //this tab is open to a dubitable domain, alert the user
      var alertString = "The domain " + tabDomain + " is dubitable.\n";
      
      if (dubitableDomains[domain].includes(1)) {
        alertString += "CATEGORY 1: Fake, false, or regularly misleading sites that rely on \"outrage\" by using distored headlines and decontextualized or dubious information.\n"
      }

      if (dubitableDomains[domain].includes(2)) {
        alertString += "CATEGORY 2: Circulates misleading and/or potentially unreliable information or presents opinion pieces as news.\n";
      }

      if (dubitableDomains[domain].includes(3)) {
        alertString += "CATEGORY 3: Uses hyperbolic or clickbait-y headlines and/or social media descriptions, but may ohterwise circulate reliable and/or verifiable information.\n"
      }

      if (dubitableDomains[domain].includes(4)) {
        alertString += "CATEGORY 4: Purposefully fake with the intent of satire/comedy.\n";
      }

      alert(alertString);
    }
  }
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.hasOwnProperty('url')) {
    //get domain from the tab's new URL
    var tabDomain = extractDomain(changeInfo.url);

    //check domain against list of dubitable domains
    searchForTabUrlInDubitableDomains(tabDomain);
  }
});

