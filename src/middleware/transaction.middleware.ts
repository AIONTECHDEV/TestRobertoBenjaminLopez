import {validationResult} from "express-validator";
import {responseFunction, status} from "../helpers/FunctionGeneral";
import {Transaction} from "../entity/Transaction";
import {getAllReceived, getAllSent, getAllTransactions, saveTransaction} from "../Models/transaction.model";
import {findAccount, updateAccount} from "../Models/account.model";


export async function newTransfer(request, response) {
    // validate values
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return responseFunction(response, status.unprocesable, 'Information incomplet', {errors: errors.array()});
    }
    //create transaction
    const newTransaction = new Transaction(request.body);
    //find accounts and validate
    const fromAccount = await findAccount(newTransaction.fromAccount, response);
    if (fromAccount === undefined) {
        return responseFunction(response, status.bad, 'from account not found', {});
    }
    const toAccount = await findAccount(newTransaction.toAccount, response);
    if (toAccount === undefined) {
        return responseFunction(response, status.bad, 'to account not found', {});
    }
    //operation
    if (fromAccount && toAccount) {
        if (calculateOperation(fromAccount.balance, newTransaction.amount)) {
            fromAccount.balance = fromAccount.balance - newTransaction.amount;
            toAccount.balance = toAccount.balance + newTransaction.amount;
            //update accounts
            const updateFromAccount = await updateAccount(fromAccount, response);
            const updateToAccount = await updateAccount(toAccount, response);
            if (updateFromAccount && updateToAccount) {
                const result = await saveTransaction(newTransaction, response);
                if (result) {
                    return responseFunction(response, status.created, 'Transaction success', result);
                }
            }
        } else {
            return responseFunction(response, status.bad, 'Amount not valid', {});
        }
    }
}
export async function allTransactions(request, response) {
    if (!request.query.account) {
        return responseFunction(response, status.bad, 'Account not valid', {});
    }
    const transactions = await getAllTransactions(request.query.account, response);
    if (transactions){
        return responseFunction(response, status.success, 'transactions', {transactions: transactions});
    }
}
export async function allReceived(request, response) {
    if (!request.query.account) {
        return responseFunction(response, status.bad, 'Account not valid', {});
    }
    const transactions = await getAllReceived(request.query.account, response);
    if (transactions){
        return responseFunction(response, status.success, 'transactions', {transactions: transactions});
    }
}
export async function allSent(request, response) {
    if (!request.query.account) {
        return responseFunction(response, status.bad, 'Account not valid', {});
    }
    const transactions = await getAllSent(request.query.account, response);
    if (transactions){
        return responseFunction(response, status.success, 'transactions', {transactions: transactions});
    }
}

function calculateOperation(amountAccount: number, amoutTransaction: number): boolean {
    return amountAccount - amoutTransaction >= -500
}

