import {responseFunction, status} from "../helpers/FunctionGeneral";
import {findAccount} from "../Models/account.model";

export async function getBalance(request, response) {
    if (!request.query.account) {
        return responseFunction(response, status.bad, 'Account not valid', {});
    }
    const account = await findAccount(request.query.account, response);
    if (account){
        return responseFunction(response, status.success, 'Account balance', {balance: account});
    }else if (account === undefined){
        return responseFunction(response, status.bad, 'Account not found', {});
    }
}
