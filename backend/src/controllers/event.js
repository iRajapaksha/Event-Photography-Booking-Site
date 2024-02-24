const EventModel =require('../model/Event')
const createHttpError = require('http-errors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const express =require('express')
const path = require('path');
const app = express()
const fileUpload = require('express-fileupload')

app.use(fileUpload())



exports.create = async (req, res, next) => {
    const {event_name,first_name, last_name, city, phone, email, years_of_experience} =req.body


    try {
        const { images } = req.files;
        const filePaths = [];

        if (!images || images.length !== 4) {
            throw createHttpError(400, 'Please provide 4 images');
        }

        for (let i = 0; i < 4; i++) {
            const image = images[i];

            if(images.includes(image.name)){
                throw createHttpError(400,'Sample name exists')
            }

            // for(let j=i+1; j<5;j++){
            //     if(image.id == images[j].id){
            //         throw createHttpError(400,'Sample name is already exist')
            //     }

            // }
           
            if (!image.mimetype.startsWith('image')) {
                throw createHttpError(400, 'Only images are allowed');
            }

            const filePath = path.join(__dirname, '../../public/events', image.name);
            image.mv(filePath);
            filePaths.push('/events/' + image.name);
        }



        const event = new EventModel({
            event_name,
            first_name, 
            last_name,
            city,
            phone,
            email,
            years_of_experience,
            images: filePaths 
        });

        const result = await event.save();
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
};


exports.update = async(req,res,next)=>{
    const eventId = req.params.id;

    const {event_name, photographer_id, photographer_name, duration, description,price} = req.body

    try{
        if(!mongoose.isValidObjectId(eventId)){
            throw createHttpError(404,'Invalid ID')
        }
        // if(!event_name || !photographer_id || !photographer_name || !duration || !description || !price){
        //     throw createHttpError(400,'Please provide the required details')
        // }
        const event = await EventModel.findById(eventId).exec()

        if(!event){
            throw createHttpError(404, 'Event not found')
        }

        if(req.files && req.files.image){
            const {image}= req.files
            if(image){
            
                if(!image.mimetype.startsWith('image')){
                    throw createHttpError(400, 'Only images are allowed')
                }
                 filePath = __dirname + '../../public/events' + image.name
                image.mv(filePath);
        
                 filePathUpload = 'public/events'  + image.name
                 event.image = filePathUpload
            }

        }
        
        event.event_name= event_name
        event.photographer_id = photographer_id
        event.photographer_name = photographer_name
        event.description= description
        event.price= price
        event.duration= duration       
        const result = await event.save()

        res.status(200).send(result)



    }catch(error){
        next(error)
    }
}

exports.delete = async(req,res,next)=>{
    const eventId = req.params.id

    try{
        if(!mongoose.isValidObjectId(eventId)){
            throw createHttpError(404,'Invalid ID')
        }

        const result = await EventModel.findByIdAndDelete(eventId).exec()

        if(!result){
            throw createHttpError(404,'Product not found')
        }

        res.status(200).send(result)


    }catch(error){
        next(error)
    }

}

exports.getAll = async (req,res,next)=>{
    try{
        const result = await EventModel.find().exec();
        if(!result){
            return res.status(404).join({message: 'No event found'})
        }
        res.status(200).json(result)

    }catch(error){
        next(error)

    }
}

// exports.getOne = async (req,res,next)=>{
//     const id = req.params.id

//     try{
//         if(!mongoose.isValidObjectId(id)){
//             throw createHttpError(404,'Invalid ID')
//         }

//         const result = await EventModel.findById(id).exec()

//         if(!result){
//             throw createHttpError(404,'Event not found')
//         }

//         res.status(200).send(result)


//     }catch(error){
//         next(error)
//     }
// }
exports.getEventByEmail = async (req, res, next) => {
    const email = req.params.email; 
  
    try {
      const result = await EventModel.find({ email }).exec(); 
  
      if (!result) {
        throw createHttpError(404, 'Event not found');
      }
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
  
exports.search = async (req,res,next)=>{
    const query = req.query.q;

    try{
        if(!query)
        {
            throw createHttpError(400,'Please provide a search query')
        }
        const result = await EventModel.find({event_name:{$regex:query, $options:'i'}}).exec()
        if(!result)
        {
            throw createHttpError(404,'Event not found')
        }
        res.status(200).send(result)

    }
    catch(error)
    {
        next(error)
    }
}