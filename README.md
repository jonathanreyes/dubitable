# dubitable
Opera/Chrome extension that provides a warning when the user visits a site that provides fake, misleading, or primarily satirical news.

## Version history
### v0.1: <br />
Baseline functionality. Creates an alert window with the site's associated categories and their explanations. "Database" is manually copied from source material (see Credits below).

### v0.2: <br />
Started to implement special searches for pages like the Borowitz Report

### v0.6: <br />
Added the 'D' Icon:
  -Turns green when page is credible
  -Turns red when page is dubitable
  -Turns yellow when page has not been categorized as credible or dubitable
  -Turns grey on new tab startpages

## To-Do's: <br />
* Create an icon
  * One for non-dubitable sites, plus a red-background one for dubitable sites
* Replace alert window with options window
  * When icon is red (dubitable site visited), user can click it to open options window
  * Options window will highlight color-coded dubitability categories and a summarizing title
  * User can click/hover to see explanation of each category
* Figure out a way to pull new credible/dubitable domains list from opensources.co GitHub to keep our list synced
* Apply loose rules from the source material
  * e.g. provide a warning when domain ends in ".com.co"
* Figure out how to get extension working on dubitable facebook pages

## Credits: <br />
I took the list of dubitable sites and their classifications from Melissa Zimdars' PDF [here](https://d279m997dpfwgl.cloudfront.net/wp/2016/11/Resource-False-Misleading-Clickbait-y-and-Satirical-“News”-Sources-1.pdf).

The extractDomain function was adapted from [this](https://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string) stackoverflow page.