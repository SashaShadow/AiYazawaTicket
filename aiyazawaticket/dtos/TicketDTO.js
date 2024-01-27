class TicketDTO {
    constructor(rawProd) {
        this.name = rawProd.name;
        this.dni = rawProd.price;
        this.cantidad = rawProd.stock;
        this.id = rawProd._id;
    }
}

export default TicketDTO;