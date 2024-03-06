import { Mensaje } from '../../interface/MensajeAlerta';

export const Alerta = ({ mensaje }: { mensaje: Mensaje }) => {
  
    const { error, msg } = mensaje;
    return (
      <>
        {error ? (
          <div className="bg-[--alert] text-white font-bold px-2 py-4 rounded-lg my-4 shadow-2xl text-center">{msg}</div>
        ) : (
          <div className="bg-[--succes] text-white font-bold px-2 py-4 rounded-lg my-4 shadow-2xl text-center">{msg}</div>
        )}
      </>
    );
};