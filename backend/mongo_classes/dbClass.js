const MongoClient = require("mongodb").MongoClient;
class mongoDbClass {
  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
    this.db;
    this.connected = false;
  }

  connect() {
    try {
      this.client.connect();
      this.db = this.client.db("test_db");
      this.connected = true;
      return true;
    } catch {
      this.connected = false;
      return false;
    }
  }

  getConnectionStatus() {
    return this.connected;
  }
}

module.exports = mongoDbClass;
