const mongoose = require('mongoose')
const Schema = mongoose.Schema


const photographerSchema = new Schema({
    first_name:{
        type:String,
        required:false
    },
    last_name:{
        type:String,
        required:false

    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    phone:{
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
    image:{
        type:String,
        required:false

    }

})

const photographer = mongoose.model('Photographer',photographerSchema)

module.exports = photographer