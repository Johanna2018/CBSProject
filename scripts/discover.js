// alert("connected");

//This is just a hard-coded demo. Will be changed, with the help of class
// var vacation1 = {title:"Copenhagen", id:"1", tag:["chill","hipster"]};
// var vacation2 = {title:"London", id:"2", tag:["chill","cool","awesome"]};
// var vacation3 = {title:"Tel Aviv", id:"3", tag:["warm","great","cool"]};

// var publishedVacations = [vacation1,vacation2,vacation3];

// //The attempt to implement the class:         
var publishedVacations = [];
     
publishedVacations.push(new Vacation(1,"Copenhagen","This is my amazing CPH trip",false,true,["chill","awesome"]))
publishedVacations.push(new Vacation(2,"London","This is my amazing London trip",false,true,["chill","cool"]))
publishedVacations.push(new Vacation(3,"Tel Aviv","This is my amazing trip to Tel Aviv",false,true,["warm","awesome"]))
publishedVacations.push(new Vacation(4,"Iceland","This is my amazing Iceland roadtrip",false,true,["adventure","camping"]))

//console.log(publishedVacations);
//------------------------------------------------------------------


var button = document.getElementById("submit");
// var searchResult = [];


button.addEventListener("click", function(){
    var searchTerm = document.getElementById("mySearch").value.toLowerCase()
    var searchResult = [];

    //we need to loop over the array of publishedVacations and inside of that loop we need to loop over the arrays of tags of each publishedVacation
    //The first loop is not working currently, the search only works when searching for tags
    for (var i =0; i<publishedVacations.length; i++){
        for (var j=0;j< publishedVacations[i].tags.length; j++){
            
            //now we need to check whether the search term entered on the website matches either one of our titles, or any of our tags
            //THE SEARCH DOESN'T WORK WITH THE TITLE TODO: fix this
            if (searchTerm === publishedVacations[i].title || searchTerm===publishedVacations[i].tags[j]){
               //immediately after that, if the match was found, we push the matching publishedVacation into an array searchResults, which we declared earlier as an empty array
               //console.log(publishedVacations[i].title); 
               searchResult.push(publishedVacations[i]);
                //break;
            }     
        } 
    }
    //now we need another if-else statement, which will decide what to do with our results - searchResults array
    //TODO:figure out how to do something else if the search term doesn't match - display "no results"
    if (searchResult === undefined){
        alert("No results");
    //we proceed to what happens if our searchResult array has been populated   
    } else {
        //The for loop and console below is a redundant piece of code we used to test the function before, keep it in case we need to test
        // for(i=0; i < searchResult.length; i++){
        // console.log(searchResult[i].title);
        // }

        //we select the html div part which has an Id "searchResult" in the discover.html and declare that it is currently empty, this helps empty it out with each new search
        document.getElementById('searchResult').innerHTML = ''

        //then we iterate over the populated searchResult array
        for(i=0; i < searchResult.length; i++) {
            //console.log('Test')
            
            //we declare a variable with a value of an html element, we make it a paragraph 'p'(this can be any html element, for example h1)
            var resultEl = document.createElement('p')

            //TODO make this a link instead of just a paragraph, string? from Marten (he says: something along those lines)
            // resultEl.setAttribute?.href = searchResult[i].link
            
            //now we define what should the innerHTML of our resultEl be populated with, which value - in this case it should be filled with the title of the object in a searchResult array
            resultEl.innerHTML = searchResult[i].title
            //just a test to see this in the console
            //console.log(resultEl)
    
            //now that the innerHTML of our resultEl has been assigned the correct value to display, we display it in the div section that has the id "searchResult" and with the appendChild method we make sure that it displays the both results (or something like this, it has to be used in this case, will find out why)
            document.getElementById('searchResult').appendChild(resultEl)

            
            //normally, it should look something like this, but this was not working in our case (I can ask Marten again next time)
            //document.getElementById('searchResult').innerHTML = resultEl
        }

    }
       //searchResult.push(result.title);
    
       //The following part should help display a result
        
    // Display our searchResults on screen HTML

    // 1. We need a place to display our results XX
    // 2. We need to loop over all searchResults XX
    // 3. Create a new HTML element
    // 3.1 Add innerHTML content to that element


    

       
       
    //        for(i = 0; i<searchResult.length; i++){
    //        var html = "";
    //        html = searchResult[i].createHTML();
           
    //     document.getElementById("searchResult").innerHTML = html;
       
    //    }
 
    

// I CANNOT COMENT THIS OUT OR DELETE THIS because everything stops working and I dont know why :(    
})

function createHTML() {
        
    return "<div>Test</div>";
    
}