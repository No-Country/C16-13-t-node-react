import { Request, Response } from "express";
import User, { IUser } from "../models/users";

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
      if( !user ) {
        return res.status(404).json({ msg: 'Noticia no encontrada' });
      }
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
        const { name, lastName, pass, email, imgUrl } =  req.body;
        const user = new User({ name, lastName, pass, email, imgUrl });
        await user.save();
        return res.status(201).json({
            msg: 'User created successfully',
            user
        });
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
        // user.avilable = true;
        const userUpdated: IUser | null = await user.save();
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

        user.avilable = false;

        const userEliminated: IUser | null = await user.save();
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
