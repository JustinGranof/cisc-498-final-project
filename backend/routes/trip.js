const Trips = require("../mongo_classes/tripClass.js");

const router = require("express").Router();

router.post("/get", async (req, res) => {
    let Trip = new Trips();

    const response = await Trip.getTrips();

    if (response.error){
        res.send({ success: false, body: response.body });
    }
    else {
        res.send({success:true, body: response.body})
    }

});

router.post("/student/get", async (req, res) => {
    let Trip = new Trips();

    const response = await Trip.getStudent(req.body.studentID, req.body.tripID);

    if (response.error){
        res.send({ success: false, body: response.body });
    }
    else {
        res.send({success:true, body: response.body})
    }

});

router.post("/students/get", async (req, res) => {
    let Trip = new Trips();

    const response = await Trip.getStudents(req.body.tripID);

    if (response.error){
        res.send({ success: false, body: response.body });
    }
    else {
        res.send({success:true, body: response.body})
    }

});

router.post("/student/update", async (req, res) => {
    let Trip = new Trips();

    const response = await Trip.updateStudent(req.body.studentID, req.body.tripID, req.body.data);

    if (response.error){
        res.send({ success: false, body: response.body });
    }
    else {
        res.send({success:true, body: response.body})
    }

});

router.post("/student/create", async (req, res) => {
    let Trip = new Trips();

    const response = await Trip.updateStudent(req.body.tripID, req.body.data);

    if (response.error){
        res.send({ success: false, body: response.body });
    }
    else {
        res.send({success:true, body: response.body})
    }

});


/**
 * Middleware to ensure the request is from a super admin account
 */
 function checkSuperAdmin(req, res, next) {
    //if (!req.level || req.level !== "superadmin") return res.sendStatus(403);
    next();
  }

module.exports = {
    router: router,
  };