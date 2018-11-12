var map;
var pin;
var infowindow;
var allMarkers = [];
var recentMarker;


    // initialize the Map
    function initMap() {

        // delete pinObjects from localStorage, just in case if there are any stored and to make it more clear what is in local Storage
        // we will set the pinObjects array to an empty array later 
        localStorage.removeItem("pinObjects");

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

            //assign a click listener to the map with the addListener() callback function that creates pin when the user clicks the map
            google.maps.event.addListener(map, 'click', function(event) {
                pin = new google.maps.Marker({
                    position: event.latLng,
                    map: map
                });

                // displays an info window when the user created pin
                infowindow.open(map, pin);

                // set current marker variable to `normal´ marker variable 
                recentMarker = pin;

                // now, the marker variable will be pushed into the empty allMarkers Array (we will need this later on)
                allMarkers.push(pin);

            });

        }



//use getStorage function to get pins from local storage --> if there are some
// I think we should delete this --> pinObjects always has to be empty in the beginning!!
//assging it to pinObjects variable  
//is the same as var pinObjects = JSON.parse(localStorage.getItem("pinObjects"));
// var pinObjects = getStorage("pinObjects");
  
// // if the localStorgae is empty
// if (pinObjects == null){
//   //Define pinObjects as an empty array, because you cannot push into an variable which is null
//   var pinObjects = [];}

// set new variable pinObjects as an empty array, so it can be filled with data later
var pinObjects = [];



//Now it is time to safe the set pins!!!
        // save pin data

        //onlcik function --> onclick defined in HTML Part, if I changed it stops working --> do know why?
        function savePin() {

            //Show message field
            document.getElementById('message').style.visibility = "visible";
            //??
            document.getElementById("toggle").style.display = "inline";

            //data entered by the user in the info window form:
            //Saves the name, comment, location type (whether a bar or restaurant), and pin coordinates entered by the user in the info window form
            var name = document.getElementById('name').value;
            var comment = document.getElementById('comment').value;
            var type = document.getElementById('type').value;
            var latlng = pin.getPosition();

            // construct info about current pin
            updateInfoWindow(recentMarker, name, comment, type);

            // instead of comments below --> we do it shorter
            //push the new Pin in the pinObjects array, new Pin makes it part of the Pin class
            pinObjects.push(new Pin(name, comment, type, latlng));

            //store pinObjects in localStorage with store function
            store(pinObjects, 'pinObjects')

            // display info window and "LOCATION SAVED" for 1 second, then dismiss
            setTimeout(function() {
                // reset info window for next pin
                document.getElementById('message').style.visibility = "hidden";
                document.getElementById('name').value = "";
                document.getElementById('comment').value = "";
                document.getElementById('type').value = "viewpoint";
                infowindow.close();

            }, 1000);

            //DATA IS SAVED and INFO WINDOW IS CLOSED
        }
        
        // Now, we need a variable to display the retrieve the data from the local storage 
        // var retrievedPins = [];

        // callback function to retrieve pins
        // it has to have this name --> Has to do with google I think
        function start() {

            

            // //use getStorage function to get pins from local storage
            // //assging it to pinObjects variable --> it is easier if it has always the same name, because it is the same thing
            // var pinObjects = getStorage("pinObjects");

            // // if no pins are saved, initialize empty map
            // if (pinObjects == null || pinObjects.length == 0) {
            //     initMap();
            //     return;
            // }

            // display button to show/hide all pins
            document.getElementById("toggle").style.display = "inline";
            
            //TODO: work on edit function --> work with the index here?? --> to update the pinObjects array


            // //loop over existing array and display them as a pin, each for one pin
            // // iterate over restored pins (object) to get data about name, comment, etc. 
            // for (var i = 0; i < pinObjects.length; i++) {

            //     var currentPin = pinObjects[i];
            //     var name = currentPin.name;
            //     var comment = currentPin.comment;
            //     var type = currentPin.type;
            //     var latlng = currentPin.latlng;


            //     // Now we take the collected data from above and create a pin (var retrievedPins) to display them later
            //     // In pinObjects there are not as many data saved as we need to display them (I think)
            //     // new google.maps.Marker --> is like a own class defined by google
            //     retrievedPins[i] = new google.maps.Marker({
            //         position: latlng,
            //         map: map,
            //         title: name,
            //         comment: comment,
            //         type: type
            //     });
            // }

            // add displaying of pins to the event queue
            //showPins function will be defined right after the setTimeout function
            setTimeout(function() {
                // //Why do we need that (pinObjects) here?
                // showPins(pinObjects);
            }, 0);
            
            initMap();
            
        }
        

        // // display pins retrieved from the localStorage --> e.g. when page is refreshed or opened
        // //Why do we need that (pinObjects) here?
        // function showPins(pinObjects) {
        //     // value of i is passed into a closure 
        //     for (var i = 0; i < retrievedPins.length; i++) {
        //         (function(index) {

        //             //set Map for all Objects in the retrievedPins array (here we need those more information we do not have in pinObjects)
        //             allMarkers.push(retrievedPins[i]);
        //             retrievedPins[i].setMap(map);
        //             var name = pinObjects[i].name;
        //             var comment = pinObjects[i].comment;
        //             var type = pinObjects[i].type;

        //             // construct info about every retrieved marker
        //             //updateInfoWindow is defined below
        //             updateInfoWindow(retrievedPins[i], name, comment, type);

        //             //What does the i mean? --> if I delete it pins are not shown anymore (it is the i above you use in the forloop)
        //         })(i);
        //     }
        // }


        // update info window of the passed marker with its respecting data
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

        // Bind the button from HTML to a variable for later use
        var deletePins = document.getElementById("deletePins");
        // delete pinObjects from localStorage
        //IMPORTANT: do not delete whole localStorage, otherwise everything (user data, vacation data will be deleted as well)
        deletePins.onclick = function () {
            //Opens up a pop up window do ask the following.. 
            var con = confirm("Do you really want to remove all pins? There is no way back if you click \"OK\"!")
            // If user clicks "OK" all pins are delted, if he clicks "Cancel" nothing happens
            if (con === true){
                //removes the item pinObjects from localStorage
                localStorage.removeItem("pinObjects");
                //Page needs to be refreshed otherwise pins would stay on there
                location.reload();
                return true;
            }else{
                return false;
            }
        }
        
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
        
        


