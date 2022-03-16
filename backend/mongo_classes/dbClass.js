const MongoClient = require('mongodb').MongoClient;
class mongoDbClass {
    constructor (){
        this.client = new MongoClient("mongodb://localhost:27017");
        this.db;
    }

    connect(){
        try {
            this.client.connect();
            this.db = this.client.db('test_db');
            return true;
        }
        catch {
            return false;
        }
    }
}

module.exports = mongoDbClass;