import jwt from "jsonwebtoken";
import { User } from "../dbmodels/user.model.js";
import { createHash } from '../utils/crypt.js';
import "dotenv/config.js";

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = user => {
    const token = jwt.sign({data: user}, SECRET_KEY, {expiresIn: '24h'});
    return token
}

export const register = async (req, res) => {

    const { username, password, email, name } = req.body;
    const userExists = await User.findOne({$or: [{username: username}, {email: email}]})

    if (userExists) {
        return res.json({ error: 'El nombre de usuario o email ya estan en uso' })
      }

    const newUser = new User()
    const hashedPassword = createHash(password);

    newUser.username = username
    newUser.password = hashedPassword
    newUser.email = email
    newUser.name = name

    newUser.save();

    const userInfo = {
        "username": newUser.username,
        "email": newUser.email,
        "name": newUser.name,
    }

    const access_token = generateToken(newUser)
    return res.json({ userInfo, access_token })
}

