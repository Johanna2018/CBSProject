// alert("connected");

// Now we get all of the saved vacations from the local storage - it works that way that everything needs to be retrieved and then we can filter     
var allVacations = getStorage('allVac');
var selectedVacationId;
// we declare a published vacation variable and then with the help of filter function (it's from the JS API, there are different ones such as Browser APIs, web APIs) we filter through allVacations and call a function which will return all of those that have the boolean published set to true and form an array of objects out of it
//function(vacation) - the vacation in this case is literally just a name we are declaring at the same time as we are writing the function, it only exists in the scope of the callback function of the filter
var publishedVacations = allVacations.filter(function(vacation) {
    return vacation.isPublished === true;
});

//Filter the search by a rating (later after the rating has been implemented)
// 1-2 = 2

//  var levels = {
//     one: {
//         min: 1,
//         max: 2
//     },
//     two: {
//         min: 2,
//         max: 3
//     },
//     three: {
//         min: 3,
//         max: 4
//     },
    //  four: {
    //     min: 4,
    //     max: 5
    //     },
//  }

// var radioValue = 'two'

// if radioValue
//     publishedVacations = publishedVacations.filter(function(vacation) {
//         return vacation.rating > levels[radioValue].min && vacation.rating <= levels[radioValue].max
//     });


//Even though this is not visible in the code, the filter function creates an array with objects - maps that are published, to test, we use console below

console.log(publishedVacations);

//------------------------------------------------------------------


var button = document.getElementById("submit");

button.addEventListener("click", function() {
    var searchTerm = document.getElementById("mySearch").value.toLowerCase()
    var searchResult = [];

    //For loop which will iterate over our array of published vacations
    for (var i=0 ; i < publishedVacations.length; i++) {
       //declare a variable which will point to the particular vacation in our array, which will later be complying with our conditions
        var publishedVacation = publishedVacations[i];

        // Now we need to check whether the search term entered on the website matches either one of our titles, or any of our tags
        //TODO clarify what indexOf(searchTerm) != -1 does EXACLTY (accessing a nested item)
        // 
        if (searchTerm === publishedVacation.title.toLowerCase() || publishedVacation.tags.indexOf(searchTerm) != -1) {
            //immediately after that, if the match was found, we push the matching publishedVacation into an array searchResults, which we declared earlier as an empty array
            searchResult.push(publishedVacation);
        }
    }
    // now we need another if-else statement, which will decide what to do with our results - searchResults array
    // TODO:figure out how to do something else if the search term doesn't match - display "no results"
   
    // the following if statement means, if the searchResult array is empty (it is in the initial state, the if statement that searches for title or tags has failed and array is still empty) the 0 is literally just the number of elements in this array
    if (searchResult.length === 0) {
        // TODO: Make this one prettier
        alert("No results");
    // we proceed to what happens if our searchResult array has been populated
    } else {
    // Display our searchResults on screen HTML

    // 1. We need a place to display our results XX
    // 2. We need to loop over all searchResults XX
    // 3. Create a new HTML element
    // 3.1 Add innerHTML content to that element

        //we select the html div part which has an Id "searchResult" in the discover.html and declare that it is currently empty, this helps empty it out with each new search
        document.getElementById('searchResult').innerHTML = ''

        //then we iterate over the populated searchResult array
        for(i=0; i < searchResult.length; i++) {
            //we store the value of a particular vacation that is being pointed at in our searchResult array
            var vacation = searchResult[i];
            //console.log('Test')
            
            //we declare a variable with a value of an html element, we make it a paragraph 'p'(this can be any html element, for example h1)
            var resultEl = document.createElement('p')

            //TODO make this a link instead of just a paragraph, string? from Marten (he says: something along those lines)
            // resultEl.setAttribute?.href = vacation.link
            
            //now we define what should the innerHTML of our resultEl be populated with, which value - in this case it should be filled with the title of the object in a searchResult array
            resultEl.innerHTML = vacation.title
            //just a test to see this in the console
            //console.log(resultEl)
            //We set an attribute of our result element which will be the id of the vacation, so we can later call a set of pins particular for the vacation with the corresponding id
            resultEl.setAttribute('id', vacation.id);
            //now we add an event to our element - the result aka title of the vacation, later on we will declare that this event will be a click
            initVacationElementEvents(resultEl);

            //now that the innerHTML of our resultEl has been assigned the correct value to display, we display it in the div section that has the id "searchResult" and with the appendChild method we make sure that it displays the both results (or something like this, it has to be used in this case, will find out why)
            //for every new element found in the loop that corresponds to our condition, add that element to our section (appendChild)
            document.getElementById('searchResult').appendChild(resultEl)


            // normally, it should look something like this, but this was not working in our case (I can ask Marten again next time)
            // document.getElementById('searchResult').innerHTML = resultEl
        }
    }
// 
})
//In this part, the resultEl becomes vacationElement, but it is essentially the same thing, and has the same value, it's just better to use a different name now, because in the following function and piece of code it is basically not a result element anymore, it will become a particular vacation element, recognized by an id
//vacationElement is declared for the first time here
function initVacationElementEvents(vacationElement) {
    vacationElement.addEventListener('click', function(event) {
       //with declaring the vacationIdWeAreLookingFor variable, we assign it a value of that id, which we managed to retrieve earlier in the line: resultEl.setAttribute ('id, vacation.id), we retrieved it from JS, into the html
       //In this case the evet.target.id is the id that we have passed to our html element from the JS (from a property of our vacation in our published vacation array) 
      //We declare this variable for a better readibility, so we don't later compare to event.target.id
       var vacationIdWeAreLookingFor = event.target.id;
       //Q: What does the following line actually do? How exactly does the variable selectedVacationId work? (IF I COMMENT IT OUT, IT SEEMS LIKE EVERYTHING WORKS)
       selectedVacationId = event.target.id;
        // now we declare a vacationToDisplay variable and we assign it a value of that vacation from our publishedVacations array, which fits the criteria (id)
        //find function is similar to the filter function, but what it does is that it loops over an array and stops once it found that one result - makes sense in this case, because we will only point at one vacation with a unique
        var vacationToDisplay = publishedVacations.find(function (vacation) {
            //What the next line esentially does, is following
            // if vacation.id == vacationIdWeAreLookingFor
            //     return vacation - and store the value of that particular vacation in the vacationToDisplay variable
            return vacation.id == vacationIdWeAreLookingFor;
        });
        //after this function is run, the vacationWeAreLookingFor becomes the (vacation) and that becomes vacationToDisplay, which we now use:

        //the following line says basically: if vacationToDisplay is not undefined and if the length of pins of that vacaion is > 0, then initialize map, with that particular vacation's pins
        if (vacationToDisplay && vacationToDisplay.pins.length) {
            initMap(vacationToDisplay.pins);
        } else {
            //otherwise, if there was a map from the previous result, delete it, don't display any map if there are no pins
            deleteMap();
            console.error('The map with id:' + vacationToDisplay.id +' doesn\'t have any pins');
        }
    });
}

