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
  
// Bind the span for result text for later use
var resultSpanRegister = document.getElementById("registerResult");

// Create a function with which validation of registration input can be checked
// function checkForm(){ 
//     //password needs to be between 8 to 20 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
//     var condition=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
//     //if it is not matching the conditions -> return false
//   if(!password.value.match(condition)){ 
//     resultSpanRegister.innerText = "Your password needs to be between 8 to 20 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.";
//     return false;
//   }
//   //if password is not equal repeatPassword -> return false
//   if(password !== repeatPassword){
//     resultSpanRegister.innerText = "Please make sure your passwords match.";
//     return false;
    
//   }
 // check if email is valid --> if not return false
//   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     if (!filter.test(email)) {
//     resultSpanRegister.innerText = "Please provide a valid email address";
//     return false;
//   } 
//   return true;
// }

// Bind the onClick-function to our own function --> could also use an Event listener
register.onclick = function(){

  // Bind the input fields and get the value
  var name = document.getElementById("wholeName").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var repeatPassword = document.getElementById("repeatPassword").value;
  var gender ="";

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

    var description = document.getElementById("user-description").value;
    var isLoggedIn = false;
// check if they are all filled out and password equals repeated password
  if(name && username && email && gender && (password === repeatPassword)){
    // newUser is an Object with the inputs as properties
    var newUser = {name, username, gender, email, password, description, isLoggedIn};
  
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