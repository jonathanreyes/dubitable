# dubitable
Opera/Chrome extension that provides a warning when the user visits a site that provides fake, misleading, or primarily satirical news.

## v0.1: <br />##
Baseline functionality. Creates an alert window with the site's associated categories and their explanations. "Database" is manually copied from source material (see Credits below).

## To-Do's: <br /> ##
* Create an icon
  * One for non-dubitable sites, plus a red-background one for dubitable sites
* Replace alert window with options window
  * When icon is red (dubitable site visited), user can click it to open options window
  * Options window will highlight color-coded dubitability categories and a summarizing title
  * User can click/hover to see explanation of each category
* Replace dubitableDomains map with a database
  * Extension itself becomes more lightweight
  * Easier to update as more dubitable sites are found & classified