import TicketsDAOMongoDB from "../daos/TicketsDAOMongoDB.js";
import "dotenv/config.js";

let prodInstance = null;

class DAOFactory {
    constructor() {
        this.db = 'no';
    }

    getTicketDAO() {
        if (!prodInstance) {
            if (this.db === 'no') {
                prodInstance = new TicketsDAOMongoDB();
            } 
        }
        return prodInstance
    }
}

export default DAOFactory;