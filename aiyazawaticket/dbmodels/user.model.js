
import mongoose from "mongoose";
import "dotenv/config.js";

//MONGODB CONFIG

const dbUri =  process.env.MONGODB;

export const db = mongoose.connect(dbUri, 
{ useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 30, unique: true},
    password: {type: String, required: true, max: 20},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    admin: {type: Boolean} //puede estar pero se agrega manualmente, no se puede realizar un registro con este campo
})

export const User = mongoose.model('Users', userSchema);
