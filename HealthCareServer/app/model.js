// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
/*var UserSchema = new Schema({
    username: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    favlang: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});*/

var equipments = {
    ECG : null,
     BP : null,
   Sugar: null
};
module.exports.equipments = equipments;

var AmbulanceSchema = new Schema({
    id : {type: [Number],required:true},
    description : {type:String },
    location: {type: [Number], required: true},
    phone: {type: String, required:true },
    facilities: {type: equipments}

});


// Sets the created_at parameter equal to the current time
/*UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});*/


// Indexes this schema in geoJSON format (critical for running proximity searches)
AmbulanceSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "user"
//module.exports = mongoose.model('user', UserSchema);
module.exports = mongoose.model('ambulance',AmbulanceSchema);

