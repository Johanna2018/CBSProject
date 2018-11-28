// We create a user class, so we have an easy way to create users and further implement features at a later stage

class User {

  // The constructor for our class, which will allow us to create new objects of our class
  constructor(id, name, username, gender, email, password, description, isLoggedIn, vacations) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.description = description;
    this.isLoggedIn = isLoggedIn;
    this.vacations = vacations;
  }
}
