//get the currently logged in user object from local storage with the keyName (always string)
var currentUser = getStorage("currentUser");
//get the users array from local storage with the keyName (always string)
var users = getStorage("users");

//fill input fields with the user information
document.getElementById("wholeName").value = currentUser.name;
document.getElementById("username").value = currentUser.username;
document.getElementById("user-description").value = currentUser.description;

// property gender is saved as an string in object, we need to transfer it back into radio button
//radios is an array because radio buttons have all the same name
var radios = document.getElementsByName("gender-choice");
//loop over the radio button array
for (var i = 0; i < radios.length; i++){
    // if one of the buttons has the value which equals the gender
   if (radios[i].value == currentUser.gender){
    // check this button
    radios[i].checked = true;
    // only one radio can be logically checked, don't check the rest
    break;
   }
  }


// Bind the button from HTML to a variable for later use  
var saveChanges = document.getElementById("saveChanges");
// Bind the span for result text for later use
var resultSpanChange = document.getElementById("changeResult");

//make a function to save the changes of the profile information, when button is clicked
saveChanges.onclick = function(){
    //upadte the properties of the currentUser with input
    currentUser.name = document.getElementById("wholeName").value;
    currentUser.username = document.getElementById("username").value;
    currentUser.description = document.getElementById("user-description").value;

    //radios is an array because radio buttons have all the same name
    var radios = document.getElementsByName("gender-choice");
    //loop over the radio buttons because we need to get the value from the radio button that is checked 
    for (var i = 0, length = radios.length; i < length; i++){
        if (radios[i].checked){
    // assign value from checked radio button to gender
    currentUser.gender = radios[i].value;
    // only one radio can be logically checked, don't check the rest
    break;
   }
  }

    //update changes of user in users array
    // Loop over users array to find the object with the same id and set it to currentUser
    for(i = 0; i < users.length; i++){
        if(currentUser.id === users[i].id){
            users[i] = currentUser;
        }
    } 
    
    //store updated users array in local storage, make sure keyName is always String!
    //keyName --> you need it to recall it later!
    store(users, "users");

    //store updated currentUser object in local storage, make sure keyName is always String! 
    //keyName --> you need it to recall it later!
    store(currentUser, "currentUser");

    //Show message in result Span, to user can see that changes are saved.
    resultSpanChange.innerText = "Your changes have been saved!";

    //Return true to jump out of the function, since we now have all we need.
    return true;
}

//TODO: Changing password
// // Bind the button from HTML to a variable for later use  
// var savePassword = document.getElementById("savePassword");
// //make a function to save the changes of password, when button is clicked
// savePassword.onclick = function(){
//     var password = document.getElementById("password").value;
//     var newPassword = document.getElementById("newPassword").value;
//     var confirmNewPassword = document.getElementById("confirmNewPassword").value;

//     if(currentUser.password === password && newPassword && newPassword === confirmNewPassword) {}}
        

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