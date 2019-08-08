import { Account } from '../model/account.model';

export const GET_ACCOUNT = 'Account_Get';
export const CREATE_ACCOUNT = 'Account_Create';
export const CREATE_ACCOUNT_TOTAL = 'Account_Create_Total';

export class GetAccount {
  static readonly type = GET_ACCOUNT;
}

export class CreateAccount {
  static readonly type = CREATE_ACCOUNT;
  constructor(public payload: Account) {}
}

export class CreateAccountTotal {
  static readonly type = CREATE_ACCOUNT_TOTAL;
  constructor(public payload: Account) {}
}
