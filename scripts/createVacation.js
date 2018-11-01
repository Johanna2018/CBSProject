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
   //TODO: what is mapPosition and zoom? How can I get it?
    // var mapPosition = "";
    // var zoom = "";
    // var pins = [];
    var isSelected = false;
    if (document.getElementById("publish").checked == true){
        var isPublished = true;
    }
    //get input from tag input in HTML, .split splits the input after whatever you put in here ("")
    var tags = document.getElementById("tags").value.split(",");
    
   
        
// push the new vacation in the vacations array, new Vacation makes it part of the Vacation class  
//TODO: put mapPosition and zoom and pins in here 
var currentVac = (new Vacation(title, description, isSelected, isPublished, tags));

//push newVacation into vacations array in currentUser Object 
currentUser.vacations.push(currentVac);

//update changes of user in users array
users[currentUser.index] = currentUser;

// store new vacation in local storage, store(y, keyname) 
// keyName --> make sure keyName is always String, need to remember for later use, y --> variable 
store(currentVac, "currentVac");


//store updated users array in local storage, make sure keyName is always String!
//keyName --> you need it to recall it later!
store(users, "users");

//store updated currentUser object in local storage, make sure keyName is always String! 
//keyName --> you need it to recall it later!
store(currentUser, "currentUser");
}







