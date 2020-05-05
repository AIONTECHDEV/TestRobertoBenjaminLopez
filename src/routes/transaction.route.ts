import * as express from "express";
import {validTransaction} from "../helpers/transaction.helper";
import {allReceived, allSent, allTransactions, newTransfer} from "../middleware/transaction.middleware";


export const routerTransaction = express.Router();
routerTransaction.post('/',validTransaction, newTransfer);
routerTransaction.get('/alltransactions',allTransactions);
routerTransaction.get('/allreceived',allReceived);
routerTransaction.get('/allsent',allSent);
