var map;
var marker;
var infowindow;

var allMarkers = [];
var recentMarker;

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
            "<tr><td></td><td><input type='button' value='Save' onclick='saveStuff()' /></td></tr></table></div><div id='message' style='visibility: hidden;  '><b>Location saved!</b></div>";

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

                // displays an info window when the user created marker
                infowindow.open(map, marker);
                
                // set current marker variable to `normal´ marker variable 
                recentMarker = marker;
                
                // now, the marker variable will be pushed into the empty allMarkers Array (we will need this later on)
                allMarkers.push(marker);

            });

        }

//???
var pinObjects = [];
var pinIndex = 0;

//Now it is time to safe the set pins!!!
        // save marker data
        function saveStuff() {

            //???
            document.getElementById('message').style.visibility = "visible";
            document.getElementById("toggle").style.display = "inline";


            // create variable pinObjectsString to check if any pin already exists
            var pinObjectsString = localStorage.getItem('pinObjectsString');

            // data will be safed in empty variable pinObjects
            var pinObjects = [];

            // if loop: if pinObjectsString is unequal zero, we know that already a pin exists!
            if (pinObjectsString != null) {

                //save pinObjectsString in pinObjects to retrieve the data later
                pinObjects = JSON.parse(pinObjectsString);
                
                //??? --> I deleted it from the script and it still works... maybe no need for that?
                pinIndex = pinObjects.length;
            }

            //data entered by the user in the info window form:
            //Saves the name, comment, location type (whether a bar or restaurant), and marker coordinates entered by the user in the info window form
            var name = document.getElementById('name').value;
            var comment = document.getElementById('comment').value;
            var type = document.getElementById('type').value;
            var latlng = marker.getPosition();

            // construct info about current marker
            updateInfoWindow(recentMarker, name, comment, type);


            // create a variable selectedPin with all data (name, comment, type, latlng) to store it in the next step, because localStorage can just store strings
            var selectedPin = {
                name,
                comment,
                type,
                latlng
            };

            // now, store pin in (existing) pinObjects array
            pinObjects[pinIndex] = selectedPin;
            pinIndex++;

            // store stringified pins 
            localStorage.setItem('pinObjectsString', JSON.stringify(pinObjects));

            // display info window and "LOCATION SAVED" for 1 second, then dismiss
            setTimeout(function() {
                // reset info window for next marker
                document.getElementById('message').style.visibility = "hidden";
                document.getElementById("name").value = "";
                document.getElementById("comment").value = "";
                document.getElementById("type").value = "viewpoint";
                infowindow.close();

            }, 1000);

            //DATA IS SAVED and INFO WINDOW IS CLOSED
        }
        
        // Now, we need a variable to retrieve the data from the local storage 
        var retrievedMarkers = [];

        // callback function to retrieve markers
        function start() {

            //With getItem we retrieve the data from the localStorage and put it back into the pinobjectsString. After that the PinObjectsString Data will be put into the PinObjects variable
            var pinObjectsString = localStorage.getItem('pinObjectsString');
            var pinObjects = JSON.parse(pinObjectsString);

            // if no markers are saved, initialize empty map
            if (pinObjects == null || pinObjects.length == 0) {
                initMap();
                return;
            }

            // display button to show/hide all markers
            document.getElementById("toggle").style.display = "inline";


            // iterate over restored markers (object) to get data about name, comment, etc. 
            for (var i = 0; i < pinObjects.length; i++) {

                var currentMarker = pinObjects[i];
                var name = currentMarker.name;
                var comment = currentMarker.comment;
                var type = currentMarker.type;
                var latlng = currentMarker.latlng;


                // Now we take the collected data from above and create a marker (var retrievedMarkers) to display them later
                retrievedMarkers[i] = new google.maps.Marker({
                    position: currentMarker.latlng,
                    map: map,
                    title: name
                });
            }

            // add displaying of markers to the event queue
            setTimeout(function() {
                showMarkers(pinObjects);
            }, 0);

            initMap();
        }

        // display markers retrieved from the localstorage
        function showMarkers(pinObjects) {

            // value of i is passed into a closure 
            for (var i = 0; i < retrievedMarkers.length; i++) {
                (function(index) {

                    //pushing retrieved markers into the all markers variable 
                    allMarkers.push(retrievedMarkers[i]);
                    retrievedMarkers[i].setMap(map);
                    var name = pinObjects[i].name;
                    var comment = pinObjects[i].comment;
                    var type = pinObjects[i].type;

                    // construct info about every retrieved marker
                    updateInfoWindow(retrievedMarkers[i], name, comment, type);

                })(i);
            }
        }


        // update info window of the passed marker with its respecting data
        function updateInfoWindow(marker, name, comment, type) {

            // Now we have to rebuild an infowwindow (name, comment, type)
            var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

            //updating info window
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

        // delete local storage to remove saved markers
        function clearStorage() {
            localStorage.clear();
            location.reload();
        }

        // With the toggleEntries function we show all the markers with a click on the button
        var entriesHidden = true;

        function toggleEntries() {

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
