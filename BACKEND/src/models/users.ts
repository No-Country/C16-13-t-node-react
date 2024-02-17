import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    lastName: string;
    pass: string;
    email: string;
    imgUrl: string;
    avilable: boolean;
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
      required: [true, "Email is required"]
  },
  imgUrl: {
      type: String,
      required: [true, "ImageUrl is required"]
  },
  avilable: {
      type: Boolean,
      default: true
  }
});

userSchema.methods.toJSON = function (): any {
    const { __v, _id, ...notice } = this.toObject();

    notice.noticeId = _id;

  return notice;
};

export default model<IUser>("User", userSchema);