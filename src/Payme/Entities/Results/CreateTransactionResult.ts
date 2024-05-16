export class CreateTransactionResult {
    create_time: number;
    transaction: string;
    state: number;

    constructor(create_time: number, transaction: string, state: number) {
        this.create_time = create_time;
        this.transaction = transaction;
        this.state = state;
    }
}