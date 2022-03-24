const mongoDbClass = require("./dbClass");
var bcrypt = require("bcryptjs");

class Users extends mongoDbClass {
  constructor() {
    super();
  }

  async login(username, password) {
    // Create a reference to the users collection
    const UsersCollection = this.db.collection("Users");

    // Define the query
    const query = { email: username };

    const user = await UsersCollection.findOne(query, {});
    console.log(user);

    if (user == null) {
      return { error: true, body: "Invalid Credentials." };
    } else {
      //Compares the password to the hash in the database to see if it is correct
      if (bcrypt.compareSync(password, user.password)) {
        //Define what is returned. i.e. don't return password
        var returnData = {
          email: user.email,
          level: user.level,
        };
        return { error: false, body: returnData };
      } else {
        return { error: true, body: "Invalid Crendentials." };
      }
    }
  }

  createUser(doc) {
    const UsersCollection = this.db.collection("Users");
    /*const doc = {
            name: "Test Test",
            email: "test@test.com",
        }*/
    //email password email is unique
    // try{
    const result = UsersCollection.insertOne(doc);
    return true;
    // }
    // catch {
    //     return false;
    // }
  }
}

async function getAllAdmins() {}

module.exports = Users;
