class TicketsService {
    constructor(repository) {
        this.repository = repository;
    }

    async getTickets() {
        return this.repository.getTickets();
    }

    async getTicket(id) {
        return this.repository.getTicket(id);
    }

    async createTicket(Ticket) {
        return this.repository.createTicket(Ticket);
    }

    async changeTicket(prodId, prodMod) {
        return this.repository.updateTicket(prodId, prodMod);
    }

    async deleteTicket(prodId) {
        return this.repository.deleteTicket(prodId);
    }
}

export default TicketsService;