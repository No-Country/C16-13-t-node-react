import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { comparePassword } from "../middlewares/validate-jwt";

const bcryptjs = require('bcryptjs');


export const obtenerPerfil = async (req: Request, res: Response) => {
    const { user } = req
    res.json({
        user
    })
}

export const getUsers = async (req: Request, res: Response): Promise<Response>  => {
  try {
      const users = await User.find();
      return res.status(200).json({
          msg: 'Users list',
          users
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          msg: 'Error listing users. Contact administrator'
      });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
      const user: IUser | null = await User.findById( id );
      // if( !user ) {
      //     return res.status(404).json({ msg: 'Noticia no encontrada' });
      // }
      return res.status(200).json({ user });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          msg: 'Error getting user. Contact administrator'
      });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const emailExists = await User.findOne({email: req.body.email})
        if(!emailExists){
            const { name, lastName, pass, email, imgUrl } =  req.body;
            if(req.body.pass === req.body.confirmPass){
                const saltRounds = 10; // Factor de costo para bcrypt
                const salt = bcryptjs.genSaltSync(saltRounds); // Genera un salt con el factor de costo especificado
    
                const user = new User({ name, lastName, pass, email, imgUrl });
                user.pass = bcryptjs.hashSync(pass, salt); // Hashea la contraseña con el salt generado
                
                await user.save();
                return res.status(201).json({
                    msg: 'User created successfully',
                    user
                });
            } else {
                return res.send('Passwords do not match.')
            }
        } else {
            return res.send(`${req.body.email} is already in use.`)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error '
        });
    }
};


export const updateUserById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const user: IUser | null = await User.findById(id);

        if ( !user ) {
            return res.status(400).json({ msg: 'The user was not found' });
        }

        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.pass = req.body.pass || user.pass;
        user.email = req.body.email || user.email;
        user.imgUrl = req.body.imgUrl || user.imgUrl;
        user.rol = req.body.rol || user.rol;

        const password = req.body.pass || user.pass;

        if ( password ) {
          const salt = bcryptjs.genSaltSync();
          user.pass = bcryptjs.hashSync( password, salt );
        }

        const userUpdated: IUser | null = await User.findByIdAndUpdate( id, user );

        return res.status(200).json({ userUpdated });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error updating user. Contact administrator'
        });
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const user: IUser | null = await User.findById(id);

        if ( !user ) {
            return res.status(400).json({ msg: 'The user was not found' });
        }

        const userEliminated: IUser | null = await User.findByIdAndUpdate( id, { available: false } );

        return res.status(200).json({
            msg: 'User deleted successfully',
            userEliminated
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error deleting a user. Contact administrator'
        });
    }
};
