import { Schema, model, Document } from 'mongoose';

// Define el enum para las categorías
export enum Category {
    DEPORTES = 'Deportes',
    TECNOLOGIA = 'Tecnología',
    POLICIALES = 'Policiales',
    ESPECTACULO = 'Espectaculo',
    POLITICAS = 'Politicas',
    INTERES_GENERAL = 'Interes General'
}

export interface INotice extends Document {
    title: string;
    subtitle: string;
    imgUrl: string;
    synopsis: string;
    fecha: Date;
    category: Category; // Campo de tipo enum
}

const noticeSchema = new Schema<INotice>({
    title: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    subtitle:{
        type: String,
        required: [true, "El subtítulo es obligatorio"]
    },
    category:{
        type: String,
        enum: Object.values(Category), // Usamos los valores del enum como opciones válidas
        required: [true, "La categoría es obligatoria"]
    },
    imgUrl:{
        type: String,
        // required: [true, "La URL de la foto es obligatoria"]
    },
    synopsis:{
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

    notice.noticeId = _id;

    return notice;
};

export default model<INotice>("Notices", noticeSchema);

