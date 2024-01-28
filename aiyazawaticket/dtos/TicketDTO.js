class TicketDTO {
    constructor(rawProd) {
        this.name = rawProd.name;
        this.dni = rawProd.dni;
        this.cantidad = rawProd.cantidad;
        this.id = rawProd._id;
    }
}

export default TicketDTO;