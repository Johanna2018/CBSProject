// alert("connected");

// Now we get all of the saved vacations from the local storage - it works that way that everything needs to be retrieved and then we can filter     
var vacationsFromLocalStorage = getStorage('allVac');
// at this point, vacationsFromLocalStorage are objects, but they are not Vacation objects

// 1st option: more dummy way of converting vacationsFromLocalStorage into Vacation objects
// for (var i = 0; i < this.vacationsFromLocalStorage.length; i++) {
//     var vacation = vacationsFromLocalStorage[i];

//     vacation = new Vacation(vacation.id, vacation.title, vacation.description, vacation.pins, vacation.isSelected, vacation.isPublished, vacation.tags, vacation.ratings);
// }

// 2nd option: more elegant way of doing the same thing, looping over vacationsFromLocalStorage, vacation being vacationsFromLocalStorage [i],
// takes the vacationsFromLocalStorage and overwrites it to become Vacation objects with the same properties 
// this is done because we want to be able to use the functionality from the class (the calculation of the average), if we didn't do it, that function would be
// undefined
var allVacations = vacationsFromLocalStorage.map(function (vacation) {
    return new Vacation(vacation.id, vacation.title, vacation.description, vacation.pins, vacation.isSelected, vacation.isPublished, vacation.tags, vacation.ratings, vacation.center, vacation.zoom);
});

console.log('allVacations', allVacations);


//declare some of the variables that need to be used in the global scope
var selectedVacationId;
var filterValue;
// we declare a published vacation variable and then with the help of filter function (it's from the JS API, there are different ones such as Browser APIs, web APIs) we filter through allVacations and call a function which will return all of those that have the boolean published set to true and form an array of objects out of it
//function(vacation) - the vacation in this case is literally just a name we are declaring at the same time as we are writing the function, it only exists in the scope of the callback function of the filter

//The following would do the exact same thing as the filter function
// var publishedVacations = [];
// for (var i = 0; i < allVacations.length; i++) {
//     var vacation = allVacations[i];
//     if (vacation.isPublished ===true) {
//         publishedVacations.push(vacation);
//     }
// }

var publishedVacations = allVacations.filter(function (vacation) {
    return vacation.isPublished === true;
});


//Even though this is not visible in the code, the filter function creates an array with objects - maps that are published, to test, we use console below

console.log('publishedVacations', publishedVacations);

//We declare a function which will display our search results and will also reset the radio buttons once the Submit button is pressed, Q - why exaclty are we paassing the should reset radios?
function displayElements(shouldResetRadiosAndResetFilterValue) {
    var searchTerm = document.getElementById('mySearch').value.toLowerCase()
    var searchResult = [];
    //If we set the filterValue to zero at the same time when we deselect the radio, it will skip the if statement which executes the filtering below
    if (shouldResetRadiosAndResetFilterValue) {
        //function defined more below in the code, to see how exactly do they reset
        resetFilterRadioButtons();
        filterValue = 0;
    }

    //For loop which will iterate over our array of published vacations
    for (var i = 0; i < publishedVacations.length; i++) {
        //declare a variable which will point to the particular vacation in our array, which will later be complying with our conditions
        var publishedVacation = publishedVacations[i];

        // Now we need to check whether the search term entered on the website matches either one of our titles, or any of our tags
        //Q: indexOf(searchTerm) != -1 means basically only search for tags if index is defined at this point
        //indexOf - what it does is basically checks if our searchTerm has an index in our publishedVacation.tags array (therefore, if it exists in that array)
        if (searchTerm === publishedVacation.title.toLowerCase() || publishedVacation.tags.indexOf(searchTerm) >= 0) {
            //immediately after that, if the match was found, we push the matching publishedVacation into an array searchResults, which we declared earlier as an empty array
            searchResult.push(publishedVacation);
        }
    }

    //We determine what the searchResult will be populated with, if one of the radios by the filter is selected
    //if any value in the filter is selected? Or if we press Filter button?
    if (filterValue) {
        //the search result will in this case be rewritten according to the function that follows is (filter function)
        searchResult = searchResult.filter(function (vacation) {
            //only return the vacations, of which average rating is less or equal the value selected from the radio button
            return vacation.getAverageRatings() <= filterValue;
        });
    }

    // now we need another if-else statement, which will decide what to do with our results - searchResults array
    // TODO:figure out how to do something else if the search term doesn't match - display "no results"

    // the following if statement means, if the searchResult array is empty (it is in the initial state, the if statement that searches for title or tags has failed and array is still empty) the 0 is literally just the number of elements in this array
    if (searchResult.length === 0) {
        // TODO: Make this one prettier
        alert('No results');
        // we proceed to what happens if our searchResult array has been populated
    } else {
        // Display the searchResult , which at this point is not filtered, just the regular search result

        // 1. We need a place to display our results XX
        // 2. We need to loop over all searchResults XX
        // 3. Create a new HTML element
        // 3.1 Add innerHTML content to that element

        //we select the html div part which has an Id "searchResult" in the discover.html and declare that it is currently empty, this helps empty it out with each new search
        document.getElementById('searchResult').innerHTML = ''

        //then we iterate over the populated searchResult array
        for (i = 0; i < searchResult.length; i++) {
            //we store the value of a particular vacation that is being pointed at in our searchResult array
            var vacation = searchResult[i];
            //console.log('Test')

            //we declare a variable with a value of an html element, we make it a paragraph 'p'(this can be any html element, for example h1)
            var resultEl = document.createElement('p')



            //now we define what should the innerHTML of our resultEl be populated with, which value - in this case it should be filled with the title of the object in a searchResult array and get the average rating
            resultEl.innerHTML = vacation.title + ' ==== (' + vacation.getAverageRatings() + '*)';
            //just a test to see this in the console
            //console.log(resultEl)
            //We set an attribute of our result element which will be the id of the vacation, so we can later call a set of pins particular for the vacation with the corresponding id
            resultEl.setAttribute('id', vacation.id);
            //now we add an event to our element - the result aka title of the vacation, later on we will declare that this event will be a click
            initVacationElementEvents(resultEl);

            //now that the innerHTML of our resultEl has been assigned the correct value to display, we display it in the div section that has the id "searchResult" and with the appendChild method we make sure that it displays the both results (or something like this, it has to be used in this case, will find out why)
            //for every new element found in the loop that corresponds to our condition, add that element to our section (appendChild)
            //Q how does appendChild work?
            document.getElementById('searchResult').appendChild(resultEl)


            // normally, it should look something like this, but this was not working in our case (I can ask Marten again next time)
            // document.getElementById('searchResult').innerHTML = resultEl
        }
    }
}

