"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
require('dotenv').config();
const notices_routes_1 = __importDefault(require("./routes/notices.routes"));
const port = Number(process.env.PORT) || 3000;
const server = server_1.default.init(port);
server.app.use(notices_routes_1.default);
server.start(() => {
    console.log(`CORRIENDO en el puerto ${port}`);
});
