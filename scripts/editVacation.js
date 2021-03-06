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

//MapPosition and zoom is needed to initialize the map, it will open up the map with values of currentVac, so map opens up on the right position
var MapPosition = {
    lat: currentVac.center.lat,
    lng: currentVac.center.lng
};
var zoom = currentVac.zoom;

// Assign pinObjects the pins from currentVac
// New pins can be added later and in the end the whole array can be saved again in currentVac.pins and currentUser.vacations.pins etc.
var pinObjects = currentVac.pins;

// if the currentVac.pins is empty, define pinObjects as an empty array, because you cannot push into an variable which is null
if (pinObjects == null) {
    var pinObjects = [];
}


//create function to save pins --> onclick set on element in HTML (util.js - initMap function, contentString)
function savePin() {

    //Make message field visible
    document.getElementById('message').style.visibility = "visible";
    //Make the toggle and the delete button visible
    document.getElementById("toggle").style.display = "inline";
    document.getElementById("deletePins").style.display = "inline";

    //Saves the name, comment, location type and pin coordinates entered by the user in the info window form
    var name = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;
    var type = document.getElementById('type').value;
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
        document.getElementById('message').style.visibility = "hidden";
        document.getElementById('name').value = "";
        document.getElementById('comment').value = "";
        document.getElementById('type').value = "viewpoint";
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

// Function start is onclick in HTML --> for initializing the map, can be found in the link to load the Google Maps API
function start() {

    // // if no pins are saved, initialize empty map
    // if (pinObjects == null || pinObjects.length == 0) {
    //     initMap();
    //     return;
    // }

    // display toggle and deletePins buttons
    document.getElementById("toggle").style.display = "inline";
    document.getElementById("deletePins").style.display = "inline";

    //add displaying of pins to the event queue
    //showPins function will be defined right below the setTimeout function
    setTimeout(function () {
        //Why do we need that (pinObjects) here?
        showPins(pinObjects);
    }, 0);

    initMap(MapPosition, zoom);
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
        //at this point, the retrievedMarkers array is still empty and the following is basically filling it in with new markers accroding to the
        //data retrieved previously from pins
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

//function to make changes in the infowindow of the pin
function changeInfoWindow(marker, name, comment, type) {

    //setting contenString variable to define pin pop up info window (e.g. Titel, Comment, Type)
    //data-object can carry data in the HTML, we want the carry the ID of the marker so we can recall it in the editPin() function
    var contentString = "<div id='formEdit' data-object='" + marker.id + "'><table>" +
        // it is filled out with the variables name & comment
        "<tr><td>Name:</td><td><input type='text'  id='nameEdit' value = '" + name + "'/> </td></tr>" +
        "<tr><td>Comment:</td><td><input type='text' id='commentEdit' value = '" + comment + "' /></td></tr><tr>" +
        "<td>Type:</td><td><select id='typeEdit'>" +
        // Here we use a ternary operator, which works similar to a if statement --> condition ? exprT : exprF
        //If condition can be converted to true (it is truthy), the operator returns the value of exprT; otherwise (when condition is falsy) it returns the value of exprF; source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
        //In this case: If type equals 'Viewpoint' this option should be selected, else empty string, so it is not selected
        "<option " + (type == 'Viewpoint' ? 'selected' : '') + " value='Viewpoint'>Viewpoint</option>" +
        "<option " + (type == 'Restaurant' ? 'selected' : '') + " value='Restaurant'>Restaurant</option>" +
        "<option " + (type == 'Bar' ? 'selected' : '') + " value='Bar'>Bar</option>" +
        "<option " + (type == 'Shopping' ? 'selected' : '') + " value='Shopping'>Shopping</option>" +
        "<option " + (type == 'Cafe' ? 'selected' : '') + " value='Cafe'>Cafe</option>" +
        "<option " + (type == 'Night' ? 'selected' : '') + " value='Night club'>Night club</option>" +
        "<option " + (type == 'Supermarket' ? 'selected' : '') + " value='Supermarket'>Supermarket</option>" +
        "<option " + (type == 'Museum' ? 'selected' : '') + " value='Museum'>Museum</option>" +
        "<option " + (type == 'Hotel' ? 'selected' : '') + " value='Hotel'>Hotel</option>" +
        "<option " + (type == 'Other' ? 'selected' : '') + " value='Other'>Other</option>" +
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
// Delete function is different here then in createVacations
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

        //We create a general function, which we will call later
        //arr --> array from which we want to delete the vacation
        function deleting(arr) {
            //Loop over array
            for (i = 0; i < arr.length; i++) {
                //Find the object in the array with the same id as the currentVac
                if (currentVac.id === arr[i].id) {
                    //assign this vacation to a local variable
                    var vac = arr[i];
                }
            }
            //Find the index of this vacation (vac) in the array and assign it to a local variable
            var index = arr.indexOf(vac);

            //Delete the vacation with the splice() method; source: https://www.w3schools.com/jsref/jsref_splice.asp 
            //index is our variable we just defined, so at position of index one element will be removed (index, 1)
            arr.splice(index, 1);
        }
        //We need to delete the vacation on all different places where we saved it
        //1. Delete vacation in currentUser.vacations
        deleting(currentUser.vacations);
        store(currentUser, "currentUser");
        //2. Delete vacation in the allVac array
        deleting(allVac);
        store(allVac, "allVac");
        //3. The changes of currentUser have to be updated in the users array(+ stored in localStorage), we do that with updateUser() function (defined in util.js)
        updateUser();
        //4. set currentVacation to undefined, maybe not so necessary, as we are re-directing and currentVac is removed from the localStorage anyway
        currentVac = undefined;
        //5. delete currentVac from localStorage
        localStorage.removeItem("currentVac");
        //redirect to myVacations.html
        window.location = "myVacations.html";
    }
}

