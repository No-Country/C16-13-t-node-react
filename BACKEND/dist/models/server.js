"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("../database/database");
const path = require("path");
const notices_routes_1 = __importDefault(require("../routes/notices.routes"));
const admin_routes_1 = __importDefault(require("../routes/admin.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const cors = require('cors');
class Server {
    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.app = express();
        this.middlewares();
        this.dbConnecion();
        this.routes();
    }
    dbConnecion() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.dbConnecion)();
        });
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes() {
        this.app.use(notices_routes_1.default);
        this.app.use(admin_routes_1.default);
        this.app.use(user_routes_1.default);
    }
    // static init(port: number): Server {
    //     return new Server(port);
    // }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    // start(callback: () => void): void {
    //     this.app.listen(this.port, callback);
    // }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`CORRIENDO en https://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
