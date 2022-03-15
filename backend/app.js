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
    res.send({'success': false, 'body': data});
}

app.post("/login", (req, res) => {

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
