import Server from "./models/server";
require('dotenv').config();
import noticesRoutes from "./routes/notices.routes";
import adminRoutes from './routes/admin.routes';

const port = Number(process.env.PORT) || 3000; 

const server = Server.init(port);

server.app.use(noticesRoutes);
server.app.use(adminRoutes);


server.start(()=>{
    console.log(`CORRIENDO en el puerto ${port}`);
});