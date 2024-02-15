import 'dotenv/config';
// require('dotenv').config();

import Server from "./models/server";

// const port = Number(process.env.PORT) || 3000; 

// const server = Server.init(port);

// server.app.use(noticesRoutes);
// server.app.use(adminRoutes);


// server.start(()=>{
//     console.log(`CORRIENDO en el puerto ${port}`);
// });

const server = new Server();

server.listen();