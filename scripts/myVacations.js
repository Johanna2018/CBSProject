// Bind the button from HTML to a variable for later use    
var createVac = document.getElementById("createVac");
//make a function to save to createVac, when button is clicked
createVac.onclick = function(){
    //redirecting to create vaction page
    window.location = "createVacation.html"; 
  
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