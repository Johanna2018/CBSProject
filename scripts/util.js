//the functionality of this script is to save functions in here we will need in different parts of the  and in different htmls
//this script needs to be linked to every html in which we need those funczions
//funtions which are in this script can so be used on everypoint in the project

//function to store something in the localStorage, y = value (object/array), keyName = name of key which you assign value to and save it in localStorage
//keyName --> you need it to recall it later in getStorage
function store(y, keyName) {
    var stringified = JSON.stringify(y);
    localStorage.setItem(String(keyName), stringified);
}

//function to get data which are stored in localStorage, keyName = name of key which you assign value to and save it in localStorage
//keyName --> need to remember from when you stored it to local storage
function getStorage(keyName) {
    var parsed = JSON.parse(localStorage.getItem(keyName));
    return parsed;
}

//function to generate the next ID in an array
//arr --> array for which objects ID should be created
function getNextId(arr) {
    // set variable max to 0
    var max = 0;
    // Loop over array 
    // Make sure when calling this function that the array filled with data 
    for (i = 0; i < arr.length; i++) {
        // Find the highest ID and add one
        // Has to be >= max, because the allVac array could be 0, if non vacation yet
        if (arr[i].id >= max) {
            // Set max to one more than biggest existing id
            max = arr[i].id + 1;
        }

    }
    //Return the max --> max is the generate ID
    return max;
}

//function to initialize the map on different parts of the program (e.g. editVacation, createVacation)
// initialize the Map
function initMap(position, zoom) {


    // fill map variable with initialized map and set start location and zoom level
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: zoom
    });

    //setting contentString variable to define pin pop up info window (e.g. Titel, Comment, Type)
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
        "<tr><td></td><td><input type='button' id='save' onclick='savePin()' value='Save'/></td></tr></table></div><div id='message' style='visibility: hidden;  '><b>Location saved!</b></div>";

    // connect infowindow (defined global) with the set contenString
    //new google.maps.InfoWindow --> is like a own class defined by Google Maps API
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    //assign a click listener to the map with the addListener() callback function that creates marker when the user clicks the map
    google.maps.event.addListener(map, 'click', function (event) {
        // new google.maps.Marker --> is like a own class defined by Google Maps API
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });

        // displays an info window when the user created marker
        infowindow.open(map, marker);

        // set current marker variable to `normal´ marker variable 
        recentMarker = marker;

    });

}

//Function that initializes map and re-creates markers of a particular vacation
function retrieveMapPositionAndPins(vacation) {
    var MapPosition = {
        lat: vacation.center.lat,
        lng: vacation.center.lng
    };

    // Fill map variable with initialized map and set start location and zoom level
    //this basically says fill the map element in the html with a map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: MapPosition,
        zoom: vacation.zoom
    });

    //then we loop over the pins of the particular map and "set"/"create" new markers on this map accordingly
    markers = [];
    for (var i = 0; i < vacation.pins.length; i++) {
        var marker = vacation.pins[i];
        markers[i] = new google.maps.Marker({
            position: marker.latlng,
            map: map,
            title: marker.name,
            comment: marker.comment,
            type: marker.type
        });

        updateInfoWindow(markers[i], marker.name, marker.comment, marker.type);
    }
}

// function to update info window of the passed marker with its respecting data
function updateInfoWindow(marker, name, comment, type) {

    // Now we have to rebuild an infowindow, it is filled out with the variables name, comment, type
    var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

    //updating info window
    // this variable infowindow is only local 
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // mouseover and mouseout event listeners
    marker.addListener('mouseover', function () {
        infowindow.open(map, this);
    });

    marker.addListener('mouseout', function () {
        infowindow.close();
    });

}


// Function for toggle button
// With the toggle function we show all the markers 
function toggle(arrMarkers) {
    //set a variable entriesHidden to true --> to use it later for if statement
    var entriesHidden = true;

    //set event as an empty string
    var event = "";

    // If entries are not shown, we will have the event mouseover to show all the markers.
    if (entriesHidden)
        //We use "mouseover" --> to simulate that a mouse is over all of the markers to show all the infowindows
        event = "mouseover";
    // If entries are shown, we will have the event mouseout to hide all markers again
    else
        event = "mouseout";

    // Below the function checks ALL the markers to show/hide them
    for (var i = 0; i < arrMarkers.length; i++) {
        google.maps.event.trigger(arrMarkers[i], event);

    }

}

//function that finds the vacation by ID in order to be used multiple places, 
//vacationList in this case is the array we pass it when currently working with it, 
//mostly either publishedVacation or AllVacations
function findVacationById(vacationId, vacationList) {
    return vacationList.find(function (vacation) {
        //What the next line esentially does, is following
        // if vacation.id == vacationId
        //     return vacation - and store the value of that particular vacation in the vacationToDisplay variable later
        return vacation.id == vacationId;
    });
}

//The function that will delete the map, resp set the inner html to blank so nothing displays
function deleteMap() {
    var map = document.getElementById('map');
    var mapElement = document.getElementById('rating');
    mapElement.innerHTML = '';
    map.innerHTML = '';
}

//Function for Home button
//Redirects user to homePage.html
function home() {
    //redirecting to log out page
    window.location = "homePage.html";
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

//Function for My Vacations button
//Redirects user to myVacations.html    
function myVac() {
    //redirecting to log out page
    window.location = "myVacations.html";
    //Return true to jump out of the function, since we now have all we need
    return true;
}

//Function for Logout button
//Redirects user to logout.html   
function logout() {
    //set variable isLoggedIn to false
    currentUser.isLoggedIn = false;

    //redirecting to log out page
    window.location = "logout.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}

//Function for Profile button
//Redirects user to profile.html  
function profile() {
    //redirecting to profile page
    window.location = "profile.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}

//Function for Discover button
//Redirects user to discover.html
function discover() {
    //redirecting to profile page
    window.location = "discover.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}

//Function to update currentUser data in users array
function updateUser() {
    // Loop over users array to find the object with the same id and set it to currentUser
    for (i = 0; i < users.length; i++) {
        if (currentUser.id === users[i].id) {
            users[i] = currentUser;
        }
    }

    //store updated users array in local storage, make sure keyName is always String!
    //keyName --> you need it to recall it later!
    store(users, "users");
}
