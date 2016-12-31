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
dubitableDomains['anonnews.co'] = [3];
// dubitableDomains['Associated Media Coverage']; //facebook page
dubitableDomains['attn.com'] = [3];
dubitableDomains['beforeitsnews.com'] = [];
dubitableDomains['Being Liberal']; //facebook page
dubitableDomains['bigamericannews.com'] = [];
dubitableDomains['bigpzone.com'] = [];
dubitableDomains['Bipartisan Report']; //facebook page
dubitableDomains['bizpacreview.com'] = [];
dubitableDomains['bluenationreview.com'] = [2,3];
dubitableDomains['breitbart.com'] = [3];
dubitableDomains['cap-news.com'] = [4];
dubitableDomains['christwire.org'] = [4];
dubitableDomains['chronicle.su'] = [];
dubitableDomains['civictribune.com'] = [1];
dubitableDomains['clickhole.com'] = [4];
dubitableDomains['coasttocoastam.com'] = [2];
dubitableDomains['collective-evolution.com'] = [3];
dubitableDomains['consciouslifenews.com'] = [2];
dubitableDomains['conservativeoutfitters.com'] = [2];
dubitableDomains['wideawakeamerica.com'] = [2];
dubitableDomains['countdowntozerotime.com'] = [2];
dubitableDomains['counterpsyops.com'] = [];
dubitableDomains['creambmp.com'] = [1];
dubitableDomains['dailybuzzlive.com'] = [];
dubitableDomains['dailycurrant.com'] = [4];
dubitableDomains['dailywire.com'] = [];
dubitableDomains['dcclothesline.com'] = [];
dubitableDomains['dcgazette.com'] = [1];
dubitableDomains['denverguardian.com'] = [1];
dubitableDomains['derfmagazine.com'] = [];
dubitableDomains['disclose.tv'] = [];
dubitableDomains['drudgereport.com.co'] = [1];
dubitableDomains['duffleblog.com'] = [4];
dubitableDomains['duhprogressive.com'] = [];
dubitableDomains['embols.com'] = [];
dubitableDomains['empireherald.com'] = [];
dubitableDomains['empirenews.net'] = [1];
dubitableDomains['empirenews.com'] = [];
dubitableDomains['endingthefed.com'] = [];
dubitableDomains['enduringvision.com'] = [1];
dubitableDomains['fprnradio.com'] = [];
dubitableDomains['thefreethoughtproject.com'] = [3];
dubitableDomains['geoengineeringwatch.org'] = [];
dubitableDomains['globalresearch.ca'] = [];
dubitableDomains['govtslaves.info'] = [];
dubitableDomains['gulagbound.com'] = [];
dubitableDomains['hangthebankers.com'] = [];
dubitableDomains['humansarefree.com'] = [];
dubitableDomains['huzlers.com'] = [4];
dubitableDomains['ifyouonlynews.com'] = [];
dubitableDomains['indecisionforever.com'] = [1]; //redirects to comedy central
dubitableDomains['ijr.com'] = [];
dubitableDomains['infowars.com'] = [1,2];
dubitableDomains['intellihub.com'] = [];
dubitableDomains['inquisitr.com'] = [];
dubitableDomains['jonesreport.com'] = [];
dubitableDomains['landoverbaptist.org'] = [4];
dubitableDomains['lewrockwell.com'] = [];
dubitableDomains['liberalamerica.org'] = [];
dubitableDomains['libertytalk.fm'] = [];
dubitableDomains['libertyunyielding.com'] = [];
dubitableDomains['libertyvideos.org'] = [];
dubitableDomains['libertymovementradio.com'] = [];
dubitableDomains['mediamass.net'] = [1];
dubitableDomains['megynkelly.us'] = [1];
dubitableDomains['msnbc.com.co'] = [1];
dubitableDomains['nahadaily.com'] = [4];
dubitableDomains['nationalreport.net'] = [1];
dubitableDomains['naturalnews.com'] = [];
dubitableDomains['nbc.com.co'] = [1]; //JSR: I labelled this as 1, independent of source material
dubitableDomains['ncscooper.com'] = [];
dubitableDomains['newcenturytimes.com'] = [];
dubitableDomains['newsexaminer.net'] = []; //TODO JSR: should both of these be included?
dubitableDomains['newsexaminer.com'] = []; //TODO JSR: should both of these be included?
dubitableDomains['news-hound.com'] = [1];
dubitableDomains['newsbiscuit.com'] = [1];
dubitableDomains['newslo.com'] = [1,4];
dubitableDomains['newsmutiny.com'] = [1,4];
dubitableDomains['newswatch28'] = []; //TODO JSR: get full domain
dubitableDomains['newswatch33'] = []; //TODO JSR: get full domain
dubitableDomains['newswire-24.com'] = [];
dubitableDomains['nodisinfo.com'] = [];
dubitableDomains['now8news.com'] = [];
dubitableDomains['nowtheendbegins.com'] = [];
dubitableDomains['nowthisnews.com'] = [3]; //Also check for Facebook posts from this site
dubitableDomains['occupydemocrats.com'] = [3];
dubitableDomains['pakalertpress.com'] = [];
dubitableDomains['politicalblindspot.com'] = [];
dubitableDomains['politicalears.com'] = [];
dubitableDomains['politicalo.com'] = [1];
dubitableDomains['politicususa.com'] = [];
dubitableDomains['prntly.com'] = [1];
dubitableDomains['prisonplanet.com'] = [];
dubitableDomains['prisonplanet.tv'] = [];
dubitableDomains['projectveritas.com'] = [];
dubitableDomains['prouddemocrat.com'] = [3];
dubitableDomains['react365.com'] = [];
dubitableDomains['realfarmacy.com'] = [];
dubitableDomains['realnewsrightnow.com'] = [1,4];
dubitableDomains['redflagnews.com'] = [];
dubitableDomains['redstate.com'] = [1,4];
dubitableDomains['reductress.com'] = [4];
dubitableDomains['rilenews.com'] = [1,4];
dubitableDomains['satiratribune.com'] = [];
dubitableDomains['sprotspickle.com'] = [4];
dubitableDomains['theblaze.com'] = [];
dubitableDomains['borowitz-report'] = [4]; //TODO JSR: special search, since this is a section of the New Yorker
dubitableDomains['theonion.com'] = [4];
dubitableDomains['other98.com'] = [4];
// dubitableDomains['thereporterz'] = []; //TODO JSR: what's the correct domain here?
// dubitableDomains['The Stately Harold']; //TODO JSR: Facebook page - facebook.com/TheStatelyHarold
dubitableDomains['thedailysheeple.com'] = [];
dubitableDomains['thenewsnerd.com'] = [];
dubitableDomains['therundownlive.com'] = [];
dubitableDomains['theuspatriot.com'] = [];
dubitableDomains['truthfrequencyradio.com'] = [];
dubitableDomains['twitchy.com'] = [3];
dubitableDomains['unconfirmedsources.com'] = [];
dubitableDomains['unitedmediapublishing.com'] = [1];
dubitableDomains['usasupreme.com'] = [];
dubitableDomains['us.blastingnews.com'] = [];
dubitableDomains['usuncut.com'] = [3];
dubitableDomains['veteranstoday.com'] = [];
dubitableDomains['walkingtimes.com'] = [];
dubitableDomains['wakingupwisconsin.com'] = [];
dubitableDomains['winningdemocrats.com'] = [];
dubitableDomains['witscience.org'] = [];
dubitableDomains['wnd.com'] = [];
dubitableDomains['worldnewsdailyreport.com'] = [4];
dubitableDomains['worldtruth.tv'] = [];
dubitableDomains['zerohedge.com'] = [];

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

//function to find if tab's url is in dubitableDomains
function searchForTabUrlInDubitableDomains(tabDomain) {
  for (domain in dubitableDomains) {

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

      if (dubitableDomains[domain].length == 0) {
        alertString += "Uncategorized, but be wary!\n";
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

