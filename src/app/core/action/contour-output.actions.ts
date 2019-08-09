import { Account } from '../model/account.model';

export const GET_CONTOUR_OUTPUT = 'Contour-output_Get';
export const CREATE_CONTOUR_OUTPUT = 'Contour-output_Create';
export const CREATE_CONTOUR_OUTPUT_TOTAL = 'Contour-output_Create_Total';

export class GetContourOutput {
  static readonly type = GET_CONTOUR_OUTPUT;
}

export class CreateContourOutput {
  static readonly type = CREATE_CONTOUR_OUTPUT;
  constructor(public payload: Account) {}
}

export class CreateContourOutputTotal {
  static readonly type = CREATE_CONTOUR_OUTPUT_TOTAL;
  constructor(public payload: Account) {}
}
