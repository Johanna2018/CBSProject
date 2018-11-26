//inialize global variables, so they can be used in different parts of this JS

var map;
//all variables with marker --> have to do with the displaying of th "pin" on the map
var marker;
var infowindow;
//creating allMarkers as an empty array for later use
var allMarkers = [];
var recentMarker;
// creating pinObjects as an empty array for later use
var pinObjects = [];
// var MapPosition = {
//             lat: 25.048921, 
//             lng: 9.553599
//         };
// var zoom = 2


// //initialize Map
// initMap(MapPosition, zoom);


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
        "<tr><td></td><td><input type='button' id='save' value='Save' onclick='savePin()' /></td></tr></table></div><div id='message' style='visibility: hidden;  '><b>Location saved!</b></div>";

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


//Now we safe the data of the marker in a pin object

//onlcik function --> onclick set on element in HTML 
function savePin() {

    //Make message field visible
    document.getElementById('message').style.visibility = "visible";
    //Make the toggle and the delete button visible
    document.getElementById("toggle").style.display = "inline";
    document.getElementById("deletePins").style.display = "inline";

    //Saves the name, comment, location type, and pin coordinates entered by the user in the info window form
    var name = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;
    var type = document.getElementById('type').value;
    //get the position (latitude and longtiude) with getPosition method from Google Maps API
    var latlng = marker.getPosition();
//ID is generate by function defined in util.js
    var id = getNextId(pinObjects);

    // now, the marker will be pushed into the empty allMarkers Array (we will need this later on)
    allMarkers.push(marker);

    // construct info about recentMarker
    updateInfoWindow(recentMarker, name, comment, type);

    //push the new pin in the pinObjects array, new Pin makes it part of the Pin class
    pinObjects.push(new Pin(id, name, comment, type, latlng));

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

// savePin(allMarkers, pinObjects);

// Function start is onclick in HTML --> initializing the map
function start() {
    initMap();
}

// update info window of the passed marker with its respecting data
function updateInfoWindow(marker, name, comment, type) {

    // Now we have to rebuild an infowindow (name, comment, type)
    var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

    //updating info window, here we define the variable infowindow local!
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

// Bind the button from HTML to a variable for later use
var deletePins = document.getElementById("deletePins");

// Create a onclick function on variable (button)
// Delete function is different here then in editVacations
deletePins.onclick = function () {
    //Opens up a pop up window do ask the following.. 
    var con = confirm("Do you really want to remove all pins? There is no way back if you click \"OK\"! All other changes will be lost, too!")
    // If user clicks "OK" all pins are delted, if he clicks "Cancel" nothing happens
    if (con === true) {
        //pinObjects is set to an empty array and by that all pins are overwritten
        pinObjects = [];
        //Page needs to be refreshed otherwise pins would stay on there
        location.reload();
        return true;
    } else {
        return false;
    }
}

//get the data of users, currentUser and allVac from localStorage and assign it to variables (global)
//function getStorage() is defined in util.js
//users --> array of all existing users
var users = getStorage("users");
var currentUser = getStorage("currentUser");
//allVac array of all existing vacations
var allVac = getStorage("allVac");

// if the localStorage of allVac is empty we define it as a new variable as empty array, because you cannot push into an variable which is null
if (allVac === null) {
    var allVac = [];
}

// Bind the button from HTML to a variable for later use
var saveVac = document.getElementById("saveVac");

// Create onclick function on variable (button)
saveVac.onclick = function () {

    // generated ID with getNextId function (in util.js defined)
    var id = getNextId(allVac);
    //create new variable pins and assign it pinObjects, for later use
    var pins = pinObjects;
    // Bind the input fields and get the value
    var title = document.getElementById("vacTitle").value;
    //If there is no title typed in or no pins on the map, alert a message, so the user always has to put in a title + pin
    if (title == "" || pins.length == 0) {
        alert("To save your vacation needs a title and at least 1 pin!");
    } else {
    var description = document.getElementById("vacDescription").value;
    var isSelected = false;
    //get input from tag input in HTML, split() method splits the input after whatever you put in the quotation marks
    //makes automatically an array out of it
    var tags = document.getElementById("tags").value.split(",");
    var isPublished = false;
    // check if the check box is clicked, if yes --> var isPublished is true
    if (document.getElementById("publish").checked == true) {
        var isPublished = true;
    }

    //create new variable pins and assign it pinObjects, for later use
    var pins = pinObjects;

    // A vacation has no ratings when it is created, therefore ratings has to be an empty array
    var ratings = [];

    //Getting center location of displyed window, need it for later so the map opens on the same location as user saved it
    //getCenter() is a method from Google Maps API
    var center = map.getCenter();

    //Getting zoom level --> map will open at same zoom level again
    var zoom = map.getZoom();

    // push the new vacation in the vacations array, new Vacation makes it part of the Vacation class  
    var currentVac = new Vacation(id, title, description, pins, isSelected, isPublished, tags, ratings, center, zoom);

    //push the just created vacation into vacations array in currentUser object and the allVac array
    currentUser.vacations.push(currentVac);
    allVac.push(currentVac);

    // update changes of currentUser also in the users array
    // Loop over users array to find the object with the same id and set it to currentUser
    for (i = 0; i < users.length; i++) {
        if (currentUser.id === users[i].id) {
            users[i] = currentUser;
        }
    }

    // store new vacation in local storage, function store(y, keyname) defined in util.js
    store(currentVac, "currentVac");

    //we store the allVac array in the localStorage, function store(y, keyname) defined in util.js
    store(allVac, "allVac");

    //store updated currentUser object in localStorage, function store(y, keyname) defined in util.js
    store(currentUser, "currentUser");

    //store updated users array in localStorage, function store(y, keyname) defined in util.js
    //keyName --> you need it to recall it later!
    store(users, "users");

    //Now all fields need to be reseted
    // clear the input fields for later
    document.getElementById("vacTitle").value = "";
    document.getElementById("vacDescription").value = "";
    document.getElementById("publish").checked = false;
    document.getElementById("tags").value = "";

    //alert a message and redirecting to myVacations page
    alert("Awesome! Your vacation is saved! You can review and edit it under My Vacations!")

    window.location = "myVacations.html";

    return true;
}
}