//The following part determins the two lines of possibilities
//if searchButton is clicked, set shouldResetRadios to true and execute displayElements(shouldResetRadios) function from just before)
var searchButton = document.getElementById('search');
searchButton.addEventListener('click', function () {
    var shouldResetRadios = true;
    displayElements(shouldResetRadios);
});

//if the filterButton was pressed
var filterButton = document.getElementById('filter');
filterButton.addEventListener('click', function () {
    //we declare a variable pointing at each radio button, to have it as an array, which we will use in the next step
    var filterRadios = document.getElementsByName('filterChoice');


    //Get the value from the radio selected
    for (var i = 0; i < filterRadios.length; i++) {
        if (filterRadios[i].checked) {
            //parseFloat, so we are able to compare it to the value of the rating, so they are both numbers with two decimals
            filterValue = parseFloat(filterRadios[i].value);
            break;
        }
    }
    //we set the shouldResetRadios to false, because at this point, we don't need to reset them, when the Filterbutton was pressed and it will skip the if statement in our displayElements function
    var shouldResetRadios = false;
    //execute the displayElements function, to show the clickable results assigned values of a particular vacation based on id etc...
    displayElements(shouldResetRadios);
});

//function that determines how to reset the filter buttons
function resetFilterRadioButtons() {
    var filterRadios = document.getElementsByName('filterChoice');

    for (var i = 0; i < filterRadios.length; i++) {
        filterRadios[i].checked = false;
    }
}


//In this part, the resultEl becomes vacationElement, but it is essentially the same thing, and has the same value, it's just better to use a different name now, because in the following function and piece of code it is basically not a result element anymore, it will become a particular vacation element, recognized by an id
//vacationElement is declared for the first time here

