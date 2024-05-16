import { TransactionStateEnum } from "./TransactionStateEnum";

export class TransactionState {
    static readonly STATE_NEW = { code: 0, state: TransactionStateEnum.STATE_NEW };
    static readonly STATE_IN_PROGRESS = { code: 1, state: TransactionStateEnum.STATE_IN_PROGRESS };
    static readonly STATE_DONE = { code: 2, state: TransactionStateEnum.STATE_DONE };
    static readonly STATE_CANCELED = { code: -1, state: TransactionStateEnum.STATE_CANCELED };
    static readonly STATE_POST_CANCELED = { code: -2, state: TransactionStateEnum.STATE_POST_CANCELED };
  
    static getCode(state: TransactionStateEnum): number | undefined {
      switch (state) {
        case TransactionStateEnum.STATE_NEW:
          return this.STATE_NEW.code;
        case TransactionStateEnum.STATE_IN_PROGRESS:
          return this.STATE_IN_PROGRESS.code;
        case TransactionStateEnum.STATE_DONE:
          return this.STATE_DONE.code;
        case TransactionStateEnum.STATE_CANCELED:
          return this.STATE_CANCELED.code;
        case TransactionStateEnum.STATE_POST_CANCELED:
          return this.STATE_POST_CANCELED.code;
        default:
          return undefined;
      }
    }
  }