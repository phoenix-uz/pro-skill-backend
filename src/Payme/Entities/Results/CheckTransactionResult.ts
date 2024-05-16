export class CheckTransactionResult {
    create_time: number;
    perform_time: number;
    cancel_time: number;
    transaction: string;
    state: number;
    reason: number;

    constructor(create_time: number, perform_time: number, cancel_time: number, transaction: string, state: number, reason: number) {
        this.create_time = create_time;
        this.perform_time = perform_time;
        this.cancel_time = cancel_time;
        this.transaction = transaction;
        this.state = state;
        this.reason = reason;
    }
}