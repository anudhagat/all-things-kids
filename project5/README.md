How to Download
----------------
Go to this website https://github.com/anudhagat/all-things-kids.
On the right hand side in the bottom of the page, find and click on the Download Zip button.
This will copy a zipped version onto your local computer. Unzip the files and open the file
project5/index.html in your browser.

How to Use
-----------
This App gives a map of the Evergreen, San Jose neighborhood. The places marked on the map are
places that would interest kids and parents of the Evergreen area. At the top of the page is a
Search input box. Below the Search box is a list of places as well as a map of the neighborhood.
The letters entered in the Search input box filters the list of places in the list and the map.

When you click on a place in the list, the place on the map animates with a bounce and an information
window pops up. This also happens when you click on the map marker in the map. The information window
has a Yelp button, which brings up a dialog box with information from the Yelp website about this place.

Comments about index.html
-------------------------
This file is separated into two parts: navigation bar and main page.
The navigation bar has the Search input box and Type Dropdown menu. The Main page has a column with the
list view of places and a column with a map view displaying map markers for the places in the list view.

This file uses bootstrap for layout. It also uses knockout to update data in the list and map views, using
the user's input from the input box and the dropdown (which are knockout observables).

Comments about app.js
---------------------
This file uses KnockoutJS to separate model (data) from view (html).

The data is stored in a variable called model. This is a array of objects which stores information
about the places of interest in my neighborhood. The layer that separates the view from the model is a function
called viewModel. The viewModel declares and initializes all the Knockout observables. It also has a function
called updatePlaces that is called with the user clicks on the input box or the dropdown.

Other important functions in the this file are clickCallback and yelpSearch. The function clickCallback is called
when either the place is clicked from the list view or its map marker is clicked in the map view. The function
yelpSearch does the ajax call to the Yelp API and retrieves and displays data from Yelp.

Bonus Feature:
--------------
Next to the Search input box is a Type Dropdown menu. This dropdown is populated with the types of places,
eg. Parks, Schools. When a type is selected, the list and the map views update to show places of that type.
You can also combine the search and type functionality to further filter your searches.

Testing:
--------
I have tested this App with no internet connection (wifi turned off). I alert the user using an alert window of
this error. Also, I edited the hosts file to disable yelp api's. This throws an error correctly with another alert
message.

