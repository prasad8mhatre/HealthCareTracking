// Depe
// Opens App Routes

var mongoose        = require('mongoose');
var Base            = require('./model.js');

module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/getAmbulance', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Base.Ambulance.find({});
        query.exec(function(err, ambulances){
            if(err)
                res.end(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(ambulances);
        });
    });

    app.get('/getHospital', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Base.Hospital.find({});
        query.exec(function(err, hospitals){
            if(err)
                res.end(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(hospitals);
        });
    });


    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/add', function(req, res){

        var newBase = null;
        // Creates a new User based on the Mongoose schema and the post bo.dy
        if(req.body.type == 'Ambulance')
            newBase = new Base.Ambulance(req.body);
        else
            newBase = new Base.Hospital(req.body);

        // New User is saved in the db.
        newBase.save(function(err){
            if(err)
                res.end(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/search/', function(req, res){

        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var type            = req.body.type;
        // module.exports.facilities      = req.body.facilities;
        var query = null;
        // Opens a generic Mongoose Query. Depending on the post body we will...
        if(req.body.type == 'Ambulance')
            query = Base.Ambulance.find({});
        else
            query = Base.Hospital.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});

        }

        if(type){
            query = query.where('type').equals(type);
        }

        // Execute Query and Return the Query Results
        query.exec(function(err, ambulances){
            if(err)
                res.end(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(ambulances);
        });
    });

};
