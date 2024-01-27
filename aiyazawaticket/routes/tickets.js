import { validatePost, validatePut, authMiddleware } from "../middlewares/middlewares.js";
import { getTickets, getTicket, createTicket, changeTicket, deleteTicket } from "../controllers/ticketsController.js";
import express from "express";
const { Router } = express;
const ticketsRouter = Router()

export default ticketsRouter;

ticketsRouter.get('', getTickets)
ticketsRouter.get('/:id', getTicket)
ticketsRouter.post('', validatePost(), authMiddleware, createTicket)
ticketsRouter.put('/:id', validatePut(),  authMiddleware, changeTicket)
ticketsRouter.delete('/:id', authMiddleware, deleteTicket)