// Initialize an empty array
var users = [];

// Bind the button to a variable for later use
var register = document.getElementById("register");

// add an onclick function to the register variable (button)
register.onclick = function () {

    //generate ID with function (defined in util.js)
    var id = getNextId(users);
    // Bind the input fields from HTML and get the value
    var name = document.getElementById("wholeName").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    var description = document.getElementById("user-description").value;
    //gender is empty string now, but will filled with value later
    var gender = "";
    //radios is an array because radio buttons have all the same name in HTML
    var radios = document.getElementsByName("gender-choice");
    //loop over the radio buttons because we need to get the value from the radio button that is checked 
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // assign value from checked radio button to gender
            gender = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    //when user registers, he is not logged-in yet, therefore isLoggedIn is false
    var isLoggedIn = false;
    //empty array for vacations, because when registering, no vacations exist yet
    var vacations = [];
    // check if they are all filled out and password equals repeated password
    if (name && username && email && gender && (password === repeatPassword)) {

        // push the new registered user in the user array, newUser makes it part of the user class
        users.push(new User(id, name, username, gender, email, password, description, isLoggedIn, vacations));

        //store updated users array in local storage with function store(y, keyname) (defined in util.js)
        //keyName --> make sure keyName is always String, need to remember for later use, y --> array
        //function store() does the same as this: var usersString = JSON.stringify(users); localStorage.setItem("users", usersString);
        store(users, "users");

        //redirecting to login page
        window.location = "login.html";
    }
    //if one of the fields is not filled out, we alert a message
    else {
        alert("There is something wrong! Check again.");
    }
}