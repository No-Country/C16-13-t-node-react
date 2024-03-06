import Notices from "../models/notices";
import User from "../models/user"

export const emailExists = async( email = '' ): Promise<void> => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`User ${email} already exists`);
    }
}

export const userExistById = async( id = ''): Promise<void> => {
    const existUser = await User.findById( id );
    if( !existUser ) {
        throw new Error(`User with id: ${id} does not exist`);
    }
}

export const noticesExistById = async( id = '' ): Promise<void> => {
    const existNotice = await Notices.findById( id );
    if( !existNotice ) {
        throw new Error(`Notice with id: ${id} does not exist`);
    }
}