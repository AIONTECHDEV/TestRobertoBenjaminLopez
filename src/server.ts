import * as express from 'express';
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser';
import "reflect-metadata";
import Inicializacion from './db/Inicializacion'
import * as cors from "cors";
import {routerTransaction} from "./routes/transaction.route";
import {routerAccount} from "./routes/account.route";

const app = express();

//iniciando la base de datos
const bd = new Inicializacion();
app.use(cors());
/******************* Middleware's ********************/
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/balance', routerAccount);
app.use('/api/transfer', routerTransaction);
app.listen(5000);
