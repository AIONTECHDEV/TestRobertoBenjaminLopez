import {Account} from "../entity/Account";
import {getRepository} from "typeorm-plus";
import {responseFunction, status} from "../helpers/FunctionGeneral";

export function findAccount(account: number, response): Promise<Account|undefined> {
    return getRepository(Account).findOne({account}).catch(reason => {
        responseFunction(response, status.error, 'Error in server', {reason: reason + ''});
        return null;
    });
}

export function updateAccount(account: Account, response) {
    return Account.update(account.id, account).catch(reason => {
        responseFunction(response, status.error, 'Error in server', {reason: reason + ''});
        return null;
    });
}
