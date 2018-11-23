//inialize global variables, so they can be used in different parts of this JS

var map;
//all variables with marker --> have to do with the "pin"/the displaying on the map
var marker;
var infowindow;
var infowindowEdit;
var recentMarker;
var editedMarker;
// var changedPin;

//create as an empty array for later use
var retrievedMarkers = [];

//get the currently choosen vacation in currentVac variable from local storage with the keyName (always string)
var currentVac = getStorage("currentVac");

// initialize the Map
function initMap() {

    // set start location (where map opens) to stored values of currentVac, so map opens up on the right position
    var MapPosition = {
        lat: currentVac.center.lat,
        lng: currentVac.center.lng
    };

    // fill map variable with initialized map and set start location and zoom level to stored values of currentVac
    map = new google.maps.Map(document.getElementById('map'), {
        center: MapPosition,
        zoom: currentVac.zoom
    });

    //setting contenString variable to define pin pop up info window (e.g. Titel, Comment, Type)
    var contentString = "<div id='formCreate'><table>" +
        "<tr><td>Name:</td><td><input type='text'  id='nameCreate' /> </td></tr>" +
        "<tr><td>Comment:</td><td><input type='text' id='commentCreate' /></td></tr><tr>" +
        "<td>Type:</td><td><select id='typeCreate'>" +
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
        "<tr><td></td><td><input type='button' id='saveCreate' value='Save' onclick='savePin()' /></td></tr></table></div><div id='messageCreate' style='visibility: hidden;  '><b>Location saved!</b></div>";

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

// Assign pinObjects the pins from currentVac
// New pins can be added later and in the end the whole array can be saved again in currentVac.pins and currentUser.vacations.pins etc.
var pinObjects = currentVac.pins;

// if the currentVac.pins is empty, define pinObjects as an empty array, because you cannot push into an variable which is null
if (pinObjects == null) {
    var pinObjects = [];
}


//create function to save pins --> onclick set on element in HTML 
function savePin() {

    //Make message field visible
    document.getElementById('messageCreate').style.visibility = "visible";
    //Make the toggle and the delete button visible
    document.getElementById("toggle").style.display = "inline";
    document.getElementById("deletePins").style.display = "inline";

    //Saves the name, comment, location type and pin coordinates entered by the user in the info window form
    var name = document.getElementById('nameCreate').value;
    var comment = document.getElementById('commentCreate').value;
    var type = document.getElementById('typeCreate').value;
    //get the position (latitude and longtiude) with getPosition method from Google Maps API
    var latlng = marker.getPosition();
    //ID is generate by function defined in util.js
    var id = getNextId(pinObjects);
    //assign the generated ID also to the recentMarker object, we need to do that to recreate the marker later, when pin is changed
    recentMarker.id = id;

    // Push marker variable into the empty retrievedMarkers Array (we will need this later on)
    retrievedMarkers.push(marker);

    //push the new pin in the pinObjects array, new Pin makes it part of the Pin class
    pinObjects.push(new Pin(id, name, comment, type, latlng));

    // construct infowindow about new pin, we always need to refer to the marker here (because that is what is displayed on the map)
    updateInfoWindow(recentMarker, name, comment, type);

    // consrtuct editable infowindow about new pin, we always need to refer to the marker here (because that is what is displayed on the map)
    google.maps.event.addListener(recentMarker, 'click', function () {
        // alert(this.title);
        changeInfoWindow(recentMarker, name, comment, type);
    });

    // display info window and "LOCATION SAVED" for 1 second, then dismiss
    setTimeout(function () {
        // reset info window for next pin
        document.getElementById('messageCreate').style.visibility = "hidden";
        document.getElementById('nameCreate').value = "";
        document.getElementById('commentCreate').value = "";
        document.getElementById('typeCreate').value = "viewpoint";
        infowindow.close();

    }, 1000);

    //DATA IS SAVED and INFO WINDOW IS CLOSED
}


// create function to edit the pins --> onclick is set in HTML on button
function editPin() {
    //Make message field in infowindow visible 
    document.getElementById('messageEdit').style.visibility = "visible";

    //We need to update pinObjects with the changes the user typed in the infowindow + we need to display the changes on the map
    //1. we need to find out which pin is edited, we use the id for that. We retrieve the id from the HTML from the infowindow in changeInfoWindow() function
    //dataset works similar to localStorage, we create new local variable id and assign it the value of the dataset
    var id = formEdit.dataset['object'];

    //2. Create new local variables and assign them the HTML input values from the infowindow
    var name = document.getElementById('nameEdit').value;
    var comment = document.getElementById('commentEdit').value;
    var type = document.getElementById('typeEdit').value;

    //3. update changes in pinObjects array
    // Loop over array to find the object with the same id 
    for (i = 0; i < pinObjects.length; i++) {
        if (pinObjects[i].id == id) {
            pinObjects[i].name = name;
            pinObjects[i].comment = comment;
            pinObjects[i].type = type;
            //we need the latlng of the selected pin later
            var latlng = pinObjects[i].latlng;
        }
    }

    //4. we rebuild the marker on the map, we need to do it because we made changes in the infowindow
    editedMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: name,
        comment: comment,
        type: type,
        id: id

    });

    //5. we construct the infowindow for the rebuilded marker
    updateInfoWindow(editedMarker, name, comment, type);

    //6. assign a click listener to the editedMarker with the addListener()
    google.maps.event.addListener(editedMarker, 'click', function () {
        //construct the editable infowindow for the rebuilded marker
        //"this" is here important --> so the right infowindow will open up and not the one of the former editedMarker
        changeInfoWindow(this, name, comment, type);
    });

    //7. we reset and close the infowindow
    setTimeout(function () {
        // reset info window for next pin
        document.getElementById('messageEdit').style.visibility = "hidden";
        document.getElementById('nameEdit').value = "";
        document.getElementById('commentEdit').value = "";
        document.getElementById('typeEdit').value = "viewpoint";
        infowindowEdit.close();

    }, 1000);
}

