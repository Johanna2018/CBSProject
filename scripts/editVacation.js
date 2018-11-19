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

        // set start location variable --> location where map opens at first
        var MapPosition = {
                lat: currentVac.center.lat,
                lng: currentVac.center.lng
            };

            // fill map variable with initialized map and set start location and zoom level
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

            // connect infowindow with the set contenString
            infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            //assign a click listener to the map with the addListener() callback function that creates marker when the user clicks the map
            google.maps.event.addListener(map, 'click', function(event) {
                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map
                });


                //TODO: check retrievedMarkers

                // displays an info window when the user created marker
                infowindow.open(map, marker);

                // set current marker variable to `normal´ marker variable 
                recentMarker = marker;

                // // now, the marker variable will be pushed into the empty allMarkers Array (we will need this later on)
                // retrievedMarkers.push(marker);
            

        });
    }

// Assign pinObjects the pins from currentVac
// New pins can be added later and in the end the whole array can be saved again in currentVac.pins and currentUser.vacations.pins etc.
var pinObjects = currentVac.pins;

// if the currentVac.pins is empty
if (pinObjects == null){
    //Define pinObjects as an empty array, because you cannot push into an variable which is null
    var pinObjects = [];}

    // store(pinObjects, 'pinObjects')

// Function to save the new pins

        //onlcik function --> onclick defined in HTML Part, if I changed it stops working --> do know why?
        function savePin() {

            //Show message field
            document.getElementById('messageCreate').style.visibility = "visible";
            //Make the toggle and the delete button visible
            document.getElementById("toggle").style.display = "inline";
            document.getElementById("deletePins").style.display = "inline";

            //data entered by the user in the info window form:
            //Saves the name, comment, location type (whether a bar or restaurant), and pin coordinates entered by the user in the info window form
            var name = document.getElementById('nameCreate').value;
            var comment = document.getElementById('commentCreate').value;
            var type = document.getElementById('typeCreate').value;
            var latlng = marker.getPosition();
            var id = getNextId(pinObjects);
            recentMarker.id = id;
            
             // now, the marker variable will be pushed into the empty allMarkers Array (we will need this later on)
             retrievedMarkers.push(marker);

            //push the new Pin in the pinObjects array, new Pin makes it part of the Pin class
            pinObjects.push(new Pin(id, name, comment, type, latlng));

            // construct infowindow about new pin
            updateInfoWindow(recentMarker, name, comment, type);

            // consrtuct editable infowindow about new pin
            google.maps.event.addListener(recentMarker, 'click', function() {
                // alert(this.title);
                changeInfoWindow(recentMarker, name, comment, type);
                });

            //store pinObjects in localStorage with store function
            // store(pinObjects, 'pinObjects')

            // display info window and "LOCATION SAVED" for 1 second, then dismiss
            setTimeout(function() {
                // reset info window for next pin
                document.getElementById('messageCreate').style.visibility = "hidden";
                document.getElementById('nameCreate').value = "";
                document.getElementById('commentCreate').value = "";
                document.getElementById('typeCreate').value = "viewpoint";
                infowindow.close();

            }, 1000);

            //DATA IS SAVED and INFO WINDOW IS CLOSED
        }
       
        
    // //onlcik function --> on button editPin
    function editPin(){
        //Make message field in infowindow visible 
        document.getElementById('messageEdit').style.visibility = "visible";

        //We need to update pinObjects with the changes the user typed in the infowindow
        //1. we need to find out which pin is edited, we use the id for that. We retrieve the id from the HTML from the infowindow in changeInfoWindow() function
        var id = formEdit.dataset['object'];
        // console.log(id);
        // var id = changedPin.id;

        //2. get create new local variables and assign them the input values from the infowindow
       var name = document.getElementById('nameEdit').value;
       var comment = document.getElementById('commentEdit').value;
       var type = document.getElementById('typeEdit').value;

       //3. update changes in pinObjects array
        // Loop over array to find the object with the same id 
        for(i = 0; i < pinObjects.length; i++){
            console.log(pinObjects[i], id);
        if(pinObjects[i].id == id){
            pinObjects[i].name = name;
            pinObjects[i].comment = comment;
            pinObjects[i].type = type;
            //we need the latlng of the selected pin later
            var latlng = pinObjects[i].latlng;
        }
        // console.log(pinObjects);
    }
    //    var latlng = selectedPin.latlng;

        //4. we rebuild the pin on the map
       editedMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: name,
        comment: comment,
        type: type,
        id: id
        
    });
        
    //5. we construct the infowindow for the rebuilded pin
    updateInfoWindow(editedMarker, name, comment, type);

    //6. we consrtuct the editable infowindow for the rebuilded pin
    google.maps.event.addListener(editedMarker, 'click', function() {
        // alert(this.title);
        changeInfoWindow(editedMarker, name, comment, type);
        });

    //7. we reset and close the infowindow
        setTimeout(function() {
        // reset info window for next pin
        document.getElementById('messageEdit').style.visibility = "hidden";
        document.getElementById('nameEdit').value = "";
        document.getElementById('commentEdit').value = "";
        document.getElementById('typeEdit').value = "viewpoint";
        infowindowEdit.close();

        }, 1000);
    }

        // Now, we need a variable to display the pins 
        // We cannot use pinObjects, because in pinObjects not all data (from google API) are saved
        // We rebuild the pins on the map with the retrievedMarker
        // callback function to retrieve pins
        // start() --> it has to have this name --> Has to do with google I think
        function start() {

            //use getStorage function to get pins from local storage
            //assging it to pinObjects variable --> it is easier if it has always the same name, because it is the same thing
            // var pinObjects = getStorage("pinObjects");

            // if no pins are saved, initialize empty map
            if (pinObjects == null || pinObjects.length == 0) {
                initMap();
                return;
            }

            // display button to show/hide all pins
            document.getElementById("toggle").style.display = "inline";
            document.getElementById("deletePins").style.display = "inline";

            // add displaying of pins to the event queue
            //showPins function will be defined right after the setTimeout function
            setTimeout(function() {
                //Why do we need that (pinObjects) here?
                showPins(pinObjects);
            }, 0);

            initMap();
        }

        // display pins on the map
        //Why do we need that (pinObjects) here?
        function showPins(pinObjects) {

            //loop over existing array and display them as a pin, each for one pin
            // iterate over stored pins (pinObjects) to get data about name, comment, etc. 
            for (var i = 0; i < pinObjects.length; i++) {

                var currentPin = pinObjects[i];
                var name = currentPin.name;
                var comment = currentPin.comment;
                var type = currentPin.type;
                var latlng = currentPin.latlng;
                var id = currentPin.id;

            // Now we take the collected data from above and create a pin (the red marker) on the map for every object in pinObjects
            // In pinObjects there are not as many data saved as we need to display them (I think)
            // new google.maps.Marker --> is like a own class defined by google
            
                retrievedMarkers[i] = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: name,
                    comment: comment,
                    type: type,
                    id: id
                    
                });

                //for info window
                //TODO: better explaination in comment here?
                retrievedMarkers[i].setMap(map);

                // construct info about every retrieved marker
                //updateInfoWindow is defined below
                updateInfoWindow(retrievedMarkers[i], name, comment, type);
                
                //Add an event listener to every retrievedPin, if someone click on pin function changeInfoWindow is called with values from the clicked pin
                //changeInfoWindow is defined below 
                google.maps.event.addListener(retrievedMarkers[i], 'click', function() {
                    changeInfoWindow(this, this.title, this.comment, this.type);
                    });
                }
        }


        // update info window of the passed marker with its respecting data
        function updateInfoWindow(marker, name, comment, type) {

            // Now we have to rebuild an infowindow (name, comment, type)
            var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

            //updating info window
            // this variable infowindow is only local 
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            // mouseover and mouseout event listeners
            marker.addListener('mouseover', function() {
                infowindow.open(map, this);
            });

            marker.addListener('mouseout', function() {
                infowindow.close();
            });

        }

        //function to make changes in the infowindow of the pin
        function changeInfoWindow(marker, name, comment, type) {

        //setting contenString variable to define pin pop up info window (e.g. Titel, Comment, Type)
        // it is filled out with the variables name, comment, type
        var contentString = "<div id='formEdit' data-object='" + marker.id + "'><table>" +
        "<tr><td>Name:</td><td><input type='text'  id='nameEdit' value = '"+name+"'/> </td></tr>" +
        "<tr><td>Comment:</td><td><input type='text' id='commentEdit' value = '"+comment+"' /></td></tr><tr>" +
        "<td>Type:</td><td><select id='typeEdit' value = '"+type+"'>" +
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
            "<tr><td></td><td><input type='button' id='editPin' value='Save' onclick='editPin()'/></td></tr></table></div><div id='messageEdit' style='visibility: hidden;  '><b>Changes saved!</b></div>";

            // connect infowindow with the set contenString
            // this variable infowindow is only local 
            infowindowEdit = new google.maps.InfoWindow({
                content: contentString
            });

            // infowindow opens
                infowindowEdit.open(map, marker);
           

            // // click event listeners on marker --> so infowindow opens
            // marker.addListener('click', function() {
            //     infowindowEdit.open(map, this);
            // });

            // changedPin = pin;

            }

            // //add event listener to all Markers on the map
            // google.maps.event.addListener(marker, 'click', function () {
            //     changeInfoWindow(this, name, comment, type);
            //     infowindowEdit.open(map, this);
            //  });






            //data-object='" + JSON.stringify(pin) + "'
            //JSON.parse(element.target.dataset.object);

        //function to delete all Pins    
        // Bind the button from HTML to a variable for later use
        var deletePins = document.getElementById("deletePins");

        deletePins.onclick = function () {
            //Opens up a pop up window do ask the following.. 
            var con = confirm("Do you really want to remove all pins? If you have made other changes in the vacation and you have not clicked \"Save Changes\" the changes will be lost!")
            // If user clicks "OK" all pins are delted, if he clicks "Cancel" nothing happens
            if (con === true){
                //removes the item pinObjects from localStorage
                // localStorage.removeItem("pinObjects");
                // If we want to delete all pins, pinObjects need to be set to empty array
                pinObjects = [];
                // If we want to delete all pins, currentVac.pins need to be set to empty array
                currentVac.pins = [];
                // If we want to delete all pins, retrievedMarkers need to be set to empty array
                retrievedMarkers = [];
                //store updated currentVac in local storage
                store(currentVac, "currentVac");
                // currentVac = getStorage("currentVac");
                //TODO: Is there another solution than reloading whole page? Problem: If user changes descirption and title before clicking delete all entries, the changes will not be saved
                //But page needs to be refreshed otherwise pins would stay on there
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

            // // Below the function checks ALL the markers to show/hide them
            // for (var i = 0; i < allMarkers.length; i++) {
            //     google.maps.event.trigger(allMarkers[i], event);
            
            // }

             // Below the function checks ALL the markers to show/hide them
             for (var i = 0; i < retrievedMarkers.length; i++) {
                google.maps.event.trigger(retrievedMarkers[i], event);
            
            }

        }


//get the all vacations array from local storage with the keyName (always string), to update Data later
var allVac = getStorage("allVac");
//get the users array from local storage with the keyName (always string), to update Data later
var users = getStorage("users");
//get the currently logged in User from local storage with the keyName (always string), to update Data later
var currentUser = getStorage("currentUser");

//fill input fields with the vacation information
document.getElementById("vacTitle").value = currentVac.title;
document.getElementById("vacDescription").value = currentVac.description;
document.getElementById("tags").value = currentVac.tags;
if (currentVac.isPublished === true){
    document.getElementById("publish").checked = true;
}else{
    document.getElementById("publish").checked = false;
}

// Bind the button from HTML to a variable for later use
var saveChanges = document.getElementById("saveChanges");

//make a function to save the changes made in the vacation, when button is clicked
saveChanges.onclick = function(){
    //upadte the properties of the currentVac with input
    currentVac.center = map.getCenter();
    currentVac.zoom = map.getZoom();
    currentVac.title = document.getElementById("vacTitle").value;
    currentVac.description = document.getElementById("vacDescription").value;
    currentVac.tags = document.getElementById("tags").value;
 if (document.getElementById("publish").checked == true){
    currentVac.isPublished = true;
    }else{
    currentVac.isPublished = false;
}
    // update currentVac.pins by assign pinObjects to it
    currentVac.pins = pinObjects;
    
    // // if user pressed Button Delete all pins --> pinObjects is delted from localStorage
    // // currentVac.pins has to be an empty array then!
    // if(pinObjects == undefined){
    //     currentVac.pins = [];
    // }

    //update changes of currentVac in allVac array
    // Loop over allVac array to find the object with the same id and set it to currentVac
    for(i = 0; i < allVac.length; i++){
         if(currentVac.id === allVac[i].id){
        allVac[i] = currentVac;
        }
    } 
    
    //update changes of currentVac in currentUser.vacations array
    // Loop over currentUser.vacations array to find the object with the same id and set it to currentVac
    for(i = 0; i < currentUser.vacations.length; i++){
        if(currentVac.id === currentUser.vacations[i].id){
            currentUser.vacations[i] = currentVac;
       }
   } 

   //update changes of currentUser in users array
    // Loop over users array to find the object with the same id and set it to currentUser
    for(i = 0; i < users.length; i++){
        if(currentUser.id === users[i].id){
            users[i] = currentUser;
        }
    } 

    store(currentVac, "currentVac");
    store(allVac, "allVac");
    store(currentUser, "currentUser");
    store(users, "users");

    alert("Your changes have been saved! You can review it under My Vacations!")

    window.location = "myVacations.html"; 

    return true;
}




// Bind the button from HTML to a variable for later use
var deleteVac = document.getElementById("deleteVac");
//create a function to save to home, when button is clicked
deleteVac.onclick = function (){
    var con = confirm("Do you really want to remove all pins? If you have made other changes in the vacation and you have not clicked \"Save Changes\" the changes will be lost!")
    // If user clicks "OK" all pins are delted, if he clicks "Cancel" nothing happens
    if (con === true){
    for(i = 0; i < currentUser.vacations.length; i++){
        if(currentVac.id === currentUser.vacations[i].id){
            
            delete currentUser.vacations[i];
            store(currentUser, "currentUser");
        }
    }

        //update changes of currentVac in allVac array
         // Loop over allVac array to find the object with the same id and set it to currentVac
    for(i = 0; i < allVac.length; i++){
    if(currentVac.id === allVac[i].id){
            delete allVac[i];
            store(allVac, "allVac");
       }
     }
            //update changes of currentUser in users array
             // Loop over users array to find the object with the same id and set it to currentUser
    for(i = 0; i < users.length; i++){
    if(currentUser.id === users[i].id){
            users[i] = currentUser;
            store(users, "users");
        }
    } 
    currentVac = undefined;
    localStorage.removeItem("currentVac");
    window.location = "myVacations.html"; 
}}
    
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