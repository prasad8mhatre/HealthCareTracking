// Dependencies
var mongoose        = require('mongoose');
var Ambulance       = require('./model.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/getAmbulance', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Ambulance.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/ambulance', function(req, res){

        // Creates a new Ambulance based on the Mongoose schema and the post bo.dy
        var newambulance = new Ambulance(req.body);

        // New Ambulance is saved in the db.
        newambulance.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        module.exports.facilities      = req.body.facilities;


        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Ambulance.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance/1000, spherical: true});

        }

        // ...include filter by Gender (all options)
      /*  if(module.exports.facilities.ECG  || module.exports.facilities.BP || module.exports.facilities.Sugar ){
            query.or([{ '': male }, { 'gender': female }, {'gender': other}]);
        }

        // ...include filter by Min Age
        if(minAge){
            query = query.where('age').gte(minAge);
        }

        // ...include filter by Max Age
        if(maxAge){
            query = query.where('age').lte(maxAge);
        }

        // ...include filter by Favorite Language
        if(favLang){
            query = query.where('favlang').equals(favLang);
        }

        // ...include filter for HTML5 Verified Locations
        if(reqVerified){
            query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
        }*/

        // Execute Query and Return the Query Results
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(users);
        });
    });

    // DELETE Routes (Dev Only)
    // --------------------------------------------------------
    // Delete a Ambulance off the Map based on objID
    app.delete('/ambulance/:objID', function(req, res){
        var objID = req.params.objID;
        var update = req.body;

        Ambulance.findByIdAndRemove(objID, update, function(err, user){
            if(err)
                res.send(err);
            res.json(req.body);
        });
    });
};