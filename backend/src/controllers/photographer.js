    const PhotographerModel = require('../model/Photographer')
const mongoose =require('mongoose')
const config = require('../config')
const createHttpError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
const express = require('express') 
const app = express()
const fileUpload = require('express-fileupload');
const { emit } = require('process');
app.use(express.json());
app.use(fileUpload())

exports.create = async (req,res,next)=>{
    const {first_name, last_name, city, email, years_of_experience,phone} =req.body
    try{
        const {image} =req.files;
        let filePath
        let filePathUpload
        if(!image){
            throw createHttpError(404,'image not found')
        }
        if(!image.mimetype.startsWith('image')){
            throw createHttpError(400,'Only images are allowed')
        }
         filePath = path.join(__dirname, '../../public/events/', image.name);
    image.mv(filePath);
    filePath = '/events/' + image.name;
       
        if(!first_name || !last_name || !city || !email || !years_of_experience){
            throw createHttpError(400,'Please provide all the required infromation')
        }
        const photographer = new PhotographerModel({
            first_name,
            last_name,
            city,
            email,
            phone,
            years_of_experience,
            image:filePath
        })

        const result = await photographer.save()
        res.status(201).send(result)
    }catch(error){
        next(error)
    }
}

exports.update = async(req,res,next)=>{
    
    const {first_name, last_name, city,email, years_of_experience,phone} =req.body
    try{
    // if(!mongoose.isValidObjectId(photographerId)){
    //     throw createHttpError(404,'Invalid ID')
    // }
    // if(!first_name || !last_name || !city || !email || !years_of_experience){
    //     throw createHttpError(400,'Please provide all the required infromation')
    // }
    const photographer = await PhotographerModel.findOne({ email: email }).exec();
    if(!photographer){
        throw createHttpError(404,'Photographer not Found')
    }
    if (req.files && req.files.image){
        const {image}= req.files
        if(image){

            if(!image.mimetype.startsWith('image')){
                throw createHttpError(400, 'Only images are allowed')
            }
             filePath = __dirname + '../../public ' + image.name
             image.mv(filePath);
    
             filePathUpload = 'public/'  + image.name
             photographer.image=filePathUpload

        }
    }
     
    photographer.first_name=first_name
    photographer.last_name=last_name
    photographer.email=email
    photographer.city=city
    photographer.phone=phone
    photographer.years_of_experience=years_of_experience
   
    const result = await photographer.save()

    res.status(200).send(result)


    }catch(error){
    next(error)
    }
}

exports.getOne = async (req,res,next)=>{
    const id = req.params.id

    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(404,'Invalid ID')
        }

        const result = await PhotographerModel.findById(id).exec()

        if(!result){
            throw createHttpError(404,'Photographer Not Found')
        }

        res.status(200).send(result)

    }catch(error){
        next(error)
    }
}

exports.getOneByEmail = async (req, res, next) => {
    const email = req.params.email; 
  
    try {

      const result = await PhotographerModel.findOne({ email }).exec();
  
      if (!result) {
        throw createHttpError(404, 'Photographer Not Found');
      }
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
  
exports.login = async (req, res, next) => {
    const {email, password} = req.body

    try {
        if (!email || !password) {
            throw createHttpError(400, 'Missing required parameters.....');
        }

        
        const photographer = await PhotographerModel.findOne({ email: email }).exec();

        if (!photographer) {
            throw createHttpError(400, 'Photographer does not exist');
        }

   
        const isPasswordValid = await bcrypt.compare(password, photographer.password);

        if (!isPasswordValid) {
            throw createHttpError(400, 'Invalid credentials');
        }

        const JWT_TOKEN_KEY = config.JWT_TOKEN_KEY; 
        const token = jwt.sign(
            {
                photographer_id: photographer.id,
                email: photographer.email,
            },
            JWT_TOKEN_KEY,
            {
                expiresIn: '4h',
            }
        );

        
        photographer.token = token;
        const result = await photographer.save();

        res.status(200).send({ token: token, email: photographer.email });

    } catch (error) {
        next(error);
    }
};


exports.register = async (req,res,next)=>{
    
    const email = req.body.email
    const password = req.body.password
    try{
        if(!email || !password){
            throw createHttpError(400,'Missing required parameters')
        }

        const isPhotographerAvailable = await PhotographerModel.findOne({email:email}).exec();

        if(isPhotographerAvailable){
            throw createHttpError(400,'user already exists')
        }

        const hashPassword = await  bcrypt.hash(password,12);

        const photographer = new PhotographerModel({
            email:email,
            password:hashPassword
        })

        const result = await photographer.save();

        res.status(201).send(result)

    }catch(error){
        next(error)

    }

}