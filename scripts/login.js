//use getStorage function (defined in util.js) to get users from local storage --> if someone registered
//assging it to users variable  
//getStorage does the same as: var users = JSON.parse(localStorage.getItem("users"));
var users = getStorage("users");

//store updated users array in local storage with store(y, keyname) function, (defined in util.js)
//keyName --> make sure keyName is always String, need to remember for later use, y --> array
store(users, "users");

// Bind the button from HTML to a variable for later use
var login = document.getElementById("login");

// Bind the span from HTML for result text for later use
var resultSpan = document.getElementById("loginResult");

// Bind a counter in order to see if the user has tried to login too many times
var counter = 3;

// Bind the onclick function to our variable (button)
login.onclick = function () {
  // Bind the two input fields from HTML and get the value
  var inputEmail = document.getElementById("email").value;
  var inputPassword = document.getElementById("password").value;

  //check if something is typed in email input field and password input field
  if (inputEmail.length == 0 || inputPassword.length == 0) {
    // We set the resultspan with a new text and return false to get out of this function
    resultSpan.innerText = "You need to enter your email address and password in order to use the website.";
    return false;
  }

  // We loop through all our users and return true if we find a match
  for (var i = 0; i < users.length; i++) {

    // Bind user to a variable for easy use
    var user = users[i];

    // If username and password we have in put matches the one in our loop
    if (user.email === inputEmail && user.password === inputPassword) {

      //set property isLoggedIn of user object to true, so we can see later (in profile) which user is currently logged in
      user.isLoggedIn = true;

      //store updated users array in local storage with store(y, keyname) function
      //keyName --> make sure keyName is always String, need to remember for later use, y --> array
      store(users, "users");
      //store the logged in user as currentUser in local storage, store(y, keyname) 
      //keyName --> make sure keyName is always String, need to remember for later use, y --> object
      store(user, "currentUser");

      //redirecting to homepage
      window.location = "homePage.html";

      //Return true to jump out of the function, since we now have all we need.
      return true;
    }
  }

  // We check if the user has tried to enter a wrong username and password too many times
  if (counter == 0) {
    // Since the user has tried three times, we let the user know that he's been banned
    resultSpan.innerText = "You've entered the wrong email address and password three times. You are not allowed to log in anymore!";

    // Disable button in order for the user to not make any trouble
    login.disabled = true;

    // Return false to stop us from doing anything further.
    return false;

  } else {
    // Since we did not find a match, we know that the user has typed a wrong password and username
    alert("You've entered a wrong email address or password!");

    // Update the counter with an attempt of logging in
    counter--;

    // Return false, since we do not have anything more to do
    return false;
  }
};