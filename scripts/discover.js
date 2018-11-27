var currentUser = getStorage("currentUser");

// Now we get all of the saved vacations from the local storage - it works that way that everything needs to be retrieved and then we can filter     
var vacationsFromLocalStorage = getStorage('allVac');
// at this point, vacationsFromLocalStorage are objects, but they are not Vacation objects

// 1st option: longer way of converting vacationsFromLocalStorage into Vacation objects
// for (var i = 0; i < this.vacationsFromLocalStorage.length; i++) {
//     var vacation = vacationsFromLocalStorage[i];
//     vacation = new Vacation(vacation.id, vacation.title, vacation.description, vacation.pins, vacation.isSelected, vacation.isPublished, vacation.tags, vacation.ratings);
// }

// 2nd option: more elegant way of doing the same thing, looping over vacationsFromLocalStorage, vacation being vacationsFromLocalStorage [i],
// takes the vacationsFromLocalStorage and overwrites it to become Vacation objects with the same properties 
// this is done because we want to be able to use the functionality from the class (the calculation of the average), if we didn't do it, that function would be
// undefined
var allVacations = vacationsFromLocalStorage.map(function (vacation) {
    return new Vacation(vacation.id, vacation.title, vacation.description, vacation.pins, vacation.isPublished, vacation.tags, vacation.ratings, vacation.center, vacation.zoom);
});



//declare some of the variables that need to be used in the global scope
var selectedVacationId;
var filterValue;
var markers;

// Now we declare a published vacation variable and then with the help of filter function 
//we filter through allVacations,return all of those that have the boolean published set to true and form an array of objects out of it


//function(vacation) - the vacation in this case is literally just a name we are declaring at the same time as we are writing the function, 
//it only exists in the scope of the callback function of the filter

var publishedVacations = allVacations.filter(function (vacation) {
    return vacation.isPublished === true;
});

//The following would do the exact same thing as the filter function
// var publishedVacations = [];
// for (var i = 0; i < allVacations.length; i++) {
//     var vacation = allVacations[i];
//     if (vacation.isPublished ===true) {
//         publishedVacations.push(vacation);
//     }
// }


//Even though this is not visible in the code, the filter function creates an array with objects - maps that are published, to test, use console.log


//We declare a function which will display our search results and will also reset the radio buttons once the Submit button is pressed
function displayElements(shouldResetRadiosAndResetFilterValue) {
    var searchTerm = document.getElementById('mySearch').value.toLowerCase()
    var searchResult = [];
    //If we set the filterValue to zero at the same time when we deselect the radio, it will skip the if statement which executes the filtering below
    if (shouldResetRadiosAndResetFilterValue) {
        //function defined more further in the code
        resetFilterRadioButtons();
        filterValue = 0;
    }

    //For loop which will iterate over our array of published vacations
    for (var i = 0; i < publishedVacations.length; i++) {
        //declare a variable which will point to the particular vacation in our array, 
        //which will later be checked for complying with our conditions
        var publishedVacation = publishedVacations[i];

        // Now we need to check whether the search term entered on the website matches either one of our titles, 
        //or any of our tags // indexOf - what it does, is basically checks if our searchTerm has an index in our 
        //publishedVacation.tags array (therefore, if it exists in that array)
        if (searchTerm === publishedVacation.title.toLowerCase() || publishedVacation.tags.indexOf(searchTerm) >= 0) {
            //push the matching publishedVacation into an array searchResults
            searchResult.push(publishedVacation);
        }
    }

    //We determine what the searchResult will be populated with, if one of the radios by the filter is selected
    if (filterValue) {
        //the search result will in this case be filtered according to the condition we pass when we specify what to return
        searchResult = searchResult.filter(function (vacation) {
            //only return the vacations, of which average rating is less or equal the value selected from the radio button
            return vacation.getAverageRatings() >= filterValue;
        });
    // }else{
    //     searchResult = [];
    }

    // Now we need another if-else statement, which will decide what to do with our results - searchResults array

    // the following if statement means, if the searchResult array is empty the 0 is literally just the number of elements in this array
    if (searchResult.length === 0) {
        alert('No results');
        // we proceed to what happens if our searchResult array has been populated
    } else {
        // Display the searchResult list
        // 1. We need a place to display our results
        //we select the html part we reserved in html for the results and declare that it is currently empty, this helps empty it out with each new search
        document.getElementById('searchResult').innerHTML = ''
      
        // 2. We need to loop over all searchResults 
        for (i = 0; i < searchResult.length; i++) {
            //we store the value of a particular vacation that is being pointed at in our searchResult array
            var vacation = searchResult[i];

            // 3. Create a new HTML element
            //we declare a variable with a value of an html element, we make it a paragraph 
            //'p'(this can be any html element, for example h1)
            var resultEl = document.createElement('p')

            // 3.1 Add innerHTML content to that element
            //now we define what should the innerHTML of our resultEl be populated with, which value
            resultEl.innerHTML = vacation.title + ' ==== (' + vacation.getAverageRatings() + '*)';

            //We set an attribute of our result element which will be the id of the vacation, so we can later call a set of pins particular for the vacation with the corresponding id
            resultEl.setAttribute('id', vacation.id);
            //now we add an event to our element - the result aka title of the vacation, later on we will declare that this event will be a click
            initVacationElementEvents(resultEl);

            //now that the innerHTML of our resultEl has been assigned the correct value to display, we display it in the div section with the id "searchResult"
            //for every new element found in the loop that corresponds to our condition, add that element to our section (appendChild)
            document.getElementById('searchResult').appendChild(resultEl)
        }
    }
}

