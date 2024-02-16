import { Schema, model, Document } from 'mongoose';

// Define el enum para las categorías
enum Categoria {
    DEPORTES = 'Deportes',
    TECNOLOGIA = 'Tecnología',
    POLICIALES = 'Policiales',
    ESPECTACULO = 'Espectaculo',
    POLITICAS = 'Politicas'
}

interface Notice extends Document {
    titulo: string;
    subTitulo: string;
    foto: string;
    sinopsis: string;
    fecha: Date;
    categoria: Categoria; // Campo de tipo enum
}

const noticeSchema = new Schema<Notice>({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    subTitulo:{
        type: String,
        required: [true, "El subtítulo es obligatorio"]
    },
    categoria:{
        type: String,
        enum: Object.values(Categoria), // Usamos los valores del enum como opciones válidas
        required: [true, "La categoría es obligatoria"]
    },
    foto:{
        type: String,
        required: [true, "La URL de la foto es obligatoria"]
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

    notice.noticeId = _id;

    return notice;
};

export default model<Notice>("Notices", noticeSchema);
