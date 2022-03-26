/*
 * Class handles the trip/class collection in the database
 * All database transactions are initiated in this class
 * Enforces the schema and other restrictions
*/

const mongoDbClass = require("./dbClass");

class Trips extends mongoDbClass {
    constructor(){
        super()
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

    //Gets a trip
    getTrip(id){

    }

}

module.exports = Trips;