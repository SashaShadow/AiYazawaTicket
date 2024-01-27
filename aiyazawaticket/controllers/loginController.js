import jwt from "jsonwebtoken";
import { User } from "../dbmodels/user.model.js";
import { isValidPassword } from '../utils/crypt.js';
import "dotenv/config.js";

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = user => {
    const token = jwt.sign({data: user}, SECRET_KEY, {expiresIn: '24h'});
    return token
}

export const login = async (req, res) => {
    
    const { username, password } = req.body;

    const authUser = await User.findOne({ username }) 

    if (!authUser) {
        return res.json({error: 'Usuario inexistente'})
    } 

    const passwordIsOk = isValidPassword(authUser.password, password);

    if (!passwordIsOk) {
        return res.json({ error: 'Contraseña incorrecta'})
    } else {
        const access_token = generateToken(authUser);

        const userInfo = {
            "username": authUser.username,
            "email": authUser.email,
            "name": authUser.name,
            "admin": authUser.admin ? authUser.admin : false
        }
        res.json({ userInfo, access_token })
    }
}

