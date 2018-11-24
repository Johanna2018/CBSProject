//the functionality of this script is to save functions in here we will need in different parts of the  and in different htmls
//this script needs to be linked to every html in which we need those funczions
//funtions which are in this script can so be used on everypoint in the project

//function to store something in the localStorage, y = value (object/array), keyName = name of key which you assign value to and save it in localStorage
//keyName --> you need it to recall it later in getStorage
function store(y, keyName) {
   var stringified = JSON.stringify(y);
    localStorage.setItem(String(keyName), stringified);
}

//function to get data which are stored in localStorage, keyName = name of key which you assign value to and save it in localStorage
//keyName --> need to remember from when you stored it to local storage
function getStorage(keyName){
    var parsed = JSON.parse(localStorage.getItem(keyName));
    return parsed;
}

//function to generate the next ID in an array
function getNextId(arr){
    // set variable max to 0
    var max = 0;
    // Loop over array 
    // Make sure when calling this function that the array filled with data 
    for(i = 0; i < arr.length; i++){
        // Find the highest ID and add one
        // Has to be >= max, because the allVac array could be 0, if non vacation yet
            if(arr[i].id >= max){
            // Set max to one more than biggest existing id
                max = arr[i].id + 1;
            }
        
    }
    //Return the max --> max is the generate ID
    return max;
}