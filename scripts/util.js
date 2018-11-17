//the function of this script is to save functions in here we will need in different parts of the  and in different htmls
//this script needs to be linked to every html
//funtions which are in this script can so be used on everypoint in the project

//function to store something in the local storage, y = value (object/array), keyName = name of key which you assign value to and save it in localStorage
//keyName --> you need it to recall it later in getStorage
function store(y, keyName) {
   var stringified = JSON.stringify(y);
    localStorage.setItem(String(keyName), stringified);
}

//function to get data which are stored in local storage, keyName = name of key which you assign value to and save it in localStorage
//keyName --> need to remember from when you stored it to local storage
function getStorage(keyName){
    var parsed = JSON.parse(localStorage.getItem(keyName));
    return parsed;
}

function getNextId(arr){
    // Generate an ID with function
    // set variable max to 0
    var max = 0;
    // Loop over array 
    // Make sure when calling this function that the array filled with data from localStorage
    for(i = 0; i < arr.length; i++){
        // Find the biggest id and add one
        // Has to be >= max, because the allVac array could be 0, if non vacation yet
            if(arr[i].id >= max){
            // Set max to one more than biggest existing id
                max = arr[i].id + 1;
            }
        
    }
    return max;
}