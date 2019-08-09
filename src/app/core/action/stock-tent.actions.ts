import { Account } from '../model/account.model';

export const GET_STOK_TENT = 'Stock_tent_Get';
export const CREATE_STOK_TENT = 'Stock-tent_Create';
export const CREATE_STOK_TENT_TOTAL = 'Stock-tent_Create_Total';

export class GetStockTent {
  static readonly type = GET_STOK_TENT;
}

export class CreateStockTent {
  static readonly type = CREATE_STOK_TENT;
  constructor(public payload: Account) {}
}

export class CreateStockTentTotal {
  static readonly type = CREATE_STOK_TENT_TOTAL;
  constructor(public payload: Account) {}
}
