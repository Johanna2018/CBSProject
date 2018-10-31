alert("connected");
        var map;
        var marker;
        var infowindow;
        var messagewindow;

        var allMarkers = [];
        var recentMarker;

        function initMap() {

            var Copenhagen = {
                lat: 55.67594,
                lng: 12.56553
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: Copenhagen,
                zoom: 13
            });

            var contentString = "<div id='form'><table> <tr><td>Name:</td><td><input type='text'  id='name' /> </td></tr><tr><td>Comment:</td><td><input type='text' id='comment' /></td></tr><tr><td>Type:</td><td><select id='type'> +<option value='viewpoint' SELECTED>viewpoint</option><option value='restaurant'>restaurant</option><option value='bar'>bar</option><option value='shopping mall'>shopping mall</option><option value='cafe'>cafe</option></select> </td></tr><tr><td></td><td><input type='button' value='Save' onclick='saveStuff()' /></td></tr></table></div><div id='message' style='visibility: hidden;  '><b>Location saved!</b></div>";

            infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(map, 'click', function(event) {
                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map
                });

                infowindow.open(map, marker);
                recentMarker = marker;
                allMarkers.push(marker);

            });

        }

        var pinObjects = [];
        var pinIndex = 0;

        // save marker data
        function saveStuff() {

            document.getElementById('message').style.visibility = "visible";
            document.getElementById("toggle").style.display = "inline";


            // check if any pin already exists
            var pinObjectsString = localStorage.getItem('pinObjectsString');

            var pinObjects = [];
            if (pinObjectsString != null) {
                pinObjects = JSON.parse(pinObjectsString);
                pinIndex = pinObjects.length;
            }

            var name = document.getElementById('name').value;
            var address = document.getElementById('comment').value;
            var type = document.getElementById('type').value;
            var latlng = marker.getPosition();

            // construct info about current marker
            updateInfoWindow(recentMarker, name, address, type);

            var selectedPin = {
                name,
                address,
                type,
                latlng
            };

            // store pin in (existing) pinObjects array
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

        }

        var retrievedMarkers = [];

        // callback function to retrieve markers
        function start() {

            var pinObjectsString = localStorage.getItem('pinObjectsString');
            var pinObjects = JSON.parse(pinObjectsString);

            // if no markers are saved, initialize empty map
            if (pinObjects == null || pinObjects.length == 0) {
                initMap();
                return;
            }

            // display button to show/hide all markers
            document.getElementById("toggle").style.display = "inline";


            // iterate over restored markers
            for (var i = 0; i < pinObjects.length; i++) {

                var currentMarker = pinObjects[i];
                var name = currentMarker.name;
                var address = currentMarker.address;
                var type = currentMarker.type;
                var latlng = currentMarker.latlng;

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

                    allMarkers.push(retrievedMarkers[i]);
                    retrievedMarkers[i].setMap(map);
                    var name = pinObjects[i].name;
                    var comment = pinObjects[i].address;
                    var type = pinObjects[i].type;

                    // construct info about every retrieved marker
                    updateInfoWindow(retrievedMarkers[i], name, comment, type);

                })(i);
            }
        }


        // update info window of the passed marker with its respecting data
        function updateInfoWindow(marker, name, comment, type) {

            // content of info window (name, comment, type)
            var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

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

        var entriesHidden = true;

        function toggleEntries() {

            var event = "";

            if (entriesHidden)
                event = "mouseover";
            else
                event = "mouseout";

            for (var i = 0; i < allMarkers.length; i++) {
                google.maps.event.trigger(allMarkers[i], event);
            }

            // reverse the flag whether info windows are shown or hidden
            entriesHidden = !entriesHidden;

        }