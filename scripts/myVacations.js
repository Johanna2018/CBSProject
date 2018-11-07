// Bind the button from HTML to a variable for later use    
var createVac = document.getElementById("createVac");
//make a function to save to createVac, when button is clicked
createVac.onclick = function(){
    //redirecting to create vaction page
    window.location = "createVacations_pins.html"; 
  
    //Return true to jump out of the function, since we now have all we need.
    return true;
}

// Bind the button from HTML to a variable for later use    
var home = document.getElementById("home");
//make a function to save to home, when button is clicked
home.onclick = function(){
    //redirecting to home page page
    window.location = "homePage.html"; 
  
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