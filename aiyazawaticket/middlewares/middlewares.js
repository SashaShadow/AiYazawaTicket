
import "dotenv/config.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: 'Necesitas enviar un token válido'
      })
    }
    const token = authHeader.split(' ')[1] || authHeader;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Necesitas un token válido'
        })
      }
      req.user = decoded.data
      console.log(req.user)

      if (req.user.admin) {
        next()
      } else {
        return res.status(401).json({
            error: 'Necesitas ser admin para usar esta funcion'
          })
      }
    })
}

export const validatePost = () => {
    return (req, res, next) => {
        const ticketNuevo = req.body;
        if (ticketNuevo.name && ticketNuevo.dni && ticketNuevo.cantidad && 
            Object.keys(ticketNuevo).length === 3) {
                next();
        } else {
            return res.status(400).json({ error: "parametros incorrectos" });
        }
    }
}

export const validatePut = () => {
    return (req, res, next) => {
        const ticketMod = req.body;
        const format = ticketMod.name && ticketMod.dni && ticketMod.cantidad &&
        Object.keys(ticketMod).length === 3 ? true : null;

        if (format) {
            next();
        } else {
            res.status(400).json({error: "El formato del ticket no es correcto"})
        }
    }
}
