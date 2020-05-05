import * as express from "express";
import {getBalance} from "../middleware/account.middleware";


export const routerAccount = express.Router();
routerAccount.get('/',getBalance );
