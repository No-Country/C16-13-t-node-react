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

