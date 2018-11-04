// Initialize an empty array
var users = [];

//Maybe this need to be Comment out because I put it in Login --> maybe we need to change that again later
// Fill it up with a few users to show log-in functionality, so we don´t need to register new user every time
users.push(new User("Johanna", "jojo", "Female", "jo@cbs.dk", "1234", "Blabla", false, [1,2,3]));
users.push(new User("Peter Pan", "milkway", "Male", "456@cbs.dk", "password", "Lorem ipsum dolor sit amet", false, [1,2,3]));
users.push(new User("Henrik Thorn", "thorn", "Male", "123@cbs.dk", "qwerty", "Lorem ipsum dolor sit amet", false, [1,2,3]));
users.push(new User("Tina", "tete", "Female", "tete@cbs.dk", "1111", "Lorem ipsum dolor sit amet", false, [1,2,3]));
  

// Bind the button to a variable for later use
var register = document.getElementById("register");

// push all elements that are stored in local storage into the newUsers array
    // Array.prototype.push.apply(newUsers, JSON.parse(localStorage.getItem("users")));
  
// Bind the span for result text for later use
// var resultSpanRegister = document.getElementById("registerResult");

//TODO later:
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
  //gender is empty string now, but will filled with value later
  var gender ="";

  //radios is an array because radio buttons have all the same name
  var radios = document.getElementsByName("gender-choice");
  //loop over the radio buttons because we need to get the value from the radio button that is checked 
  for (var i = 0, length = radios.length; i < length; i++){
   if (radios[i].checked){
    // assign value from checked radio button to gender
    gender = radios[i].value;
    // only one radio can be logically checked, don't check the rest
    break;
   }
  }
    var description = document.getElementById("user-description").value;
    var isLoggedIn = false;
    //empty array for vacations, because when registering, no vacations exist yet
    var vacations = [];
    // check if they are all filled out and password equals repeated password
    if(name && username && email && gender && (password === repeatPassword)){

    // push the new registered user in the user array, newUser makes it part of the user class
    users.push(new User(name, username, gender, email, password, description, isLoggedIn, vacations));
  
    //TODO: Work on that later
    //var inputRepeatPassword = document.getElementById("repeatPassword");
 
//store updated users array in local storage, store(y, keyname) 
//keyName --> make sure keyName is always String, need to remember for later use, y --> array
store(users, "users");
//does the same as this
    //var usersString = JSON.stringify(users);
    //localStorage.setItem("users", usersString);
  

  //redirecting to login page
  window.location = "login.html"; 
 } else{
    alert("There is something wrong! Check again.");
    }
}