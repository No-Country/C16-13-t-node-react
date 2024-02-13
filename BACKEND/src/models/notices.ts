import { Schema, model, Document } from 'mongoose';

//NOTICES MODEL STRUCTURE

interface Notice extends Document {
    titulo: string;
    subTitulo: string;
    foto: Buffer;
    sinopsis: string;
    fecha: Date;
}

const noticeSchema = new Schema<Notice>({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    subTitulo:{
        type: String,
        required: [true, "El subtitulo es obligatorio"]
    },
    foto:{
        type: Buffer,
        required: [true, "La foto es obligatoria"]
    },
    sinopsis:{
        type: String,
        required: [true, "La sinopsis es obligatoria"]
    },
    fecha: {
        type: Date,
        default: new Date()
    }
});

noticeSchema.methods.toJSON = function (): any {
    const { __v, _id, ...notice } = this.toObject();

    notice.uid = _id;

    return notice;
};

export default model<Notice>("Notices", noticeSchema);