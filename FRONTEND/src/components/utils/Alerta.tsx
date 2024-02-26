
  export const Alerta = ({ mensaje }) => {
    const { error, msj } = mensaje;
    return (
      <>
        {error ? (
          <div className="bg-[--elert] text-white">{msj}</div>
        ) : (
          <div className="bg-[--succes] text-white">{msj}</div>
        )}
      </>
    );
  };
  