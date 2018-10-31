alert("connected");

//This is just a hard-coded demo. Will be changed, with the help of class
var vacation1 = {title:"Copenhagen", id:"1", tag:["chill","hipster"]};
var vacation2 = {title:"London", id:"2", tag:["chill","cool","awesome"]};
var vacation3 = {title:"Tel Aviv", id:"3", tag:["warm","great","cool"]};

var allVacations = [vacation1,vacation2,vacation3];

var button = document.getElementById("submit");

button.addEventListener("click", function(){
    var searchTerm = document.getElementById("mySearch").value

    var result;
    for (var i =0; i<allVacations.length; i++){
        for (var j=0;j< allVacations[i].tag.length; j++){
            if (searchTerm === allVacations[i].title || searchTerm===allVacations[i].tag[j]){
                result = allVacations[i];
                break
            }     
        } 
    }
    if (result === undefined){
        console.log("No results");
    } else 
    console.log(result.title)
})