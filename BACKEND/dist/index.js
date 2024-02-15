"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const server_1 = __importDefault(require("./models/server"));
// const port = Number(process.env.PORT) || 3000; 
// const server = Server.init(port);
// server.app.use(noticesRoutes);
// server.app.use(adminRoutes);
// server.start(()=>{
//     console.log(`CORRIENDO en el puerto ${port}`);
// });
const server = new server_1.default();
server.listen();
