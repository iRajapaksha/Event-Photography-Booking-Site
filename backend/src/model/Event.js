const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    event_name:{
        type:String,
        require:false
    },
    first_name:{
        type:String,
        required:false
    },
    last_name:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    years_of_experience:{
        type:String,
        required:false
    },
    images:{
        type:[String],
        require:false
    }


})

const event = mongoose.model('Event',eventSchema)

module.exports = event