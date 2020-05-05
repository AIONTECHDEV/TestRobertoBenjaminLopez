import {Transaction} from "../entity/Transaction";
import {responseFunction, status} from "../helpers/FunctionGeneral";
import {getRepository} from "typeorm-plus";

export function saveTransaction(transaction: Transaction, response ): Promise<Transaction> {
    return transaction.save().catch(reason => {
        responseFunction(response, status.error, 'Error in server', {reason: reason + ''});
        return null;
    });
}

export function getAllTransactions(account:number, response) {
return getRepository(Transaction).createQueryBuilder('transaction')
    .where('transaction.fromAccount = :account or transaction.toAccount = :account', {account: account})
    .getMany().catch(reason => {
        responseFunction(response, status.error, 'Error in server', {reason: reason + ''});
        return null;
    });
}
export function getAllReceived(account:number, response) {
    return getRepository(Transaction).createQueryBuilder('transaction')
        .where('transaction.toAccount = :account', {account: account}).getMany().catch(reason => {
            responseFunction(response, status.error, 'Error in server', {reason: reason + ''});
            return null;
        });
}
export function getAllSent(account:number, response) {
    return getRepository(Transaction).createQueryBuilder('transaction')
        .where('transaction.fromAccount = :account', {account: account}).getMany().catch(reason => {
            responseFunction(response, status.error, 'Error in server', {reason: reason + ''});
            return null;
        });
}
