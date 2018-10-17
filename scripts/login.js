// We create a user class, so we have an easy way to create users and further implement features at a later stage
class User {

    // The constructor for our class, which will allow us to create new objects of our class
    constructor(name, username, gender, email, password) {
      this.name = name;
      this.username = username;
      this.gender = gender;
      this.email = email;
      this.password = this.hashPassword(password);
      this.lastAccess = null;
    }
  
    // Function that allows us to set lastAccess to current time in unix time (Date.now())
    setLastAccess(){
      this.lastAccess = Date.now();
    }
  
    // Simple function to hash passwords in order for us not to store then in clear text
    hashPassword(rawPassword){
      var a = 1, c = 0, h, o;
      if (rawPassword) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = rawPassword.length - 1; h >= 0; h--) {
          o = rawPassword.charCodeAt(h);
          a = (a<<6&268435455) + o + (o<<14);
          c = a & 266338304;
          a = c!==0?a^c>>21:a;
        }
      }else {
        // If the password is not valid, we'll throw and error we're able to catch
        throw new Error("The password supplied is not valid");
      }
      return String(a);
    }
  }
  
  // We set a debug variable in order to switch on or off debug mode of our small program
//   var debug = 1;
  
  // Initialize an empty array
  var users = [];
  
  // Fill it up with a few users
  users.push(new User("Henrik Thorn", "thorn", "Male", "123@cbs.dk", "qwerty"));
  users.push(new User("Peter Pan", "milkway", "Male", "456@cbs.dk", "password"));


  
  // Bind the button to a variable for later use
  var login = document.getElementById("login");
  
  // Bind the span for result text for later use
    var resultSpan = document.getElementById("loginResult");
  
  // Bind a counter in order to see if the user has tried to login too many times
  var counter = 3;
  
  // Bind the onClick-function to our own function
  login.onclick = function(){
    console.log('login function called')
    // Bind the two input fields and get the value
    var inputEmail = document.getElementById("email").value;
    var inputPassword = document.getElementById("password").value;
    console.log(inputEmail, inputPassword)
  



    if(inputEmail.length == 0 || inputPassword.length == 0){
      // We set the resultspan with a new text and return false to get out of this function
      resultSpan.innerText = "You need to enter your email address and password in order to use the website.";
      return false;
    }
  
    // We loop through all our users and return true if we find a match
    for(var i = 0; i < users.length; i++) {
  
      // Bind user to a variable for easy use
      var user = users[i];
  
      // If debug mode is enabled, we console.log the user object from the list
    //   if(debug == 1){
    //     console.log(user);
    //   }
  
      // We use a try-catch for the hash-password function, since something could go wrong.
      try {
  
        // We try to create a variable with the hashed version of the inputPassword
        var hashedInputPassword = user.hashPassword(inputPassword.value);
      } catch(error){
  
        // We console log any error that might have been thrown
        console.log(error);
      }
  
      // If username and password we have in put matches the one in our loop
      if(user.email == inputEmail.value && user.password == hashedInputPassword) {
  
        // Update the lastAccess of the user-object
        user.setLastAccess();
  
        // We set the resultspan with a new text and return true to get out of this function. The date will be in unixtime
        // TODO: We wan't something better than unixtime for the user!
        // resultSpan.innerText = "Hi " + user.name + ", you've successfully entered the website at: "+user.lastAccess;
        
        //redirecting to other page
        window.location = "homePage.html"; 
  
        // Return true to jump out of the function, since we now have all we need.
        return true;
      }
    }
  
    // We check if the user has tried to enter a wrong username and password too many times
    if(counter == 0){
      // Since the user has tried three times, we let the user know that he's been banned
      resultSpan.innerText = "You've entered the wrong email address and password three times. You've been banned from our system";
  
      // Disable the two input fields and the button in order for the user to not make any trouble
      inputEmail.disabled = true;
      inputPassword.disabled = true;
      login.disabled = true;
  
      // Return false to stop us from doing anything further.
      return false;
  
    }else {
      // Since we did not find a match, we know that the user has typed a wrong password and username
      resultSpan.innerText = "You've entered an email address or password that does not match our stored credentials";
  
      // Update the counter with an attempt of logging in.
      counter--;
  
      // Return false, since we do not have anything more to do
      return false;
    }
  };