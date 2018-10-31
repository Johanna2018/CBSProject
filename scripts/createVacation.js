// Initialize an empty array
// var vacations = [
//     {Title: "Title", 
//     Description: "description", 
//     Pins: [], 
//     isSelected: false},
//     {Title: "XX", 
//     Description: "XX", 
//     Pins: [], 
//     isSelected: false},
//     {Title: "YY", 
//     Description: "YY", 
//     Pins: [], 
//     isSelected: false}
// ];

var users = getStorage("users");
var currentUser = getStorage("currentUser");

// Bind the button to a variable for later use
var saveVac = document.getElementById("saveVac");

// Bind the onClick-function to our own function --> could also use an Event listener
saveVac.onclick = function(){

    // Bind the input fields and get the value
    var title = document.getElementById("vacTitle").value;
    var description = document.getElementById("vacDescription").value;
    var pins = [];
    var isSelected = true;
   
// push the new vacation in the vacations array, new Vacation makes it part of the Vacation class   
// vacations.push(new Vacation(title, description, pins, isSelected));

var newVacation = {title, description, pins, isSelected};
// vacations.push(newVacation);

//push newVacation into vacations array in currentUser Object 
currentUser.vacations.push(newVacation);

//update changes of user in users array
users[currentUser.index] = currentUser;

//store updated vacations array in local storage, store(y, keyname) 
//keyName --> make sure keyName is always String, need to remember for later use, y --> array
// store(vacations, "vacations");


//store updated users array in local storage, make sure keyName is always String!
//keyName --> you need it to recall it later!
store(users, "users");

//store updated currentUser object in local storage, make sure keyName is always String! 
//keyName --> you need it to recall it later!
store(currentUser, "currentUser");
}







