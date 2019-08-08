import { Account } from '../model/account.model';


export const GET_CUTTER = 'Cutter_Get';
export const CREATE_CUTTER = 'Cutter_Create';
export const CREATE_CUTTER_TOTAL = 'Cutter_Create_Total';


export class GetCutter {
  static readonly type = GET_CUTTER;
}

export class CreateCutter {
  static readonly type = CREATE_CUTTER;
  constructor(public payload: Account) {}
}

export class CreateCutterTotal {
  static readonly type = CREATE_CUTTER_TOTAL;
  constructor(public payload: Account) {}
}