var users = getStorage("users");
var currentUser = getStorage("currentUser");

// var publishedVac = getStorage("publishedVac");
// Henrik said it is smarter to have an array with all vacations and find the published ones with a loop (isPubished)
var allVac = getStorage("allVac");
  
// // if the localStorgae is empty, because we came directly to login (without registration), we need to fill the users array with hardcoded users
// if (publishedVac === null){
//   //Define users as an empty arrayfor later --> to store published vacations in localStorage, because you cannot push into an variable which is null
//   var publishedVac = [];}

// if the localStorgae is empty, because we came directly to login (without registration), we need to fill the users array with hardcoded users
if (allVac === null){
    //Define users as an empty array for later --> to store all vacations in localStorage, because you cannot push into an variable which is null
    var allVac = [];}

// Bind the button to a variable for later use
var saveVac = document.getElementById("saveVac");

// Bind the onClick-function to our own function --> could also use an Event listener
saveVac.onclick = function(){

// Put it in util 
//  function getNextId(){
//     // TODO: Make this work!!!
//     // Generate an ID with function
//     var max = 0;
//     // Loop over array 
//     // Make sure when calling this function that the array filled with data from localStorage
//     for(i = 0; i < allVac.length; i++){
//         // Find the biggest id and add one
//             if(allVac[i].id >= max){
//                 max = allVac[i].id + 1;
//             }
        
//     }
//     return max;
// }

    // generated ID with getNextId function (in util.js defined)
    var id = getNextId(allVac);
    

    // Bind the input fields and get the value
    var title = document.getElementById("vacTitle").value;
    var description = document.getElementById("vacDescription").value;
   //TODO: what is mapPosition and zoom? How can I get it?
    // var mapPosition = "";
    // var zoom = "";
    // var pins = [];
    var isSelected = false;
    var isPublished = false;
    if (document.getElementById("publish").checked == true){
        var isPublished = true;
    }
    //get input from tag input in HTML, .split splits the input after whatever you put in here ("")
    //makes automatically an array out of it
    var tags = document.getElementById("tags").value.split(",");
    
    var pins = pinObjects;

    //Getting center location of displyed window --> opens the map on the same location
    //.getCenter() --> function from Google API
    var center = map.getCenter();

    //Getting zoom level --> map will open at same zoom level again
    var zoom = map.getZoom();
        
// push the new vacation in the vacations array, new Vacation makes it part of the Vacation class  
//TODO: put mapPosition and zoom and pins in here 
var currentVac = new Vacation(id, title, description, pins, isSelected, isPublished, tags, center, zoom);

//push newVacation into vacations array in currentUser Object 
currentUser.vacations.push(currentVac);
allVac.push(currentVac);

// update changes of currentUser in users array
    // Loop over users array to find the object with the same id and set it to currentUser
    for(i = 0; i < users.length; i++){
        if(currentUser.id === users[i].id){
            users[i] = currentUser;
        }
    } 

// store new vacation in local storage, store(y, keyname) 
// keyName --> make sure keyName is always String, need to remember for later use, y --> variable 
store(currentVac, "currentVac");

// //we store the publishedVac array in the local storage
// // store new vacation in local storage, store(y, keyname) 
// // keyName --> make sure keyName is always String, need to remember for later use, y --> array 
// store(publishedVac, "publishedVac");

//we store the allVac array in the local storage
// store new vacation in local storage, store(y, keyname) 
// keyName --> make sure keyName is always String, need to remember for later use, y --> array 
store(allVac, "allVac");

//store updated currentUser object in local storage, make sure keyName is always String! 
//keyName --> you need it to recall it later!
store(currentUser, "currentUser");

//store updated users array in local storage, make sure keyName is always String!
//keyName --> you need it to recall it later!
store(users, "users");

// clear the input fields for later
document.getElementById("vacTitle").value = "";
document.getElementById("vacDescription").value = "";
document.getElementById("publish").checked = false;
document.getElementById("tags").value = "";


// delete pinObjects from localStorage for later

    localStorage.removeItem("pinObjects");
    location.reload();


//alert and redirecting to myVacations page
alert("Awesome! Your vacation is saved! You can review and edit it under My Vacations!")

window.location = "myVacations.html"; 

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
