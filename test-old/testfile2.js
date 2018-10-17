// Bind the button to a variable for later use
var register = document.getElementById("register");

// var newUsers = [];
//whatever is in local storage is assigned to var newUsers
var newUsers = [];

// if(JSON.parse(localStorage.getItem("users")) !== null){
// newUsers.push(JSON.parse(localStorage.getItem("users")));
// }



// push all elements that are stored in local storage into the newUsers array
    Array.prototype.push.apply(newUsers, JSON.parse(localStorage.getItem("users")));    
    
// Bind the onClick-function to our own function --> could also use an Event listener
register.onclick = function(){

  // Bind the input fields and get the value
  var inputName = document.getElementById("wholeName").value;
  var inputUsername = document.getElementById("username").value;
  var inputEmail = document.getElementById("email").value;
  var inputPassword = document.getElementById("password").value;
  var repeatPassword = document.getElementById("repeatPassword").value;
  var inputGender ="";

  // TODO: Could use also drop down? Something different than if statements?
  //Give inputGender a value, go through the radio buttons and look which is clicked
    if(document.getElementById("genderMale").checked) {
        inputGender = "Male";
    }
    if(document.getElementById("genderFemale").checked) {
        inputGender = "Female";
    } 
    if (document.getElementById("genderOther").checked) {
        inputGender = "Other";
    }
  

// check if they are all filled out and password equals repeated password
  if(inputName && inputUsername && inputEmail && inputGender && (inputPassword === repeatPassword)){
    // newUser is an Object with the inputs as properties
    var newUser = {inputName, inputUsername, inputGender, inputEmail, inputPassword};
  
    //Work on that later
  //   var inputRepeatPassword = document.getElementById("repeatPassword");
  

  //push newUser into array newUsers
  newUsers.push(newUser);

  // JSON.stringify makes a string out of the variable (in this case --> object newUser), to store it in the local storage
  var newUsersString = JSON.stringify(newUsers);

  // to store you need ("key", value)
  localStorage.setItem("users", newUsersString);

  //redirecting to login page
  window.location = "login.html"; 
 } else{
    alert("There is something wrong! Check again.");
    }
}