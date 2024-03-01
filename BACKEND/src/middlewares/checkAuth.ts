import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/generate-jwt";
const jwt = require('jsonwebtoken');
import user from "../models/user";
require('dotenv').config();


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    let token;
    if (req.headers) {
        try {
            token = req.headers.token;
            const decored = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            req.user = await user.findById(decored.uid).select('-password');
            return next();
        } catch (error) {
            const err = new Error('Token no valido.')
            return res.status(403).json({ msg: err.message });
        }
    }
    if (!token) {
        const error = new Error('Token invalido o inexistente.')
        res.status(403).json({ msg: error.message });
    }
    next();

}