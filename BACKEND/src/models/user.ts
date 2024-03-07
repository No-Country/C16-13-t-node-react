import { Schema, model, Document } from 'mongoose';

// Define el enum para los roles de usuarios
export enum Roles {
  SUPADMIN = 'superadmin',
  ADMIN = 'administrator',
  USER = 'user',
}

export interface IUser extends Document {
    name: string;
    lastName: string;
    pass: string;
    email: string;
    imgUrl: string;
    rol: Roles;
    available: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
      type: String,
      required: [true, "Name is required"]
  },
  lastName: {
      type: String,
      required: [true, "LastName is required"]
  },
  pass: {
      type: String,
      required: [true, "Pass is required"]
  },
  email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
  },
  imgUrl: {
      type: String,
      // required: [true, "ImageUrl is required"]
      // Change at deploying time to validate the image
      default: 'localhost:8000/assets/userDefault.jpg'
  },
  rol: {
      type: String,
      enum: Object.values(Roles),
      // required: [true, "Role is required"]
      default: Roles.USER
  },
  available: {
      type: Boolean,
      default: true
  }
});

userSchema.methods.toJSON = function (): any {
    const { __v, _id, ...user } = this.toObject();

    user.userId = _id;

  return user;
};

export default model<IUser>("User", userSchema);