const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

class mongoDbClass {
  constructor() {
    this.client = new MongoClient(process.env.DATABASE_URL);
    this.db;
    this.connected = false;
  }

  connect() {
    try {
      this.client.connect();
      this.db = this.client.db(process.env.DATABASE_NAME);
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
