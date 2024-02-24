"use strict";
// import jwt from 'jsonwebtoken';
// import { jwt } from 'jsonwebtoken'
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        console.log('payload', payload);
        // jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
        //   expiresIn: '4h'
        // }, ( err: Error, token: JsonWebKey ) => {
        //   if ( err ) {
        //     console.log(err);
        //     reject('Could not generate the token');
        //   } else {
        //     resolve( token );
        //   }
        // });
    });
};
exports.generateJWT = generateJWT;
