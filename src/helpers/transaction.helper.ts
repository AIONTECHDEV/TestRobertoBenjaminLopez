import {check} from "express-validator";

export const validTransaction = [
    check('fromAccount', 'Enter from account').isNumeric(),
    check('toAccount', 'Enter to account').isNumeric(),
    check('amount', 'Enter amount').isNumeric(),
]
