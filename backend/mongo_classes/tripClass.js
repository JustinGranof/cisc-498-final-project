/*
 * Class handles the trip/class collection in the database
 * All database transactions are initiated in this class
 * Enforces the schema and other restrictions
 */

const mongoDbClass = require("./dbClass");
const ObjectId = require("mongodb").ObjectId;

class Trips extends mongoDbClass {
  constructor() {
    super();
    this.connect();
  }

  createTrip(doc) {
    const TripsCollection = this.db.collection("Trips");
    var insertDoc;

    try {
      //These are the mandatory paramaters, if one is missing it will fail
      insertDoc = {
        name: doc.name,
      };
      //Can check for validitity (Like uniqueness) here
      //Some paramaters can be optionally added with if statements
      //All invalid parameters will be ignored
    } catch (error) {
      return { error: true, body: "Trip details missing." };
    }
    //insertDoc['Students'] = [];
    const result = TripsCollection.insertOne(insertDoc);

    return { error: false, body: "" };
  }

  createStudent(doc, tripId) {
    const TripsCollection = this.db.collection("Trips");

    var insertDoc;

    try {
      //These are the mandatory paramaters, if one is missing it will fail
      /*insertDoc = {
                "name": doc.name,
                "email": doc.contact.email
            }*/
      insertDoc = doc;
      //Can check for validitity (Like uniqueness) here
      //Some paramaters can be optionally added with if statements
      //All invalid parameters will be ignored
    } catch (error) {
      return { error: true, body: "Trip details missing." };
    }
    insertDoc._id = ObjectId();

    TripsCollection.updateOne(
      { _id: ObjectId(tripId) },
      { $push: { Students: doc } }
    );

    return { error: false, body: "" };
  }

  //Get all trips
  async getTrips() {
    const TripsCollection = this.db.collection("Trips");

    const query = {};

    var trips = await TripsCollection.find().toArray();

    if (trips) {
      for (var i = 0; i < trips.length; i++) {
        //Search for student
        if (trips[i].Students) {
          trips[i]["numStudents"] = trips[i]["Students"].length;
        } else {
          trips[i]["numStudents"] = 0;
        }
      }

      return { error: false, body: trips };
    } else {
      return { error: true, body: "Not found." };
    }
  }

  //Gets a trip
  async getTrip(id) {
    const TripsCollection = this.db.collection("Trips");

    const query = { _id: ObjectId(id) };

    const trip = await TripsCollection.findOne(query, {});

    return { error: false, body: trip };
  }

  async getStudent(id, tripId) {
    const TripsCollection = this.db.collection("Trips");

    const query = { _id: ObjectId(tripId) };

    var trip = await this.getTrip(tripId); //Gets trip

    trip = trip.body;

    if (trip && trip.Students) {
      //If students exist
      for (var i = 0; i < trip.Students.length; i++) {
        //Search for student
        if (
          trip.Students[i]._id &&
          ObjectId(trip.Students[i]._id).toString() == id
        ) {
          return { error: false, body: trip.Students[i], index: i };
        }
      }
    }

    return { error: true, body: "Not Found" }; //Not found error
  }

  async getStudents(tripId) {
    const TripsCollection = this.db.collection("Trips");

    const query = { _id: ObjectId(tripId) };

    var trip = await this.getTrip(tripId); //Gets trip

    if (trip.body && trip.body.Students) {
      var students = trip.body.Students;
      return { error: false, body: trip.body.Students };
    } else {
      return { error: true, body: "Not found." };
    }
  }

  async updateStudent(id, tripId, doc) {
    const TripsCollection = this.db.collection("Trips");

    var student = await this.getStudent(id, tripId); //Will fail if student does not exist
    if (student.error) {
      return { error: true, body: "Update failed." };
    }
    student = student.body;

    for (var field in doc) {
      if (!student[field]) {
        return { error: true, body: "Update failed." };
      }
      try {
        student[field] = doc[field]; //Will fail for invalid fields
      } catch (error) {
        return { error: true, body: "Update failed." };
      }
    }

    doc._id = ObjectId(doc._id);

    try {
      TripsCollection.updateOne(
        {
          _id: ObjectId(tripId),
          "Students._id": ObjectId(student._id),
        },
        { $set: { "Students.$": doc } }
      );
    } catch (error) {
      console.log(error);
      return { error: true, body: "Update failed." };
    }

    return { error: false, body: "" };
  }

  async deleteStudent(id) {
    const TripsCollection = this.db.collection("Trips");

    try {
      TripsCollection.updateOne(
        { "Students._id": ObjectId(id) },
        { $pull: { Students: { _id: ObjectId(id) } } }
      );
    } catch (error) {
      return { error: true, body: "Delete Failed." };
    }

    return { error: false, body: "" };
  }

  async deleteTrip(id) {
    const TripsCollection = this.db.collection("Trips");

    try {
      TripsCollection.deleteOne({ _id: ObjectId(id) });
    } catch (error) {
      return { error: true, body: "Delete Failed." };
    }

    return { error: false, body: "" };
  }
}

module.exports = Trips;
