
//1. Get the data from a local storage - currentUser
//2. Access the property vacation
//3. Form a list of all of the vacations titles
//4. When clicked on the particular title, display the map with the pins that belong to that vacation

//I've been trying to display current user's vacations, but there is something fishy about the local storage, will figure out what over the weekend

var user = getStorage('currentUser');
var userVacations = user.vacations || [];
var markers;


if (userVacations.length === 0) {
    //Display this as a text in html
    alert("You have not saved any vacations");
} else {

    document.getElementById('myVacationsList').innerHTML = ""

    for (i = 0; i < userVacations.length; i++) {
        //alert(userVacations[i].title);
        var vacation = userVacations[i];
        //console.log(vacation.title);
        var resultEl = document.createElement('li');

        resultEl.setAttribute('id', vacation.id);
        initVacationElementEvents(resultEl);

        resultEl.innerHTML = vacation.title

        document.getElementById('myVacationsList').appendChild(resultEl)

    }
}

//In this part, the resultEl becomes vacationElement, but it is essentially the same thing, and has the same value, it's just better to use a different name now, because in the following function and piece of code it is basically not a result element anymore, it will become a particular vacation element, recognized by an id
//vacationElement is declared for the first time here
function initVacationElementEvents(vacationElement) {
    vacationElement.addEventListener('click', function (event) {
        //First delete the Edit button, so it doesn't stay displayed when clicking on various vacations
        deleteEditButton();
        // with declaring the selectedVacationId variable, we assign it a value of that id, which we managed to retrieve earlier in the line: resultEl.setAttribute ('id, vacation.id), we retrieved it from JS, into the html
        // In this case the evet.target.id is the id that we have passed to our html element from the JS (from a property of our vacation in our published vacation array) 
        // We declare this variable for a better readibility, so we don't later compare to event.target.id
        // Besides better readibility, it is declared as selectedVacationID in order to be used also globally - in the rating for example, we put this selectedVacationId also on the top of the scriptfor it to be visible globally, if we use event.target.id there's no way of retrieving it to the global scope
        selectedVacationId = event.target.id;
        // now we declare a vacationToDisplay variable and we assign it a value of that vacation from our publishedVacations array, which fits the criteria (id)
        //find function is similar to the filter function, but what it does is that it loops over an array and stops once it found that one result - makes sense in this case, because we will only point at one vacation with a unique
        var vacationToDisplay = findVacationById(selectedVacationId, userVacations);
        //after this function is run, the vacationWeAreLookingFor becomes the (vacation) and that becomes vacationToDisplay, which we now use:

        //the following line says basically: if vacationToDisplay is not undefined and if the length of pins of that vacaion is > 0, then initialize map, with that particular vacation's pins
        if (vacationToDisplay && vacationToDisplay.pins.length) {

            var mapTitle = document.getElementById('titleDisplayed');
            mapTitle.innerHTML = "<h5>Title</h5> " + vacationToDisplay.title;
            

            
            initMap(vacationToDisplay.pins);
            
            store(vacationToDisplay, "currentVac");
            function initMap(pins) {
                // Set start location variable --> location where map opens at first
                var MapPosition = {
                    lat: vacationToDisplay.center.lat,
                    lng: vacationToDisplay.center.lng
                };

                // Fill map variable with initialized map and set start location and zoom level
                //this basically says fill the map element in the html with a map
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: MapPosition,
                    zoom: vacationToDisplay.zoom
                });
                // We're calling it a mapElement, because it only appears together with the map
              

                var mapElement = document.getElementById('editVacation');
                var newElement = document.createElement('button');
                newElement.innerHTML = '<div input type ="button"> Edit this vacation </div>';

                mapElement.appendChild(newElement);
                

                //then we loop over the pins of the particular map and "set"/"create" new pins on this map accordingly
                markers = [];
                for (var i = 0; i < pins.length; i++) {
                    var pin = pins[i];
                    markers[i] = new google.maps.Marker({
                        position: pin.latlng,
                        map: map,
                        title: pin.name,
                        comment: pin.comment,
                        type: pin.type
                    });

                    updateInfoWindow(map, markers[i], pin.name, pin.comment, pin.type);
                }
                
                document.getElementById("toggle").style.display = "inline";   
            }
           
            var mapDescription = document.getElementById('description');
            mapDescription.innerHTML = "<h5>Description</h5> " + vacationToDisplay.description

        } else {
            //otherwise, if there was a map from the previous result, delete it, don't display any map if there are no pins
            deleteMap();
            console.error('The map with id:' + vacationToDisplay.id + ' doesn\'t have any pins');


        }
    });
}


function deleteEditButton(){
    var mapElement = document.getElementById('editVacation');
    var newElement = document.createElement('button');
    mapElement.innerHTML = '';
    newElement.innerHTML = '';  
}


//function that will initialize a map, passing it a parameters of pins, which will be pins of the particular map that matches our criteria


function updateInfoWindow(map, pin, name, comment, type) {

    // We have to rebuild an infowindow (name, comment, type) - elements and the values
    var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

    // updating info window
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // mouseover and mouseout event listeners to show the info window on a hover
    pin.addListener('mouseover', function () {
        infowindow.open(map, this);
    });

    pin.addListener('mouseout', function () {
        infowindow.close();
    });
}

// Bind the button from HTML to a variable for later use    
var createVac = document.getElementById("createVac");
//make a function to save to createVac, when button is clicked
createVac.onclick = function () {
    //redirecting to create vaction page
    window.location = "createVacations_pins.html";

    //Return true to jump out of the function, since we now have all we need.
    return true;
}


// Bind the button from HTML to a variable for later use    
var editVacation = document.getElementById("editVacation");
//make a function to save to logout, when button is clicked
editVacation.onclick = function () {
    //redirecting to edit page
    window.location = "editVacation.html";

    //Return true to jump out of the function, since we now have all we need.
    return true;
}