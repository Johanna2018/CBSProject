
//1. Get the data from a local storage - currentUser
//2. Access the property vacation
//3. Form a list of all of the vacations titles
//4. When clicked on the particular title, display the map with the pins that belong to that vacation

//I've been trying to display current user's vacations, but there is something fishy about the local storage, will figure out what over the weekend

// var user = getStorage('currentUser');
// var userVacations = [];
// userVacations.push(user.vacations);
//console.log(userVacations);
var userVacations = [{title: "Copenhagen", id:1, description: "awesome" },{title: "London", id:2, description: "wonderful" },{title: "Tel Aviv", id:3, description: "warm" } ];

if (userVacations.length === 0){
    //Display this as a text in html
    alert("You have not saved any vacations");
} else {

document.getElementById('myVacationsList').innerHTML = ""

for(i=0; i<userVacations.length;i++){
//alert(userVacations[i].title);
    var vacation = userVacations[i];
//console.log(vacation.title);
    var resultEl = document.createElement('li')

resultEl.innerHTML = vacation.title

document.getElementById('myVacationsList').appendChild(resultEl)

    }
}





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