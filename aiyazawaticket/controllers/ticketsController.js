import TicketRepository from "../repository/TicketRepository.js";
import TicketsService from "../services/TicketsService.js";
import QRCode from 'qrcode';

export const TicketsStorage = new TicketRepository();
export const TicketService = new TicketsService(TicketsStorage);

export const getTickets = async (req, res) => {
    return TicketService.getTickets()
    .then(tickets => {
        return res.status(200).json({tickets})
    })
    .catch(err => {
        res.status(500).json({error: err.toString()}) 
    });
}

export const getTicket = async (req, res) => {
    const prodId = req.params.id;

    try {
        const foundTicket = await TicketService.getTicket(prodId)

        console.log(foundTicket)
        const qrCodeImage = await QRCode.toDataURL(JSON.stringify(foundTicket));
    
        return res.status(201).json({
            ticket: foundTicket,
            qrCode: qrCodeImage,
        });
    } catch (err) {
        console.error('Error al obtener el ticket:', err);
        return res.status(404).json({error: 'No se ha encontrado dicho ticket', desc: err.toString()}); 
    }
}

export const createTicket = async (req, res) => {
    try {
        const newTicket = req.body;
    
        const createdTicket = await TicketService.createTicket(newTicket);
        const qrCodeImage = await QRCode.toDataURL(JSON.stringify(createdTicket));

        return res.status(201).json({
        ticket: createdTicket,
        qrCode: qrCodeImage,
        });
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      return res.status(500).json({ error: error.toString() });
    }
  };

export const changeTicket = async (req, res) => {
    const prodMod = req.body;
    const prodId = req.params.id;
    return TicketService.changeTicket(prodId, prodMod)
    .then(Ticket => {
        return res.status(201).json({Ticket})
    })
    .catch(err => {
        res.status(500).json({error: err.toString()}) 
    });
}

export const deleteTicket = async (req, res) => {
    const prodId = req.params.id;
    return TicketService.deleteTicket(prodId)
    .then(_ => {
        return res.status(200).json({mensaje: 'Ticket eliminado'})
    })
    .catch(err => {
        res.status(500).json({error: err.toString()}) 
    });
}