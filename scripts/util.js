//the function of this script is to save functions in here we will need in different parts of the  and in different htmls
//this script needs to be linked to every html
//funtions which are in this script can so be used on everypoint in the project

//function to store something in the local storage, y = value (object/array), keyName = name of key which you assign value to and save it in localStorage
//keyName --> you need it to recall it later in getStorage
function store(y, keyName){
   var stringified = JSON.stringify(y);
    localStorage.setItem(String(keyName), stringified);
}

//function to get data which are stored in local storage, keyName = name of key which you assign value to and save it in localStorage
//keyName --> need to remember from when you stored it to local storage
function getStorage(keyName){
    var parsed = JSON.parse(localStorage.getItem(keyName));
    return parsed;
}