//The function that will delete the map
function deleteMap() {
    var map = document.getElementById('map');
    var mapElement = document.getElementById('rating');
    mapElement.innerHTML = '';
    map.innerHTML = '';
}
//function that will initialize a map, passing it a parameters of pins, which will be pins of the particular map that matches our criteria
function initMap(pins) {
    // Set start location variable --> location where map opens at first
    var MapPosition = {
        lat: 25.048921,
        lng: 9.553599
    };

    // Fill map variable with initialized map and set start location and zoom level
    //this basically says fill the map element in the html with a map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: MapPosition,
        zoom: 2
    });

    //then we loop over the pins of the particular map and "set"/"create" new pins on this map accordingly
    for(var i=0; i < pins.length; i++) {
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
    newElement.innerHTML = '<h5>Please rate this map</h5> <div><input type ="radio" name="rating" value="one">1 <input type ="radio" name="rating" value="two">2 <input type ="radio" name="rating" value="three">3 <input type ="radio" name="rating" value="four">4 <input type="radio" name="rating" value="five">5 <input class="rate-button" type="submit" value="Rate"></div>';
    mapElement.appendChild(newElement);
    addRatingEvent();
}

//TODO create and empty array that will store the value of the ratings,
//This has to become a property in the Vacation class, an array of rating values
// Somewhere, we will need a function which will calculate the average rating from the values in the array, don't know where yet (only at the end by the filter, just before the filter?)
function addRatingEvent() {
    var element = document.getElementsByClassName('rate-button')[0];
    element.addEventListener('click', function(event) {
        var radios = document.getElementsByName("rating");
       
        //1. Assign values to the radio buttons? or they automatically have a value?
        //2. Get the value from the radio button that the user clicked on
        //3. Store the value in an array to start with
        //4. Later implement a new property of the Vacation class - an array of rating values
       
        selectedVacationId
        console.log(radios);
         // if any of the options is selected, get the value
         // update the ratings array by pushing the value
         // update allVacations array and then override them in the localstorage
    })
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------

//The following section just displays the info windows for particular pins
function updateInfoWindow(map, pin, name, comment, type) {

    //We have to rebuild an infowindow (name, comment, type) - elements and the values
    var contentString = "<div id='form'><table><tr> <td>Name: </td><td><b>" + name + "</b></td> </tr><tr><td>Comment: </td> <td><b>" + comment + "</b></td> </tr> <tr><td>Type: </td><td><b>" + type + "</b></table></div>";

    //updating info window
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // mouseover and mouseout event listeners to show the info window on a hover
    pin.addListener('mouseover', function() {
        infowindow.open(map, this);
    });

    pin.addListener('mouseout', function() {
        infowindow.close();
    });

}