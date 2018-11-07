//inialize map 
var map;
// var pin;
var infowindow;
var allMarkers = [];

//get the currently choosen vacation in currentVac variable from local storage with the keyName (always string)
var currentVac = getStorage("currentVac");
// var recentMarker;


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

        //setting contenString variable to define pin pop up info window (e.g. Titel, Comment, Type)
        var contentString = "<div id='form'><table>" +
        "<tr><td>Name:</td><td><input type='text'  id='name' /> </td></tr>" +
        "<tr><td>Comment:</td><td><input type='text' id='comment' /></td></tr><tr>" +
        "<td>Type:</td><td><select id='type'>" +
            "<option value='Viewpoint' SELECTED>Viewpoint</option>" +
            "<option value='Restaurant'>Restaurant</option>" +
            "<option value='Bar'>Bar</option>" +
            "<option value='Shopping'>Shopping</option>" +
            "<option value='Cafe'>Cafe</option>" +
            "<option value='Night club'>Night club</option>" +
            "<option value='Supermarket'>Supermarket</option>" +
            "<option value='Museum'>Museum</option>" +
            "<option value='Hotel'>Hotel</option>" +
            "<option value='Other'>Other</option>" +
            "</select> </td></tr>" +
            "<tr><td></td><td><input type='button' id='save' value='Save' onclick='savePin()' /></td></tr></table></div><div id='message' style='visibility: hidden;  '><b>Location saved!</b></div>";

            // connect infowindow with the set contenString
            infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            // //assign a click listener to the map with the addListener() callback function that creates pin when the user clicks the map
            // google.maps.event.addListener(map, 'click', function(event) {
            //     pin = new google.maps.Marker({
            //         position: event.latLng,
            //         map: map
            //     });

            //     // displays an info window when the user created pin
            //     infowindow.open(map, pin);

            //     // set current marker variable to `normal´ marker variable 
            //     recentMarker = pin;

            //     // now, the marker variable will be pushed into the empty allMarkers Array (we will need this later on)
            //     allMarkers.push(pin);

        }
        // Now, we need a variable to display the retrieve the data from the local storage 
        var retrievedPins = [];

            // callback function to retrieve pins
             // it has to have this name --> Has to do with google I think
             function start() {

            //use getStorage function to get pins from local storage
            //assging it to pinObjects variable --> it is easier if it has always the same name, because it is the same thing
            var pins = currentVac.pins;

            // if no pins are saved, initialize empty map
            if (pins == null || pins == 0) {
                initMap();
                return;
            }

            // display button to show/hide all pins
            document.getElementById("toggle").style.display = "inline";
            
           
        //loop over existing array and display them as a pin, each for one pin
            // iterate over restored pins (object) to get data about name, comment, etc. 
            for (var i = 0; i < pins.length; i++) {

                var currentPin = pins[i];
                var name = currentPin.name;
                var comment = currentPin.comment;
                var type = currentPin.type;
                var latlng = currentPin.latlng;

        // Now we take the collected data from above and create a pin (var retrievedPins) to display them later
                // In pinObjects there are not as many data saved as we need to display them (I think)
                // new google.maps.Marker --> is like a own class defined by google
                retrievedPins[i] = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: name,
                    comment: comment,
                    type: type
                });
            }
            
            // add displaying of pins to the event queue
            //showPins function will be defined right after the setTimeout function
            setTimeout(function() {
                //Why do we need that (pinObjects) here?
                showPins(pins);
            }, 0);

            initMap();
        }
    
        // display pins retrieved from the localStorage --> e.g. when page is refreshed or opened
        //Why do we need that (pinObjects) here?
        function showPins(pins) {
            // value of i is passed into a closure 
            for (var i = 0; i < retrievedPins.length; i++) {
                (function(index) {

                    //set Map for all Objects in the retrievedPins array (here we need those more information we do not have in pinObjects)
                    allMarkers.push(retrievedPins[i]);
                    retrievedPins[i].setMap(map);
                    var name = pins[i].name;
                    var comment = pins[i].comment;
                    var type = pins[i].type;

                    // construct info about every retrieved marker
                    //updateInfoWindow is defined below
                    updateInfoWindow(retrievedPins[i], name, comment, type);

                    //What does the i mean? --> if I delete it pins are not shown anymore
                })(i);
            }
        }

        //call function
        showPins();


        // // update info window of the passed marker with its respecting data
        // function updateInfoWindow(pin, name, comment, type) {

        //     // Now we have to rebuild an infowindow (name, comment, type)
        //     var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

        //     //updating info window
        //     var infowindow = new google.maps.InfoWindow({
        //         content: contentString
        //     });

        //     // mouseover and mouseout event listeners
        //     pin.addListener('mouseover', function() {
        //         infowindow.open(map, this);
        //     });

        //     pin.addListener('mouseout', function() {
        //         infowindow.close();
        //     });

        // }

        //set a variable entriesHidden to true --> to use it later for if statement
        var entriesHidden = true;

        // Bind the button from HTML to a variable for later use
        var toggle = document.getElementById("toggle");

        // With the toggle function we show all the markers with a click on the button
        toggle.onclick = function() {

            //set event as an empty string
            var event = "";

            // If entries are not shown, we will have the event mouseover to show all the markers.
            if (entriesHidden)
                event = "mouseover";
            // If entries are shown, we will have the event mouseout to hide all markers.
            else
                event = "mouseout";

            // Below the function checks ALL the markers to show/hide them
            for (var i = 0; i < allMarkers.length; i++) {
                google.maps.event.trigger(allMarkers[i], event);
            
            }

        }




// //get the currently choosen vacation in currentVac variable from local storage with the keyName (always string)
// var currentVac = getStorage("currentVac");
//get the all vacations array from local storage with the keyName (always string), to update Data later
var allVac = getStorage("allVac");
//get the users array from local storage with the keyName (always string), to update Data later
var users = getStorage("users");
//get the currently logged in User from local storage with the keyName (always string), to update Data later
var currentUser = getStorage("currentUser");

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
tagsSpan.innerText = "";

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
    