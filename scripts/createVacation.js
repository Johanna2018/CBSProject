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

// var publishedVac = getStorage("publishedVac");
// Henrik said it is smarter to have an array with all vacations and find the published ones with a loop (isPubished)
var allVac = getStorage("allVac");
  
// // if the localStorgae is empty, because we came directly to login (without registration), we need to fill the users array with hardcoded users
// if (publishedVac === null){
//   //Define users as an empty arrayfor later --> to store published vacations in localStorage, because you cannot push into an variable which is null
//   var publishedVac = [];}

// if the localStorgae is empty, because we came directly to login (without registration), we need to fill the users array with hardcoded users
if (allVac === null){
    //Define users as an empty array for later --> to store all vacations in localStorage, because you cannot push into an variable which is null
    var allVac = [];}

// Bind the button to a variable for later use
var saveVac = document.getElementById("saveVac");

// Bind the onClick-function to our own function --> could also use an Event listener
saveVac.onclick = function(){

// Put it in util 
//  function getNextId(){
//     // TODO: Make this work!!!
//     // Generate an ID with function
//     var max = 0;
//     // Loop over array 
//     // Make sure when calling this function that the array filled with data from localStorage
//     for(i = 0; i < allVac.length; i++){
//         // Find the biggest id and add one
//             if(allVac[i].id >= max){
//                 max = allVac[i].id + 1;
//             }
        
//     }
//     return max;
// }

    // generated ID with getNextId function (in util.js defined)
    var id = getNextId(allVac);
    

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
    //makes automatically an array out of it
    var tags = document.getElementById("tags").value.split(",");
    
    
   
        
// push the new vacation in the vacations array, new Vacation makes it part of the Vacation class  
//TODO: put mapPosition and zoom and pins in here 
var currentVac = new Vacation(id, title, description, isSelected, isPublished, tags);

//push newVacation into vacations array in currentUser Object 
currentUser.vacations.push(currentVac);
allVac.push(currentVac);


//update changes of currentVac in currentUser.vacations array
// currentUser.vacations.id[currentVac.id] = currentVac;

//TODO: this will be needed when we want to edit vacations
// currentUser.vacations[currentVac.index] = currentVac
  
//     // Bind user to a variable for easy use
//     var user = users[i];
//  //set property of user object to i, so it can be used to find the current user later in users array
//  user.index = i;

// store new vacation in local storage, store(y, keyname) 
// keyName --> make sure keyName is always String, need to remember for later use, y --> variable 
store(currentVac, "currentVac");

// //we store the publishedVac array in the local storage
// // store new vacation in local storage, store(y, keyname) 
// // keyName --> make sure keyName is always String, need to remember for later use, y --> array 
// store(publishedVac, "publishedVac");

//we store the allVac array in the local storage
// store new vacation in local storage, store(y, keyname) 
// keyName --> make sure keyName is always String, need to remember for later use, y --> array 
store(allVac, "allVac");

//store updated currentUser object in local storage, make sure keyName is always String! 
//keyName --> you need it to recall it later!
store(currentUser, "currentUser");

//update changes of user in users array
users[currentUser.index] = currentUser;

//store updated users array in local storage, make sure keyName is always String!
//keyName --> you need it to recall it later!
store(users, "users");

}

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