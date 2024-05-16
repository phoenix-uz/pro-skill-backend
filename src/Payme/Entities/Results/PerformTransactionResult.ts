export class PerformTransactionResult {
    transaction: string;
    perform_time: number;
    state: number;

    constructor(transaction: string, perform_time: number, state: number) {
        this.transaction = transaction;
        this.perform_time = perform_time;
        this.state = state;
    }
}