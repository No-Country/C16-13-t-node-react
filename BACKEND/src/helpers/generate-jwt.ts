// import jwt from 'jsonwebtoken';
// import { jwt } from 'jsonwebtoken'

const jwt = require('jsonwebtoken');

export const generateJWT = ( uid = '' ) => {

  return new Promise( (resolve, reject) => {
    const payload = { uid };


    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '24h'
    }, ( err: Error, token: JsonWebKey ) => {
      if ( err ) {
        console.log(err);
        reject('Could not generate the token');
      } else {
        resolve( token );
      }
    });

  });
}

export const verifyToken = ( token = '' ) => {

  token.replace('Bearer ', '');

  return new Promise( (resolve, reject) => {
    jwt.verify( token, process.env.SECRETORPRIVATEKEY, ( err: Error, token: any ) => {
      if ( err ) {
        console.log(err);
        reject('Token invalid');
      } else {
        resolve( token );
      }
    });
  });
}