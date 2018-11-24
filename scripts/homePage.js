//get the currently logged in user from local storage with the keyName (always string), to update data later
var currentUser = getStorage("currentUser");

// Bind the button from HTML to a variable for later use    
var myVac = document.getElementById("myVac");
//create onclick function on button
myVac.onclick = function () {
    //redirecting to myVactions page
    window.location = "myVacations.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}

// Bind the button from HTML to a variable for later use    
var profile = document.getElementById("profile");
//create onclick function on button
profile.onclick = function () {
    //redirecting to profile page
    window.location = "profile.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}

// Bind the button from HTML to a variable for later use    
var discover = document.getElementById("discover");
//create onclick function on button
discover.onclick = function () {
    //redirecting to profile page
    window.location = "discover.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}

// Bind the button from HTML to a variable for later use    
var logout = document.getElementById("logout");
//create onclick function on button
logout.onclick = function () {
    //set variable isLoggedIn to false
    currentUser.isLoggedIn = false;

    //redirecting to log out page
    window.location = "logout.html";

    //Return true to jump out of the function, since we now have all we need
    return true;
}