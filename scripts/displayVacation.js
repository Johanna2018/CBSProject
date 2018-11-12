//inialize map 
var map;
var infowindow;
// We need a variable to display the retrieve the data from the local storage for later.
var retrievedPins = [];
// var allMarkers = [];
// var pin;
// var recentMarker;

//get the currently choosen vacation in currentVac variable from local storage with the keyName (always string)
var currentVac = getStorage("currentVac");

    // initialize the Map
    function initMap() {

        // set start location variable --> location where map opens at first
        var MapPosition = {
                lat: 25.048921,
                lng: 9.553599
            };

            // fill map variable with initialized map and set start location and zoom level
            map = new google.maps.Map(document.getElementById('map'), {
                center: MapPosition,
                zoom: 2
            });
        }
        

            // callback function
            // call initMap(); so map is initialized + call showPins(); so pins will be shown on map 
             // it has to have this name --> Has to do with google I think
             function start() {

            // We create the variable pins and assign the array from currentVac.pins to it
            var pins = currentVac.pins;

            // if no pins are saved, initialize empty map
            if (pins == null || pins == 0) {
                initMap();
                return;
            }

            // display button to show all pins
            document.getElementById("toggle").style.display = "inline";
    
            
            // add displaying of pins to the event queue
            //showPins function will be defined right after the setTimeout function
            setTimeout(function() {
                showPins(pins);
            // 0 --> 0 seconds
            }, 0);

            initMap();
        }
    
        //Define the function showPins we already call in the start() function
        function showPins(pins) {

            //loop over existing array and display them as a pin, each for one pin
            // iterate over restored pins (object) to get data about name, comment, etc. 
            for (var i = 0; i < pins.length; i++) {
            
            //we assign the variable currentPin each time we loop over pins array to the object with index i in the pins array
                var currentPin = pins[i];
                var name = currentPin.name;
                var comment = currentPin.comment;
                var type = currentPin.type;
                var latlng = currentPin.latlng;

            // Now we take the collected data from above and create a pin (var retrievedPins) to display them later
            // new google.maps.Marker --> is like a own class defined by google
            // Here we are recreating the pin (red point) on the map
                retrievedPins[i] = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: name,
                    comment: comment,
                    type: type
                    
                });

                //what is setMap doing exactly?
                retrievedPins[i].setMap(map);

                // construct info about every retrieved pin
                //updateInfoWindow is defined below
                updateInfoWindow(retrievedPins[i], name, comment, type);
          
            }
        }

        // update info window of the passed pin with its respecting data
        function updateInfoWindow(pin, name, comment, type) {

            // Now we have to rebuild an infowindow (name, comment, type)
            var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

            //updating info window
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            // mouseover and mouseout event listeners
            pin.addListener('mouseover', function() {
                infowindow.open(map, this);
            });

            pin.addListener('mouseout', function() {
                infowindow.close();
            });

        }

        //set a variable entriesHidden to true --> to use it later for if statement
        var entriesHidden = true;

        // Bind the button from HTML to a variable for later use
        var toggle = document.getElementById("toggle");

        // With the toggle function we show all the markers with a click on the button
        toggle.onclick = function() {

            //set event as an empty string, to use it later
            var event = "";

            // If entries are not shown, we will have the event mouseover to show all the markers.
            if (entriesHidden)
                event = "mouseover";
            // If entries are shown, we will have the event mouseout to hide all markers.
            else
                event = "mouseout";

            for (var i = 0; i < retrievedPins.length; i++) {
                google.maps.event.trigger(retrievedPins[i], event);
            
            }

        }

// Bind spans from HTML to variables --> later we need it to manipulate the span elements in HTML later
var titleSpan = document.getElementById("vacTitle");
var descriptionSpan =  document.getElementById("vacDescription");
var publishSpan = document.getElementById("publish");
var tagsSpan = document.getElementById("tags");

//Bind the button from HTML to a variable for later use
var editVac = document.getElementById("editVac");

titleSpan.innerText = currentVac.title;
descriptionSpan.innerText =  currentVac.description;

//implement the function from silvia here! We do not know how many tags a vacation has
tagsSpan.innerText = currentVac.tags;

//if the vacation is published 
if (currentVac.isPublished === true){
    publishSpan.innerText =  "yes";
}else {
    publishSpan.innerText =  "no";
}

// Bind the button from HTML to a variable for later use    
var editVac = document.getElementById("editVac");
//make a function to save to home, when button is clicked
editVac.onclick = function(){
    //redirecting to log out page
    window.location = "editVacation.html"; 
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var home = document.getElementById("home");
//make a function to save to home, when button is clicked
home.onclick = function(){
    //redirecting to log out page
    window.location = "homePage.html"; 
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var myVac = document.getElementById("myVac");
//make a function to save to home, when button is clicked
myVac.onclick = function(){
    //redirecting to log out page
    window.location = "myVacations.html"; 
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var logout = document.getElementById("logout");
//make a function to save to logout, when button is clicked
logout.onclick = function(){
    //set variable isLoggedIn to false
    currentUser.isLoggedIn = false;
    
    //redirecting to log out page
    window.location = "logout.html"; 
  
    //Return true to jump out of the function, since we now have all we need.
    return true;
}
    