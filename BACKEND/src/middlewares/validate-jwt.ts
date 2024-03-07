import { response, request, NextFunction } from 'express'
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

import User from '../models/user';

export const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    if(await bcrypt.compare(password, hashedPassword)){
      console.log(await bcrypt.compare(password, hashedPassword));
      return true
    }
    return false
  } catch (error) {
    return error
  }
}

export const validateJWT = async( req= request, res = response, next: NextFunction ): Promise<string | any> => {

    const token = req.header( 'x-token' );

    if( !token ) {
      return res.status(401).json({
        msg: 'There is no token in the request'
      });
    }

    try {

      const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

      let user = await User.findById( uid );

      if( !user ) {
        return res.status(401).json({
          msg: 'Token not valid - user does not exist in DB'
        });
      }

      if( !user.available ) {
        return res.status(401).json({
          msg: 'Token not valid - user is not available'
        });
      }

      req.user = user;
      next();
      
    } catch (error) {
      console.log(error);

      res.status(401).json({
        msg: 'Invalid token'
      });
    }
}


