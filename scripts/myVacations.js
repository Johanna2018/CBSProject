
//1. Get the data from a local storage - currentUser
//2. Access the property vacation


var currentUser = getStorage('currentUser');
var userVacations = currentUser.vacations || [];
var markers;


if (userVacations.length === 0) {
    //Display this as a text in html
    alert("You have not saved any vacations");
} else {
    //3. Form a list of all of the vacations titles
    document.getElementById('myVacationsList').innerHTML = ""

    for (i = 0; i < userVacations.length; i++) {

        var vacation = userVacations[i];

        var resultEl = document.createElement('li');

        resultEl.setAttribute('id', vacation.id);
        initVacationElementEvents(resultEl);

        resultEl.innerHTML = vacation.title

        document.getElementById('myVacationsList').appendChild(resultEl)

    }
}

//4. When clicked on the particular title, display the map with the pins that belong to that vacation
//The following function is almost identical with the one in discover.js, with differences when it comes to adding HTML elements
function initVacationElementEvents(vacationElement) {
    vacationElement.addEventListener('click', function (event) {
        //First delete the Edit button, so it doesn't stay displayed when clicking on various vacations
        deleteEditButton();

        //Fint the vacation that was clicked on by ID
        selectedVacationId = event.target.id;

        var vacationToDisplay = findVacationById(selectedVacationId, userVacations);

        //Display HTML elements together with the map
        var mapTitle = document.getElementById('titleDisplayed');
        mapTitle.innerHTML = "<h5>Title</h5> " + vacationToDisplay.title;

        var mapDescription = document.getElementById('description');
        mapDescription.innerHTML = "<h5>Description</h5> " + vacationToDisplay.description

        displayVacAndElements(vacationToDisplay.pins);
        //Store the displayed vacation as a currentVac, in case the user wants to edit it (editVacation script starts with retrieving currentVac)
        store(vacationToDisplay, "currentVac");

        function displayVacAndElements() {


            retrieveMapPositionAndPins(vacationToDisplay);

            document.getElementById("toggle").style.display = "inline";
            //define variables for the edit button, and publish and tags elements
            var editElement = document.getElementById('editVacation');
            var publishElement = document.getElementById("publish");
            var tagsElement = document.getElementById("tags");
            //create the edit button
            var newElementEdit = document.createElement('button');
            //fill in the inner html
            newElementEdit.innerHTML = '<div input type ="button"> Edit this vacation </div>';
            editElement.appendChild(newElementEdit);
            //fill in the publish and tags elements with corresponding inner html
            if (vacationToDisplay.isPublished === true) {
                publishElement.innerHTML = "<h5>Published: </h5>" + "Yes";
            } else {
                publishElement.innerHTML = "<h5>Published: </h5>" + "No";
            }
            tagsElement.innerHTML = "<h5>Tags: </h5>" + vacationToDisplay.tags;

        }
    });
}

//function that deletes the edit button when we click on different vacation on the list
function deleteEditButton() {
    var mapElement = document.getElementById('editVacation');
    var newElement = document.createElement('button');
    mapElement.innerHTML = '';
    newElement.innerHTML = '';
}

//Redirect to creating new vacation after clicking the button
// Bind the button from HTML to a variable for later use    
var createVac = document.getElementById("createVac");

createVac.onclick = function () {
    //redirecting to create vaction page
    window.location = "createVacation.html";

    //Return true to jump out of the function, since we now have all we need.
    return true;
}

//Redirect to edit the displayed vacation after clicking the button

var editVacation = document.getElementById("editVacation");

editVacation.onclick = function () {

    window.location = "editVacation.html";

    return true;
}