const express = require("express");
const app = express();

//Include db user class
const Users = require('./mongo_classes/userClass.js');

const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

/*function test(client, db){
    try {
        await client.connect();
        const database = client.db(db);
        const Users = database.collection("Users");
        const doc = {
            name: "Test Test",
            email: "test@test.com",
        }

        const result = Users.insertOne(doc);
    }
    finally {
        await client.close();
    }  
}*/

function errorMessage(res, msg){
    res.send({'success': false, 'body': msg});
}

function successfulResponse(res, data){
    res.send({'success': true, 'body': data});
}

app.get("/login", async (req, res) => {
    //These must be sent through the post request
    var email = 'test@super.com';
    var password = '1234';

    //Initialize connection to database
    let User = new Users();
    
    var connectStatus = User.connect()
    if (connectStatus == false){
        errorMessage(res, "DB Connection Error");
        return;//Not sure if this actually stops execution but that is the goal
    }

    var login = await User.login(email, password);

    if (login['error'] != false){
        errorMessage(res, login['body']);
        return; 
    }
    else {
        //Should return full user info
        successfulResponse(res, login['body']);
    }




});

app.get("/test", (req, res) => {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("1234", salt);

    //Hash for password 1234 for testing is $2a$10$/dcNdrqcJxTUeu.BWdP37edzuloxWttWc/LRirFmKa3qNk2Kpken.
    //Insert this into the database with an email and use for testing
    res.send(hash);
});


//Run to connect database (if it doesn't exist yet it will be created)
app.get("/createTestUser", (req, res) => {
    
    let User = new Users();
    
    var connectStatus = User.connect()
    if (connectStatus == false){
        errorMessage(res, "DB Connection Error");
        return;
    }
    
    const doc = {
        name: "Test Test",
        email: "test@test.com",
    }
    
    var insertStatus = User.createUser(doc);
    if (insertStatus != true){
        errorMessage(res, insertStatus);
        return;
    }

    res.send("Hello World");
});


app.listen(PORT,() => console.log("Server listening at port 3001"));
