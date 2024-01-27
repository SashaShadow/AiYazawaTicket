import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, Ticket } from "../dbmodels/ticket.model.js";

class TicketsDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, Ticket)
    }
    
  }

export default TicketsDAOMongoDB;