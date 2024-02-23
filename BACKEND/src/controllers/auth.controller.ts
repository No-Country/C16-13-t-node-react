import { Request, Response } from 'express';
const bcryptjs = require('bcryptjs');

import User from '../models/user';

// import { generateJWT } from '../helpers/generate-jwt';
// import { json } from 'express/lib/response';

export const login = async ( req: Request, res: Response ) => {

  const { email, password } = req.params;

  try {
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status(400).json({
        msg: 'User / Password not valid - enail '
      });
    }

    if ( !user.available ) {
      return res.status(400).json({
        msg: 'User / Password not valid - available: false'
      })
    }

    const validPassword = bcryptjs.compareSync( password, user.pass );
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'User / Password not valid - password'
      })
    }

    // const token = await generateJWT( user.id );

    res.json({
      user,
      // token
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact administrator'
    })
    
  }

}