//Q not sure about this following 3 lines?
function initVacationElementEvents(vacationElement) {
    vacationElement.addEventListener('click', function (event) {
       //the following resets the map everytime the search result is clicked (in case there's map without pins which won't display, so the previous one doesn't stay on the display)
        deleteMap();

        // with declaring the selectedVacationId variable, we assign it a value of that id, which we managed to retrieve earlier in the line: resultEl.setAttribute ('id, vacation.id), we retrieved it from JS, into the html
        // In this case the evet.target.id is the id that we have passed to our html element from the JS (from a property of our vacation in our published vacation array) 
        // We declare this variable for a better readibility, so we don't later compare to event.target.id
        // Besides better readibility, it is declared as selectedVacationID in order to be used also globally - in the rating for example, we put this selectedVacationId also on the top of the scriptfor it to be visible globally, if we use event.target.id there's no way of retrieving it to the global scope
        selectedVacationId = event.target.id;
        // now we declare a vacationToDisplay variable and we assign it a value of that vacation from our publishedVacations array, which fits the criteria (id)
        //find function is similar to the filter function, but what it does is that it loops over an array and stops once it found that one result - makes sense in this case, because we will only point at one vacation with a unique

        // do I get this right? - set the value of this variable with the find function, and we pass it two arguments - first, from which vacation to take the data and second, where to look for in which array
        var vacationToDisplay = findVacationById(selectedVacationId, publishedVacations);
        //after this function is run, the particular vacation with particular id becomes vacationToDisplay, which we now use:

        //the following line says basically: if vacationToDisplay is not undefined and if the length of pins of that vacaion is > 0, then initialize map, with that particular vacation's pins
        if (vacationToDisplay && vacationToDisplay.pins.length) {


            var mapTitle = document.getElementById('titleDisplayed');
            mapTitle.innerHTML = "<h5>Title</h5> " + vacationToDisplay.title;


            initMap(vacationToDisplay.pins);
           
            // TO DO TOGGLE
           // document.getElementById("toggle").style.display = "inline";

            //function that will initialize a map, passing it a parameters of pins, which will be pins of the particular map that matches our criteria, was moved to this scope in order to get the particular zoom and centre
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

                //then we loop over the pins of the particular map and "set"/"create" new pins on this map accordingly
                for (var i = 0; i < pins.length; i++) {
                    var pin = pins[i];
                    var marker = new google.maps.Marker({
                        position: pin.latlng,
                        map: map,
                        title: pin.name,
                        comment: pin.comment,
                        type: pin.type
                    });

                    updateInfoWindow(map, marker, pin.name, pin.comment, pin.type);
                }

                //---------------------------------------------------------------------------------------------------
                //The following part starts on the rating part
                //we call the variable mapElement, because we are tying it to the map, it only appears when a map appears
                var mapElement = document.getElementById('rating');
                var newElement = document.createElement('div');
                newElement.innerHTML = '<h5>Please rate this map</h5> <div><input type ="radio" name="rating" value="1">1 <input type ="radio" name="rating" value="2">2 <input type ="radio" name="rating" value="3">3 <input type ="radio" name="rating" value="4">4 <input type="radio" name="rating" value="5">5 <input class="rate-button" type="submit" value="Rate"></div>';

                mapElement.appendChild(newElement);
                addRatingEvent();
            }

            //TODO TOGGLE
            // var entriesHidden = true;
            // var toggle = document.getElementById("toggle");
            // toggle.onclick = function () {

            //     //set event as an empty string, to use it later
            //     var event = "";

            //     // If entries are not shown, we will have the event mouseover to show all the markers.
            //     if (entriesHidden)
            //         event = "mouseover";
            //     // If entries are shown, we will have the event mouseout to hide all markers.
            //     else
            //         event = "mouseout";

            //     for (var i = 0; i < vacationToDisplay.pins.length; i++) {
            //         google.maps.event.trigger(vacationToDisplay.pins[i], event);

            //     }

            // }

            var mapDescription = document.getElementById('description');
            mapDescription.innerHTML = "<h5>Description</h5> " + vacationToDisplay.description;

        } else {
            //otherwise, if there was a map from the previous result, delete it, don't display any map if there are no pins
            deleteMap();
            console.error('The map with id:' + vacationToDisplay.id + ' doesn\'t have any pins');

        }

    });
}



//function that finds the vacation by ID in order to be used multiple places, vacationList in this case is the array we pass it when currently working with it, either publishedVacation or AllVacations
function findVacationById(vacationId, vacationList) {
    //Q what is the vacation parameter in this case? - filter, find, map are similar, because they use callbacks it could be broken down the same way
    return vacationList.find(function (vacation) {
        //What the next line esentially does, is following
        // if vacation.id == vacationId
        //     return vacation - and store the value of that particular vacation in the vacationToDisplay variable
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



// TODO: will need a function which will calculate the average rating from the values in the array, don't know where yet (only at the end by the filter, just before the filter?)


// ratingValue changed from an array to an empty string - will help only allow to rate once?
// In the following function we are working with the allVacations array instead of publishedVacations array, because of how our Local Storage is strucutres, it is the allVacations that need to be updated eventually

function addRatingEvent() {
    //Q. why setting the ratingValue to 0?
    var ratingValue = 0;
    var rateButton = document.getElementsByClassName('rate-button')[0]; //class is not unique, so the function returns an array, therefore we need to tell it which index in this array we want to use, we only have one, so 0 in our case
    rateButton.addEventListener('click', function () {

        var radios = document.getElementsByName("rating");
        //Q. we literally just loop over the radios below the map?
        for (var i = 0; i < radios.length; i++) {
            //if one of the radios is checked, ratingValue becomes value of that radio
            if (radios[i].checked) {
                ratingValue = radios[i].value;
                break;
            }
        }

        if (ratingValue > 0) {
            //what this function takes as an argument is simply the ID of the vacation we're working with right now and the array in which want to search for it
            var vacation = findVacationById(selectedVacationId, allVacations);
            var parsedRatingValue = parseInt(ratingValue, 10);
            // There is a shorter way to execute the conversion to a number, by adding "+" in front of the value of the string // (in this case ratingValue)  parseInt('44', 10) --> 44 ; vs +'44' ---> 44
            //push the parsed value (now number) to the vacation.ratings array
            vacation.ratings.push(parsedRatingValue);
            //overwrite in the local storage
            store(allVacations, 'allVac');

            //afterwards, fill the 'rating' element with te message
            var mapElement = document.getElementById('rating');
            mapElement.innerHTML = '<h4>Thanks for your rating</h4>';
        } else {
            alert('Rate yo! 🤔');
        }
    })
}

// Implement some sort of message in case the user has already rated such as:
// else {
//     alert("You have already rated this vacation");
// }

//The following section just displays the info windows for particular pins
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