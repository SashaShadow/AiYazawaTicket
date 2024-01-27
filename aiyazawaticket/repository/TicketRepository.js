import TicketDTO from "../dtos/TicketDTO.js";
import DAOFactory from "../factory/DAOfactory.js";

const myDAO = new DAOFactory();

class TicketRepository {
    constructor() {
        this.dao = myDAO.getTicketDAO();
    }

    async getTickets() {
        const Ticketos = await this.dao.getElems();
        return Ticketos.map(dto => new TicketDTO(dto));
    }

    async getTicket(id) {
        const Ticketo = await this.dao.getElem(id);
        const dto = new TicketDTO(Ticketo[0]);
        return dto;
    }

    async createTicket(Ticket) {
        return await this.dao.postElem(Ticket);
    }

    async updateTicket(prodId, Ticket) {
        return await this.dao.putElem(prodId, Ticket);
    }

    async deleteTicket(TicketId) {
        return await this.dao.deleteElem(TicketId);
    }
}

export default TicketRepository;