// Function start is onclick in HTML --> for initializing the map
function start() {

    // if no pins are saved, initialize empty map
    if (pinObjects == null || pinObjects.length == 0) {
        initMap();
        return;
    }

    // display toggle and deletePins buttons
    document.getElementById("toggle").style.display = "inline";
    document.getElementById("deletePins").style.display = "inline";

    //add displaying of pins to the event queue
    //showPins function will be defined right below the setTimeout function
    setTimeout(function () {
        //Why do we need that (pinObjects) here?
        showPins(pinObjects);
    }, 0);

    initMap();
}

// display pins as markers on the map
function showPins(pinObjects) {

    //loop over pinObjects array and display them as a marker, one for each pin
    // iterate over stored pins (pinObjects) to get data about name, comment, etc. 
    for (var i = 0; i < pinObjects.length; i++) {

        var currentPin = pinObjects[i];
        var name = currentPin.name;
        var comment = currentPin.comment;
        var type = currentPin.type;
        var latlng = currentPin.latlng;
        var id = currentPin.id;

        // Now we take the collected data from above and create a marker on the map for every object in pinObjects
        // new google.maps.Marker --> is like a own class defined by Google Maps API
        retrievedMarkers[i] = new google.maps.Marker({
            position: latlng,
            map: map,
            title: name,
            comment: comment,
            type: type,
            id: id

        });

        //setMap() method (from Google API) displays the retrievedMarkers on the map
        retrievedMarkers[i].setMap(map);

        // construct info about every retrieved marker
        //function updateInfoWindow is defined below
        updateInfoWindow(retrievedMarkers[i], name, comment, type);

        //Add an listener to every retrievedPin, if someone click on pin function changeInfoWindow is called with values from the clicked marker
        //changeInfoWindow is defined below 
        google.maps.event.addListener(retrievedMarkers[i], 'click', function () {
            changeInfoWindow(this, this.title, this.comment, this.type);
        });
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

//function to make changes in the infowindow of the pin
function changeInfoWindow(marker, name, comment, type) {

    //setting contenString variable to define pin pop up info window (e.g. Titel, Comment, Type)
    //data-object can carry data in the HTML, we want the carry the ID of the marker so we can recall it in the editPin() function
    var contentString = "<div id='formEdit' data-object='" + marker.id + "'><table>" +
    // it is filled out with the variables name, comment, type
        "<tr><td>Name:</td><td><input type='text'  id='nameEdit' value = '" + name + "'/> </td></tr>" +
        "<tr><td>Comment:</td><td><input type='text' id='commentEdit' value = '" + comment + "' /></td></tr><tr>" +
        "<td>Type:</td><td><select id='typeEdit' value = '" + type + "'>" +
        // TODO: the right categoray should be selected"<td>Type:</td><td><select id='typeEdit' onchange = 'run()' >" +
        "<option value='Viewpoint'>Viewpoint</option>" +
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
        "<tr><td></td><td><input type='button' id='editPin' value='Save' onclick='editPin()'/></td></tr></table></div><div id='messageEdit' style='visibility: hidden;  '><b>Changes saved!</b></div>";

    // connect infowindow with the set contenString
    // this variable infowindow is only local 
    infowindowEdit = new google.maps.InfoWindow({
        content: contentString
    });

    // infowindow opens
    // here it is important that we use marker and not this!
    infowindowEdit.open(map, marker);
}
    
// Bind the button from HTML to a variable for later use
var deletePins = document.getElementById("deletePins");

//create onclick function on button to delete all Pins
deletePins.onclick = function () {
    //confirm opens up a pop up window do ask the following: 
    var con = confirm("Do you really want to remove all pins? If you have made other changes in the vacation and you have not clicked \"Save Changes\" the changes will be lost!")
    // If user clicks "OK" all pins are delted, if he clicks "Cancel" nothing happens
    if (con === true) {
        // If we want to delete all pins, pinObjects need to be set to empty array
        pinObjects = [];
        // If we want to delete all pins, currentVac.pins need to be set to empty array
        currentVac.pins = [];
        // If we want to delete all pins, retrievedMarkers need to be set to empty array
        retrievedMarkers = [];
        //store updated currentVac in local storage, store() function is defined in util.js
        store(currentVac, "currentVac");
        //page needs to be reloaded so markers are gone
        location.reload();
        return true;
    } else {
        return false;
    }
}

//set a variable entriesHidden to true --> to use it later for if statement
var entriesHidden = true;

// Bind the button from HTML to a variable for later use
var toggle = document.getElementById("toggle");

// Create onclick function on button to show all the infowindows of all markers 
toggle.onclick = function () {

    //set event as an empty string
    var event = "";

    // If entries are not shown, we will have the event mouseover to show all the markers.
    if (entriesHidden)
        event = "mouseover";
    // If entries are shown, we will have the event mouseout to hide all markers.
    else
        event = "mouseout";

    // Below the function checks ALL the markers to show/hide them
    for (var i = 0; i < retrievedMarkers.length; i++) {
        google.maps.event.trigger(retrievedMarkers[i], event);

    }

}

//function getStorage() is defined in util.js
//get the all vacations array from local storage with the keyName (always string), to update data later
var allVac = getStorage("allVac");
//get the users array from local storage with the keyName (always string), to update data later
var users = getStorage("users");
//get the currently logged in User from local storage with the keyName (always string), to update data later
var currentUser = getStorage("currentUser");

//fill input fields with the vacation information
document.getElementById("vacTitle").value = currentVac.title;
document.getElementById("vacDescription").value = currentVac.description;
document.getElementById("tags").value = currentVac.tags;
// check if if isPublished is true --> if yes, checkbox publish needs to be checked, else not
if (currentVac.isPublished === true) {
    document.getElementById("publish").checked = true;
} else {
    document.getElementById("publish").checked = false;
}

// Bind the button from HTML to a variable for later use
var saveChanges = document.getElementById("saveChanges");

//create onclick function on button to save changes a user made in vacation
saveChanges.onclick = function () {
    //upadte the properties of the currentVac with input
    currentVac.title = document.getElementById("vacTitle").value;
    //If there is no title typed in, alert a message, so the user alwys has to put in a title
    if (currentVac.title == "") {
        alert("Please type in a title!");
    } else {
        //get the center and the zoom with Google Maps API methods
        currentVac.center = map.getCenter();
        currentVac.zoom = map.getZoom();
        //get input from HTML 
        currentVac.description = document.getElementById("vacDescription").value;
        currentVac.tags = document.getElementById("tags").value;
        // check if the check box is clicked, if yes --> var isPublished is true
        if (document.getElementById("publish").checked == true) {
            currentVac.isPublished = true;
        } else {
            currentVac.isPublished = false;
        }

        // update currentVac.pins by assign pinObjects to it
        currentVac.pins = pinObjects;

        //update changes of currentVac in allVac array
        // Loop over allVac array to find the object with the same id and set it to currentVac
        for (i = 0; i < allVac.length; i++) {
            if (currentVac.id === allVac[i].id) {
                allVac[i] = currentVac;
            }
        }

        //update changes of currentVac in currentUser.vacations array
        // Loop over currentUser.vacations array to find the object with the same id and set it to currentVac
        for (i = 0; i < currentUser.vacations.length; i++) {
            if (currentVac.id === currentUser.vacations[i].id) {
                currentUser.vacations[i] = currentVac;
            }
        }

        //update changes of currentUser in users array
        // Loop over users array to find the object with the same id and set it to currentUser
        for (i = 0; i < users.length; i++) {
            if (currentUser.id === users[i].id) {
                users[i] = currentUser;
            }
        }

        //store everything in localStorge with store() function (defined in util.js)
        store(currentVac, "currentVac");
        store(allVac, "allVac");
        store(currentUser, "currentUser");
        store(users, "users");

        //alert a message for the user
        alert("Your changes have been saved! You can review it under My Vacations!")

        //redirect to myVacations.html
        window.location = "myVacations.html";
        //Return true to jump out of function
        return true;
    }
}

// Bind the button from HTML to a variable for later use
var deleteVac = document.getElementById("deleteVac");
//create onclick function on button, which deltes a vacation
deleteVac.onclick = function () {
    var con = confirm("Do you really want to delete this vacation? If you click \"OK\" there is no way back!")
    // If user clicks "OK" vacation is delted, if he clicks "Cancel" nothing happens
    if (con === true) {

        //We need to delete the vacation on all different places where we saved it
        //1. Delete vacation in currentUser.vacations
        //Loop over currentUser.vacations array 
        for (i = 0; i < currentUser.vacations.length; i++) {
            //Find the object in the currentUser.vacations array with the same id as the currentVac
            if (currentVac.id === currentUser.vacations[i].id) {
                //assign this vacation to a local variable
                var vac = currentUser.vacations[i];
            }
        }
        //Find the index of this vacation (vac) in the currentUser.vacations array and assign it to a local variable
        var index = currentUser.vacations.indexOf(vac);

        //Delete the vacation with the splice() method
        //index is our variable we just defined, so at position of index one element will be removed (index, 1)
        currentUser.vacations.splice(index, 1);
       
        // we store currentUser in localStorage with store() function (defined in util.js)
        store(currentUser, "currentUser");
    }

    //2. Delete vacation in the allVac array
    //Loop over allVac array 
    for (i = 0; i < allVac.length; i++) {
        //Find the object in the allVac array with the same id as the currentVac
        if (currentVac.id === allVac[i].id) {
            //assign this vacation to a local variable
            var vac = allVac[i];
        }
    }
    //Find the index of this vacation (vac) in the allVac array and assign it to a local variable
    var index = currentUser.vacations.indexOf(vac);
    // var index = findIndex(vac);

    //Delete the vacation with the splice() method
    //index is our variable we just defined, so at position of index one element will be removed (index, 1)
    allVac.splice(index, 1);
   
    // store in allVac in localStorage in localStorage with store() function (defined in util.js)
    store(allVac, "allVac");

    //3. The changes of currentUser have to be updated in the users array

    // Loop over users array to find the object with the same id and set it to currentUser
    for (i = 0; i < users.length; i++) {
        if (currentUser.id === users[i].id) {
            users[i] = currentUser;
    
            //Store users array in localStorage with store() function (defined in util.js)
            store(users, "users");
        }
    }
    //4. set currentVacation to undefined
    currentVac = undefined;
    //5. delete currentVac from localStorage
    localStorage.removeItem("currentVac");
    //redirect to myVacations.html
    window.location = "myVacations.html";
}

// Bind the button from HTML to a variable for later use    
var home = document.getElementById("home");
//create onclick function on home button, which redirects user to homePage.html
home.onclick = function () {
    //redirecting to log out page
    window.location = "homePage.html";
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var myVac = document.getElementById("myVac");
//create onclick function on myVac button, which redirects user to myVacation.html
myVac.onclick = function () {
    //redirecting to myVacation page
    window.location = "myVacations.html";
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var logout = document.getElementById("logout");
//create onclick function on logout button, which redirects user to logout.html
logout.onclick = function () {
    //set variable isLoggedIn to false
    currentUser.isLoggedIn = false;

    //redirecting to log out page
    window.location = "logout.html";

    //Return true to jump out of the function, since we now have all we need.
    return true;
}