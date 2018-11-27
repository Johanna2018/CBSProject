// We create a Pin class, so we have an easy way to create users and further implement features at a later stage

class Pin {

    // The constructor for our class, which will allow us to create new objects of our class
  constructor(id, name, comment, type, latlng) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.type = type;
    this.latlng = latlng;
  }
}