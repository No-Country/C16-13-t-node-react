import express from 'express'; 
import { dbConnecion } from '../database/database';
const path = require('path'); 

import noticesRouter from '../routes/notices.routes';
import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';

import { validateToken } from '../controllers/auth.controller';

const cors = require('cors');

export default class Server {
    public app: express.Application;
    public port: number;

    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.app = express();

        this.middlewares();
        this.dbConnecion();
        this.routes();
    }

    async dbConnecion() {
        await dbConnecion();
    }

    private middlewares () {
        this.app.use( express.json() );
        this.app.use( cors() );
    }

    private routes () {
        this.app.use(noticesRouter);
        this.app.use(userRouter);
        this.app.use(authRouter);
        // Validate token path /secure routing
        this.app.use('/secure', validateToken);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');

        this.app.use(express.static(publicPath));
    }

    public listen() {
        this.app.listen( this.port, () => {
            console.log(`CORRIENDO en https://localhost:${ this.port }`);
        });
    }
}
