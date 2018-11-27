# Visit Rome In Three Days App

This is a single page application, which lists and shows on a map (using Google Maps) the most important monuments of Rome to visit (the ones I think you could visit if you are staying three days).

## How to install

To start the application you have to install npm and rum from the command line, in the folder of the application: `npm run build`.

Then you want to serve the build with a static server. So you have to install the npm package to serve with `npm install -g serve` and then serve the build with `serve -s build`.

## How to use

You can filter the monuments by name, using the search bar. It will filter both the list and the markers on the map.
Clicking on a marker on the map, will show a label with little information about that monument.

All the informations are retrieved from Wikipedia.
