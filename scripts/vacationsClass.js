
class Vacation {
    //Constructor allows us to create new objects in this class (with these properties)
       constructor (id, title, description, pins, isSelected, isPublished, tags) {
           this.id = id;
           this.title = title;
           this.description = description;
           this.pins = pins;
           this.isSelected = isSelected;
           this.isPublished = isPublished;
           this.tags = tags;
           this.index = null;
           this.ratings = [];
        }

           createHTML() {
               return 
           }


        }
          
       
    
       
           //    getAllPublishedVacations()
    
        //    // Loop through all users vacations and return array
 
 //The following part is something Henrik suggested for displaying the results, where "something" the Id of the div,the html part I want to display
 //createHTML()

    
    //return "<div>" + this.title + "</div>";

// }

// var html = "";

// for(i = 0; i... )
//  html += vac[i].createHTML();

// document.getElementById("something").innerHTML = html;