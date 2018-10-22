//get user object from local storage
// var user = JSON.parse(localStorage.getItem("currentUser"));

//loop over users array to see which user is logged in
for(var i = 0; i < users.length; i++){
    if(users[i].isLoggedIn = true){
        var currentUser = users[i];
    }
}

//fill input fields with the user information
document.getElementById("wholeName").value = currentUser.name;
document.getElementById("username").value = currentUser.username;
//TODO: Is not working right. Check what is the problem!
    if (currentUser.gender = "Male"){
        document.getElementById("genderMale").checked = true;
    } 
    if (currentUser.gender = "Female"){
        document.getElementById("genderFemale").checked = true;
    } 
    if (currentUser.gender = "Other"){
        document.getElementById("genderOther").checked = true;
    }

document.getElementById("user-description").value = currentUser.description;

// Bind the button to a variable for later use  
var saveChanges = document.getElementById("saveChanges");
// Bind the span for result text for later use
var resultSpanChange = document.getElementById("changeResult");

saveChanges.onclick = function(){
    currentUser.name = document.getElementById("wholeName").value;
    currentUser.username = document.getElementById("username").value;
    currentUser.gender ="";
  // TODO: Could use also drop down? Something different than if statements?
  //Give inputGender a value, go through the radio buttons and look which is clicked
    if(document.getElementById("genderMale").checked) {
        gender = "Male";
    }
    if(document.getElementById("genderFemale").checked) {
        gender = "Female";
    } 
    if (document.getElementById("genderOther").checked) {
        gender = "Other";
    }
    currentUser.description = document.getElementById("user-description").value;

    //Show message in result Span, to user can see that changes are saved.
    resultSpanChange.innerText = "Your changes have been saved!";

    //Return true to jump out of the function, since we now have all we need.
    return true;
}
    
var logout = document.getElementById("logout");
logout.onclick = function(){
    //set variable isLoggedIn to false
    currentUser.isLoggedIn = false;
    
    //redirecting to log out page
    window.location = "logout.html"; 
  
    //Return true to jump out of the function, since we now have all we need.
    return true;
}