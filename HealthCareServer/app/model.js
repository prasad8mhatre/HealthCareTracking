// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Location = new Schema({
    location: {type: [Number], required: true}
});

var Ambulance = new Schema({
    type: {type:String ,required :true},
    name :{type:String,required:true  },
    description : {type:String },
    location: {type: [Number], required: true},
    phone: {type: String, required:true }
});

var Hospital = new Schema({
    type: {type:String ,required :true},
    name :{type:String,required:true  },
    description : {type:String },
    location: {type: [Number], required: true},
    phone: {type: String, required:true }
});

Location.index({location: '2dsphere'});
Ambulance.index({location: '2dsphere'});
Hospital.index({location: '2dsphere'});

//Contact.methods.iam = function() { return 'Base'; };
//Company.methods.iam = function() { return 'Company'; };
//Person.methods.iam = function() { return 'Person'; };

var Base = mongoose.model('Location', Location, 'locations');
var exports = module.exports = Base;
Base.Ambulance = mongoose.model('Ambulance', Ambulance, 'ambulances');
Base.Hospital = mongoose.model('Hospital', Hospital, 'hospitals');