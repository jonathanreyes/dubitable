# dubitable
Opera/Chrome extension that tells the user when he or she visits a dubitable site (one that provides fake, misleading, or primarily satirical news) or a credible source.

## Installation
### Chrome
Go to Window > Extensions.  Drag the latest .crx ([direct link](https://github.com/jonathanreyes/dubitable/blob/master/Chrome/dubitable_v0_7.crx?raw=true)) into the page that appears.

### Opera
Go to Menu > Extension > Manage Extensions (Ctrl + Shift + E). Drage the latest. nex ([direct link](https://github.com/jonathanreyes/dubitable/blob/master/Opera/dubitable_v0_7.nex?raw=true)) into the page that appears.

## Version history
### v0.1: <br />
Baseline functionality. Creates an alert window with the site's associated categories and their explanations. "Database" is manually copied from source material (see Credits below).

### v0.2: <br />
Started to implement special searches for pages like the Borowitz Report

### v0.6: <br />
Added the 'D' Icon: <br />
  -Turns green when page is credible <br />
  -Turns red when page is dubitable <br />
  -Turns yellow when page has not been categorized as credible or dubitable <br />
  -Turns grey on new tab startpages <br />

### v0.7 <br />
Code cleanup: got rid of storage permissions <br />
Setup an alarm to get lastest list of credible/dubitable domains from OpenSources.co on startup and then every 24 hours <br />


## To-Do's: <br />
* Create a nicer icon
* Update the popup
  * Options window will highlight color-coded dubitability categories and a summarizing title
  * User can click/hover to see explanation of each category
* Apply loose rules from the source material
  * e.g. provide a warning when domain ends in ".com.co"
* Figure out how to get extension working on dubitable facebook pages

## Credits: <br />
v0.1: I took the list of dubitable sites and their classifications from Melissa Zimdars' PDF [here](https://d279m997dpfwgl.cloudfront.net/wp/2016/11/Resource-False-Misleading-Clickbait-y-and-Satirical-“News”-Sources-1.pdf). <br />
v0.6 and beyond: That data is now coming directly from OpenSources.co

The extractDomain function was adapted from [this](https://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string) stackoverflow page.
