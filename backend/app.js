const express = require("express");
const cors = require("cors")();
const app = express();

//Include db user class
const Users = require("./mongo_classes/userClass.js");
const Trips = require("./mongo_classes/tripClass.js");

const { authenticateToken } = require("./routes/auth.js");
const authRouter = require("./routes/auth.js").router;
const accountRouter = require("./routes/account").router;
const tripRouter = require("./routes/trip").router;


const PORT = 3001;

app.use(cors);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/account", authenticateToken, accountRouter);
app.use("/trip", authenticateToken, tripRouter);

app.get("/", (req, res) => {
  res.send("You look lost.");
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

function errorMessage(res, msg) {
  res.send({ success: false, body: msg });
}

function successfulResponse(res, data) {
  res.send({ success: true, body: data });
}

app.get("/test", (req, res) => {
  // var bcrypt = require("bcryptjs");
  // var salt = bcrypt.genSaltSync(10);
  // var hash = bcrypt.hashSync("1234", salt);
  let Trip = new Trips();

  var connectStatus = Trip.connect();
  if (connectStatus == false) {
    errorMessage(res, "DB Connection Error");
    return;
  }
  const doc = {
    name: "Test Test",
    description: "test_Descr",
  };

  var insertStatus = Trip.createStudent(doc, '623cac53c071a74d9056f69a');
  if (insertStatus.error == true) {
    errorMessage(res, insertStatus);
    return;
  }

  console.log("HERE");


  res.send("Hello World");

  //Hash for password 1234 for testing is $2a$10$/dcNdrqcJxTUeu.BWdP37edzuloxWttWc/LRirFmKa3qNk2Kpken.
  //Insert this into the database with an email and use for testing
  // res.send(hash);
});

//Run to connect database (if it doesn't exist yet it will be created)
app.get("/createTestUser", (req, res) => {
  let User = new Users();

  var connectStatus = User.connect();
  if (connectStatus == false) {
    errorMessage(res, "DB Connection Error");
    return;
  }

  const doc = {
    name: "Test Test",
    email: "test@test.com",
  };

  var insertStatus = User.createUser(doc);
  if (insertStatus != true) {
    errorMessage(res, insertStatus);
    return;
  }

  res.send("Hello World");
});




app.listen(PORT, async () => {
  console.log("Server listening at port 3001");
});
