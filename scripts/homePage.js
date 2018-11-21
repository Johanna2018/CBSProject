//get the currently logged in User from local storage with the keyName (always string), to update Data later
var currentUser = getStorage("currentUser");

// Bind the button from HTML to a variable for later use    
var myVac = document.getElementById("myVac");
//make a function to save to createVac, when button is clicked
myVac.onclick = function(){
    //redirecting to myVactions page
    window.location = "myVacations.html"; 
  
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var profile = document.getElementById("profile");
//make a function to save to profile, when button is clicked
profile.onclick = function(){
    //redirecting to profile page
    window.location = "profile.html"; 
  
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var discover = document.getElementById("discover");
//make a function to save to home, when button is clicked
discover.onclick = function(){
    //redirecting to profile page
    window.location = "discover.html"; 
  
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