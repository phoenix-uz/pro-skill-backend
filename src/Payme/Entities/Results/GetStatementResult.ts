//import { Account } from 'path_to_account_model'; // Adjust the path as per your project structure

import { Account } from "../account";

export class GetStatementResult {
    id: string;
    time: Date;
    amount: number;
    account: Account;
    create_time: number;
    perform_time: number;
    cancel_time: number;
    transaction: string;
    state: number;
    reason: number;

    constructor(
        id: string,
        time: Date,
        amount: number,
        account: Account,
        create_time: number,
        perform_time: number,
        cancel_time: number,
        transaction: string,
        state: number,
        reason: number
    ) {
        this.id = id;
        this.time = time;
        this.amount = amount;
        this.account = account;
        this.create_time = create_time;
        this.perform_time = perform_time;
        this.cancel_time = cancel_time;
        this.transaction = transaction;
        this.state = state;
        this.reason = reason;
    }
}