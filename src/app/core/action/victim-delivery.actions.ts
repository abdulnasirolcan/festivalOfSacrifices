import { Account } from '../model/account.model';

export const GET_VICTIM_DELIVERY = 'Victim-delivery_Get';
export const CREATE_VICTIM_DELIVERY = 'Victim-delivery_Create';
export const CREATE_FORM_VICTIM_DELIVERY = 'Victim-delivery_Form_Create';
export const CREATE_VICTIM_DELIVERY_TOTAL = 'Victim-delivery_Create_Total';

export class GetVictimDelivery {
  static readonly type = GET_VICTIM_DELIVERY;
}

export class CreateFormVictimDelivery {
  static readonly type = CREATE_FORM_VICTIM_DELIVERY;
  constructor(public payload: Account) {}
}

export class CreateVictimDelivery {
  static readonly type = CREATE_VICTIM_DELIVERY;
  constructor(public payload: Account) {}
}

export class CreateVictimDeliveryTotal {
  static readonly type = CREATE_VICTIM_DELIVERY_TOTAL;
  constructor(public payload: Account) {}
}
