"use strict";
// import jwt from 'jsonwebtoken';
// import { jwt } from 'jsonwebtoken'
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJWT = void 0;
const jwt = require('jsonwebtoken');
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Could not generate the token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
const verifyToken = (token = '') => {
    token.replace('Bearer ', '');
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token invalid');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.verifyToken = verifyToken;
