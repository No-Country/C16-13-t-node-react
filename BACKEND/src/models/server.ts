import express = require('express');
import { dbConnecion } from '../database/database';
import path = require('path');

const cors = require('cors');

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        this.app.use( cors());
        this.dbConnecion();
    }

    async dbConnecion() {
        await dbConnecion();
    }

    static init(port: number): Server {
        return new Server(port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');

        this.app.use(express.static(publicPath));
    }

    start(callback: () => void): void {
        this.app.listen(this.port, callback);
    }
}
