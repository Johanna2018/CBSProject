//get the currently choosen vacation in currentVac variable from local storage with the keyName (always string)
var currentVac = getStorage("currentVac");
//get the all vacations array from local storage with the keyName (always string), to update Data later
var allVac = getStorage("allVac");
//get the users array from local storage with the keyName (always string), to update Data later
var users = getStorage("users");
//get the currently logged in User from local storage with the keyName (always string), to update Data later
var currentUser = getStorage("currentUser");

//fill input fields with the vacation information
document.getElementById("vacTitle").value = currentVac.title;
document.getElementById("vacDescription").value = currentVac.description;
document.getElementById("tags").value = currentVac.tags;
if (currentVac.isPublished === true){
    document.getElementById("publish").checked = true;
}else{
    document.getElementById("publish").checked = false;
}

// Bind the button from HTML to a variable for later use
var saveChanges = document.getElementById("saveChanges");

//make a function to save the changes made in the vacation, when button is clicked
saveChanges.onclick = function(){
    //upadte the properties of the currentUser with input
    currentVac.title = document.getElementById("vacTitle").value;
    currentVac.description = document.getElementById("vacDescription").value;
    currentVac.tags = document.getElementById("tags").value;
 if (document.getElementById("publish").checked == true){
    currentVac.isPublished = true;
    }else{
    currentVac.isPublished = false;
}

    //update changes of currentVac in allVac array
    // Loop over allVac array to find the object with the same id and set it to currentVac
    for(i = 0; i < allVac.length; i++){
         if(currentVac.id === allVac[i].id){
        allVac[i] = currentVac;
        }
    } 
    
    //update changes of currentVac in currentUser.vacations array
    // Loop over currentUser.vacations array to find the object with the same id and set it to currentVac
    for(i = 0; i < currentUser.vacations.length; i++){
        if(currentVac.id === currentUser.vacations[i].id){
            currentUser.vacations[i] = currentVac;
       }
   } 

   //update changes of currentUser in users array
    // Loop over users array to find the object with the same id and set it to currentUser
    for(i = 0; i < users.length; i++){
        if(currentUser.id === users[i].id){
            users[i] = currentUser;
        }
    } 

    store(currentVac, "currentVac");
    store(allVac, "allVac");
    store(currentUser, "currentUser");
    store(users, "users");

}

