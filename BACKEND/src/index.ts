import Server from "./models/server";
import dotenv from 'dotenv';

dotenv.config(); 

const port = Number(process.env.PORT) || 3000; 

const server = Server.init(port);




server.start(()=>{
    console.log(`CORRIENDO en el puerto ${port}`);
});