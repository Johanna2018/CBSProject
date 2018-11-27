
class Vacation {
    // Constructor allows us to create new objects in this class (with these properties)
    constructor(id, title, description, pins, isPublished, tags, ratings, center, zoom) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.pins = pins;
        this.isPublished = isPublished;
        this.tags = tags;
        this.index = null;
        this.ratings = ratings;
        this.center = center;
        this.zoom = zoom;
    };

    // The reason this function is in this script is that later on in the discover when we call the vacations as objects,
    // we want the functionality of the object to be already included, this way we are using the classes
    getAverageRatings() {
        //In case we don't manage to overwrite this value later in the function, we need to return 
        //something else than undefined - rather a number 0
        var avgRating = 0;
        if (this.ratings.length > 0) {
            var ratingAvgSum = 0;
            for (var i = 0; i < this.ratings.length; i++) {
                ratingAvgSum = ratingAvgSum + this.ratings[i];
            }

            avgRating = ratingAvgSum/this.ratings.length;
        }
        //toFixed is returning a string value, we need a number with two decimals
        //https://www.w3schools.com/jsref/jsref_parsefloat.asp
        //https://www.w3schools.com/jsref/jsref_tofixed.asp
        return parseFloat(avgRating.toFixed(2));
    }
}