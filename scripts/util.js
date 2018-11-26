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
function getStorage(keyName){
    var parsed = JSON.parse(localStorage.getItem(keyName));
    return parsed;
}

//function to generate the next ID in an array
//arr --> array for which objects ID should be created
function getNextId(arr){
    // set variable max to 0
    var max = 0;
    // Loop over array 
    // Make sure when calling this function that the array filled with data 
    for(i = 0; i < arr.length; i++){
        // Find the highest ID and add one
        // Has to be >= max, because the allVac array could be 0, if non vacation yet
            if(arr[i].id >= max){
            // Set max to one more than biggest existing id
                max = arr[i].id + 1;
            }
        
    }
    //Return the max --> max is the generate ID
    return max;
}

// //function to initialize the map on different parts of the program (e.g. editVacation, createVacation)
// // initialize the Map
// function initMap(MapPosition, zoom) {
//     // alert("hi");

//     // // set start location variable --> location where map opens at first
//     // var MapPosition = {
//     //     lat: lat,
//     //     lng: lng
//     // };

//     // fill map variable with initialized map and set start location and zoom level
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: MapPosition,
//         zoom: zoom
//     });

//     //setting contentString variable to define pin pop up info window (e.g. Titel, Comment, Type)
//     var contentString = "<div id='form'><table>" +
//         "<tr><td>Name:</td><td><input type='text'  id='name' /> </td></tr>" +
//         "<tr><td>Comment:</td><td><input type='text' id='comment' /></td></tr><tr>" +
//         "<td>Type:</td><td><select id='type'>" +
//         "<option value='Viewpoint' SELECTED>Viewpoint</option>" +
//         "<option value='Restaurant'>Restaurant</option>" +
//         "<option value='Bar'>Bar</option>" +
//         "<option value='Shopping'>Shopping</option>" +
//         "<option value='Cafe'>Cafe</option>" +
//         "<option value='Night club'>Night club</option>" +
//         "<option value='Supermarket'>Supermarket</option>" +
//         "<option value='Museum'>Museum</option>" +
//         "<option value='Hotel'>Hotel</option>" +
//         "<option value='Other'>Other</option>" +
//         "</select> </td></tr>" +
//         "<tr><td></td><td><input type='button' id='save' value='Save' onclick='savePin()' /></td></tr></table></div><div id='message' style='visibility: hidden;  '><b>Location saved!</b></div>";

//     // connect infowindow (defined global) with the set contenString
//     //new google.maps.InfoWindow --> is like a own class defined by Google Maps API
//     infowindow = new google.maps.InfoWindow({
//         content: contentString
//     });

//     //assign a click listener to the map with the addListener() callback function that creates marker when the user clicks the map
//     google.maps.event.addListener(map, 'click', function (event) {
//         // new google.maps.Marker --> is like a own class defined by Google Maps API
//         marker = new google.maps.Marker({
//             position: event.latLng,
//             map: map
//         });

//         // displays an info window when the user created marker
//         infowindow.open(map, marker);

//         // set current marker variable to `normal´ marker variable 
//         recentMarker = marker;

//     });

// }

// 

// With the toggle function we show all the markers with a click on the button
function toggle (arrMarkers) {
    var entriesHidden = true;

    //set event as an empty string
    var event = "";

    // If entries are not shown, we will have the event mouseover to show all the markers.
    if (entriesHidden)
        event = "mouseover";
    // If entries are shown, we will have the event mouseout to hide all markers.
    else
        event = "mouseout";

    // Below the function checks ALL the markers to show/hide them
    for (var i = 0; i < arrMarkers.length; i++) {
        google.maps.event.trigger(arrMarkers[i], event);

    }

}
