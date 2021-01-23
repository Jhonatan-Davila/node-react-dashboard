import * as express from 'express';
const cors = require('cors');
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { cimp, cinfo, cerr } from 'simple-color-print';
import BlogController from './Controllers/BlogController';
import { createConnection, Connection } from 'typeorm';
import config from './ormconfig';
import UserController from './Controllers/UserController';
import CalendarController from './Controllers/CalendarController';


class IntranetServer extends Server {
    
    private _port = 8080;
    private readonly _SERVER_START_MSG = 'App server started on port: ';
    private readonly _DEV_MSG = 'Express Server is running in development mode. Start the React ' +
        'development server "npm run start:react" to develop front-end content. Back-end is ' +
        'currently running on port: ';


    constructor() {
        super();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        // CORS-enabled for all origins! 
         var corsOptions = {
            origin: 'http://localhost:3000', 
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
          }
        this.app.use(cors(corsOptions));    
        // Setup the controllers
        super.addControllers(new BlogController());
        super.addControllers(new UserController());
        super.addControllers(new CalendarController());
        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            cinfo('Starting server in development mode');
            const msg = this._DEV_MSG + process.env.EXPRESS_PORT;
            this.app.get('*', (req: any, res: any) => res.send(msg));
        }
    }


    public start(): void {
        this.app.listen(this._port, () => {
            this.connectToDb();
            cimp(this._SERVER_START_MSG + this._port);
        });
    }

   async connectToDb(): Promise<void> {
 
        try {
            let connection: Connection = await createConnection({
                synchronize: true,
                type: 'postgres',
                host: 'postgres',
                port: 5432,
                database: 'intranet',
                username: 'intranet',
                password: 'admin',
                entities: [
                    'src/Entities/*.js',
                    'src/Entities/*.ts',
                ],
                logging: ['error', 'query'],
                migrationsTableName: "migration_table",
                migrations: ["src/Migrations/*.ts", "Migrations/*.js"],
                cli: {
                    "migrationsDir": "src/Migrations"
                }
                // dropSchema: true,
            });
            await connection.runMigrations();
            cinfo('Succesfully connected to DB');
            } catch (error) {
            cimp(error);
            await new Promise(resolve => setTimeout(resolve, 2000))
            this.connectToDb();
            //return error;
        }
    }
}

export default IntranetServer;