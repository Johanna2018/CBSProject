//get the currently logged in user and users array from localStorage with getStorage() function (defined in util.js)
var currentUser = getStorage("currentUser");
var users = getStorage("users");

//fill HTML input fields with the user information
document.getElementById("wholeName").value = currentUser.name;
document.getElementById("username").value = currentUser.username;
document.getElementById("user-description").value = currentUser.description;

// property gender is saved as an string in object, we need to transfer it back into radio button
//radios is an array because radio buttons have all the same name
var radios = document.getElementsByName("gender-choice");
//loop over the radio button array
for (var i = 0; i < radios.length; i++) {
    // if one of the buttons has the value which equals the gender
    if (radios[i].value == currentUser.gender) {
        // check this button
        radios[i].checked = true;
        // only one radio can be logically checked, don't check the rest
        break;
    }
}


// Bind the button from HTML to a variable for later use  
var saveChanges = document.getElementById("saveChanges");

//make a function to save the changes of the profile information, when button is clicked
saveChanges.onclick = function () {
    //upadte the properties of the currentUser with input
    currentUser.name = document.getElementById("wholeName").value;
    currentUser.username = document.getElementById("username").value;
    currentUser.description = document.getElementById("user-description").value;

    //radios is an array because radio buttons have all the same name
    var radios = document.getElementsByName("gender-choice");
    //loop over the radio buttons because we need to get the value from the radio button that is checked 
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // assign value from checked radio button to gender
            currentUser.gender = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }


    //update changes of currentUser in users array (+ stored in localStorage) with updateUser() function (defined in util.js)
    updateUser();

    //store updated currentUser object in local storage, make sure keyName is always String! 
    //keyName --> you need it to recall it later!
    store(currentUser, "currentUser");

    //Show message in result Span, to user can see that changes are saved.
    alert("Your changes have been saved!");

    //Return true to jump out of the function, since we now have all we need.
    return true;
}