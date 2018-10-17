// Bind the button to a variable for later use
var signin = document.getElementById("signin");
var newUsers = [];

// Bind the onClick-function to our own function
signin.onclick = function(){

  // Bind the input fields and get the value
  var inputName = document.getElementById("wholeName").value;
  var inputUsername = document.getElementById("username").value;
  var inputEmail = document.getElementById("email1").value;
  console.log(inputEmail);
  var inputPassword = document.getElementById("password1").value;
  var inputGender ="";

  // How do I get the selected gender??
    if(document.getElementById("genderMale").checked) {
        inputGender = "Male";
    }
    if(document.getElementById("genderFemale").checked) {
        inputGender = "Female";
    } 
    if (document.getElementById("genderOther").checked) {
        inputGender = "Other";
    }
    

  

  //Work on that later
  //   var inputRepeatPassword = document.getElementById("repeatPassword");
  
  // newUser is an Object with the inputs as properties
  var newUser = {inputName, inputUsername, inputGender, inputEmail, inputPassword};

  newUsers.push(newUser);

  // JSON.stringify makes a string out of the variable (in this case --> object newUser), to store it in the local storage
  var newUsersString = JSON.stringify(newUsers);

  // "key", value 
  localStorage.setItem("users", newUsersString);
}