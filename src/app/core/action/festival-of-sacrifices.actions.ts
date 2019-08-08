import { FestivalOfSacrifices } from '../model/festival-of-sacrifies.model';


export const GET_FESTIVAL_OF_SACRIFICES = 'FestivalOfSacrifices_Get';
export const CREATE_FESTIVAL_OF_SACRIFICES = 'FestivalOfSacrifices_Create';

export class GetFestivalOfSacrifices {
  static readonly type = GET_FESTIVAL_OF_SACRIFICES;
}

export class CreateFestivalOfSacrifices {
  static readonly type = CREATE_FESTIVAL_OF_SACRIFICES;
  constructor(public payload: FestivalOfSacrifices) {}
}