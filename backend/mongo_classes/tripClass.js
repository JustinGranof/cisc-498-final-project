/*
 * Class handles the trip/class collection in the database
 * All database transactions are initiated in this class
 * Enforces the schema and other restrictions
*/

const mongoDbClass = require("./dbClass");

class Trips extends mongoDbClass {
    constructor(){
        super()
        this.connect()
    }

    createTrip(doc){
        const TripsCollection = this.db.collection("Trips");
        var insertDoc;

        try {
            //These are the mandatory paramaters, if one is missing it will fail
            insertDoc = {
                "name": doc.name,
                "description": doc.description
            }
            //Can check for validitity (Like uniqueness) here
            //Some paramaters can be optionally added with if statements
            //All invalid parameters will be ignored
        } catch (error) {
            return {'error': true, 'body': 'Trip details missing.'};
        }

        const result = TripsCollection.insertOne(insertDoc);

        return {'error': false, 'body': ''};
    }


    createStudent(doc, tripId){
        const TripsCollection = this.db.collection("Trips");
        doc._id = require('mongodb').ObjectId();
        TripsCollection.updateOne(
            {_id: require('mongodb').ObjectId(tripId)},
            {$push: {Students: doc}}
        );

        return {'error': false, 'body': ''};
    }

    //Gets a trip
    async getTrip(id){
        const TripsCollection = this.db.collection("Trips");

        const query = { _id: require('mongodb').ObjectId(id)};

        const trip = await TripsCollection.findOne(query, {});

        return {'error': false, 'body': trip};
    }

    async getStudent(id, tripId){
        const TripsCollection = this.db.collection("Trips");

        const query = { _id: require('mongodb').ObjectId(tripId)};

        var trip = await this.getTrip(tripId); //Gets trip


        trip = trip.body;

        if (trip && trip.Students){ //If students exist
            for (var i = 0; i < trip.Students.length; i++){ //Search for student
                if (trip.Students[i]._id && require('mongodb').ObjectId(trip.Students[i]._id).toString() == id){
                    return {'error': false, 'body': trip.Students[i], index: i};
                }
            }
        }

        

        return {'error': true, 'body': 'Not Found'}; //Not found error
    }

    async updateStudent(id, tripId, doc) {
        const TripsCollection = this.db.collection("Trips");

        var student = await this.getStudent(id, tripId); //Will fail if student does not exist
        if (student.error){
            return {'error': true, 'body': 'Update failed.'};
        }
        var index = student.index;
        student = student.body;

        var updateDoc = {};
        for (var field in doc){
            if (!student[field]){
                return {'error': true, 'body': 'Update failed.'};
            }
            try {
                student[field] = doc[field]; //Will fail for invalid fields
            }
            catch (error){
                return {'error': true, 'body': 'Update failed.'};
            }
            updateDoc['Students.$.'+field] = doc[field];
        }

        console.log(updateDoc);

        try {
            TripsCollection.updateOne(
                {_id: require('mongodb').ObjectId(tripId), 'Students._id': require('mongodb').ObjectId(id)},
                {$set: updateDoc}
            );
        }
        catch(error) {
            return {'error': true, 'body': 'Update failed.'};
        }

        return {'error': false, 'body': ''};
        
    }

}

module.exports = Trips;