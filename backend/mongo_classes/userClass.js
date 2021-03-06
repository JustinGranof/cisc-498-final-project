const mongoDbClass = require("./dbClass");
var bcrypt = require("bcryptjs");

class User extends mongoDbClass {
  constructor(username) {
    super();
    this.connect();
    this.user;
    this.username = username;
  }

  async login(password) {
    // Attempt to find the user with the username
    const user = await this.getUserByUsername();

    // User does not exist
    if (user == null) {
      return null;
    } else {
      // Compares the password to the hash in the database to see if it is correct
      if (bcrypt.compareSync(password, user.password)) {
        // Extract the password and return the rest of the data
        let { password, ...returnData } = user;
        this.user = returnData;
        return { returnData };
      } else {
        // Invalid password
        return null;
      }
    }
  }

  async getUserByUsername() {
    // Create a reference to the users collection
    const UsersCollection = this.db.collection("Users");

    // Define the query
    const query = { email: this.username };

    const user = await UsersCollection.findOne(query, {});

    this.user = user;
    return user;
  }

  _setStatus(status) {
    this.db
      .collection("Users")
      .updateOne(
        { email: this.user ? this.user.email : this.username },
        { $set: { enabled: status } }
      );
  }

  enable() {
    this._setStatus(true);
  }

  disable() {
    this._setStatus(false);
  }

  async delete() {
    let result = await this.db
      .collection("Users")
      .deleteOne({ email: this.user ? this.user.email : this.username });

    if (result.acknowledged && result.deletedCount > 0)
      return { success: true, body: "Successfully deleted the user." };
    else return { success: false, body: "Failed to delete the user." };
  }

  async createUser(password) {
    // Get users collection
    const UsersCollection = this.db.collection("Users");
    // Look for users with the same email
    let doc = await UsersCollection.findOne({ email: this.username });
    if (doc) {
      return {
        success: false,
        body: "There is already an account with that email.",
      };
    }
    // Hash the password
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    // Insert the new user document
    let newUser = await UsersCollection.insertOne({
      email: this.username,
      password: password,
      level: "admin",
      enabled: true,
      created: new Date(),
    });

    if (newUser.acknowledged)
      return { success: true, body: "Successfully created the user." };
    else return { success: false, body: "Failed to create the user." };
  }

  getUser() {
    return this.user;
  }
}

// get all admins
// update status (enable, disable)
// delete
// create new

async function getAdmins() {
  const mongo = new mongoDbClass();
  mongo.connect();
  if (mongo.getConnectionStatus()) {
    let docs = await mongo.db
      .collection("Users")
      .find({ level: "admin" })
      .sort({ created: -1 })
      .toArray();

    // Remove password from the data
    docs.forEach((doc) => delete doc["password"]);

    return docs;
  } else {
    // Could not connect to DB
  }
}

module.exports = { User: User, getAdmins: getAdmins };
