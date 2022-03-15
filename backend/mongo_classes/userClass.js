const mongoDbClass = require("./dbClass");
class Users extends mongoDbClass {
    constructor(){
        super()
    }

    createUser(doc){
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


module.exports = Users;