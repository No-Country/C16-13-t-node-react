import User from "../models/user"

export const emailExists = async( email = '' ): Promise<void> => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`User ${email} already exists`);
    }
}

