import { NextFunction, Request, Response } from 'express';
const bcryptjs = require('bcryptjs');

import User from '../models/user';

import { generateJWT, verifyToken } from '../helpers/generate-jwt';

export const login = async (req: Request, res: Response) => {

    const { email, pass } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'User / Password not valid - enail '
            });
        }

        if (!user.available) {
            return res.status(400).json({
                msg: 'User / Password not valid - available: false'
            })
        }

        const validPassword = bcryptjs.compareSync(pass, user.pass);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password not valid - password'
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact administrator'
        });

    }

}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }

    const validToken = await verifyToken(token);

    if (!validToken) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }

    next();

}