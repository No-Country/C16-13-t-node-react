import { Mensaje } from '../../interface/MensajeAlerta';

export const Alerta = ({ mensaje }: { mensaje: Mensaje }) => {
  
    const { error, msg } = mensaje;
    return (
      <>
        {error ? (
          <div className="bg-[--alert] text-white font-bold p-2 rounded-lg my-4 shadow-2xl">{msg}</div>
        ) : (
          <div className="bg-[--succes] text-white font-bold p-2 rounded-lg my-4 shadow-2xl">{msg}</div>
        )}
      </>
    );
};