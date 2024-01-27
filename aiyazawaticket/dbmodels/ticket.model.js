
import mongoose from "mongoose";
import "dotenv/config.js";

//MONGODB CONFIG

const dbUri =  process.env.MONGODB;

export const db = mongoose.connect(dbUri, 
{ useNewUrlParser: true })

const ticketSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 30},
    dni: {type: String, required: true, max: 20},
    cantidad: {type: String, required: true, max: 20}
})

export const Ticket = mongoose.model('Tickets', ticketSchema);