//The following part determins the two lines of possibilities
//if searchButton is clicked, set shouldResetRadios to true and execute displayElements(shouldResetRadios)function
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
            //store the value of the checked radio in a variable
            //parseFloat, so we are able to compare it to the value of the rating, so they are both numbers with two decimals
            filterValue = parseFloat(filterRadios[i].value);
            break;
        }
    }
    //we set the shouldResetRadios to false, because at this point, we don't need to reset them, when the Filterbutton was pressed and it will skip the
    //the corresponding if statement in our displayElements function
    var shouldResetRadios = false;
    //execute the displayElements function, to show the clickable results assigned values of a particular vacation based on id etc...
    displayElements(shouldResetRadios);
});

//function that determines how to reset the filter radio buttons
function resetFilterRadioButtons() {
    var filterRadios = document.getElementsByName('filterChoice');

    for (var i = 0; i < filterRadios.length; i++) {
        filterRadios[i].checked = false;
    }
}


//In this part, the resultEl becomes vacationElement, but it is essentially the same thing, and has the same value, it's just better to use a different name now,
//because in the following function it is basically not a result element anymore, it will become a particular vacation element, recognized by an id


function initVacationElementEvents(vacationElement) {
    vacationElement.addEventListener('click', function (event) {
        //the following resets the map everytime the search result is clicked (in case there's map without pins which won't display, so the previous one doesn't stay on the display)
        
        deleteMap();

        // with declaring the selectedVacationId variable, we assign it a value of the id of our target, which we set as an attribute earlier 
        // the value of evet.target.id is the id that we have passed to our html element from the JS (from a property of our vacation in our published vacation array) 
        // the variable is declared in order to be used also globally, if we use event.target.id there's no way of retrieving it to the global scope
        selectedVacationId = event.target.id;

        //find function is similar to the filter function, but what it does is that it loops over an array and stops once it found that one result 
        //- makes more sense in this case, because we will only point at one vacation with a unique ID
        var vacationToDisplay = findVacationById(selectedVacationId, publishedVacations);
        //after this function is run, the particular vacation with particular id becomes vacationToDisplay, which we now use:

            
            var mapTitle = document.getElementById('titleDisplayed');
            mapTitle.innerHTML = "<h5>Title</h5> " + vacationToDisplay.title;

            var mapDescription = document.getElementById('description');
            mapDescription.innerHTML = "<h5>Description</h5> " + vacationToDisplay.description;

            var tagsElement = document.getElementById("tags");
            tagsElement.innerHTML= "<h5>Tags: </h5>" +vacationToDisplay.tags;
           
            displayVacAndRating(vacationToDisplay.pins);

            
            //function that will initialize a map, passing it a parameters of pins, which will be pins of the particular map that matches our criteria
            function displayVacAndRating() {
                // Set start location variable --> location where map opens
                retrieveMapPositionAndPins(vacationToDisplay);
                
    
                //Now we create an element which will enable us to rate the map
                //we call the variable mapElement, because we are tying it to the map, it only appears when a map appears
                var mapElement = document.getElementById('rating');
                var newElement = document.createElement('div');
                newElement.innerHTML = '<h5>Please rate this map</h5> <div><input type ="radio" name="rating" value="1">1 <input type ="radio" name="rating" value="2">2 <input type ="radio" name="rating" value="3">3 <input type ="radio" name="rating" value="4">4 <input type="radio" name="rating" value="5">5 <input class="rate-button" type="submit" value="Rate"></div>';

                mapElement.appendChild(newElement);
                addRatingEvent();

               
            }

            document.getElementById("toggle").style.display = "inline";

    });
}



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



