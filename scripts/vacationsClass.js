// class Vacation {
//  //Constructor allows us to create new objects in this class (with these properties)
//     constructor (title, description, tags, mapPosition, zoom, pins, isSelected, isPublished  ){
// this.title = title;
// this.description = description;
// this.mapPosition = mapPosition;
// this.zoom = zoom;
// this.pins = pins;
// this.isSelected = isSelected;
// this.isPublished = isPublished;
// this.tags = tags;
// this.index = null;


//  }   
// }

//sorry Silvia, I needed to commment it out for now and make a simple version of the class to work on until I have all variables 

 class Vacation {
    //Constructor allows us to create new objects in this class (with these properties)
       constructor (id, title, description, pins, isSelected, isPublished, tags){
           this.id = id;
           this.title = title;
           this.description = description;
           this.pins = pins;
           this.isSelected = isSelected;
           this.isPublished = isPublished;
           this.tags = tags;
           this.index = null;
           }

          
        //    getAllPublishedVacations()
    
        //    // Loop through all users vacations and return array
    }
    





 
 //The following part is something Henrik suggested for displaying the results, where "something" the Id of the div,the html part I want to display
 //createHTML()

    
    //return "<div>" + this.title + "</div>";

// }

// var html = "";

// for(i = 0; i... )
//  html += vac[i].createHTML();

// document.getElementById("something").innerHTML = html;