import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GetFestivalOfSacrifices, CreateFestivalOfSacrifices } from '../action/festival-of-sacrifices.actions';
import { FestivalOfSacrifices } from '../model/festival-of-sacrifies.model';
import { FestivalOfSacrificesService } from '../service/festival-of-sacrifices.service';

export class FestivalOfSacrificesStateModel {
  public festivalOfSacrifice: FestivalOfSacrifices[];
}

@State<FestivalOfSacrificesStateModel>({
  name: 'festivalOfSacrifice',
  defaults: {
    festivalOfSacrifice: []
  }
})
export class FestivalOfSacrificesState {
  constructor(private festivalOfSacrificesService: FestivalOfSacrificesService) {}

  @Selector()
  static getFestivalOfSacrifice(state: FestivalOfSacrificesStateModel) {
    return state.festivalOfSacrifice;
  }

  @Action(GetFestivalOfSacrifices)
  getFestivalOfSacrifices({ patchState }: StateContext<FestivalOfSacrificesStateModel>) {
    return this.festivalOfSacrificesService.getAddedFestivalOfSacrifices().subscribe(festivalOfSacrifice => {
      patchState({ festivalOfSacrifice: [...festivalOfSacrifice] });
    });
  }

  @Action(CreateFestivalOfSacrifices)
  add(
    { getState, patchState }: StateContext<FestivalOfSacrificesStateModel>,
    { payload }: CreateFestivalOfSacrifices
  ) {
    return this.festivalOfSacrificesService.addFestivalOfSacrifices(payload.id, payload.cutReceived).then(
      festivalOfSacrifice => {
        patchState({
          festivalOfSacrifice: getState().festivalOfSacrifice.map(festivalOfSacrifices => {
            if (festivalOfSacrifices.id === payload.id) {
              festivalOfSacrifices.cutReceived = payload.cutReceived;
            }
            return festivalOfSacrifices;
          }),
        });
      },
      err => {
        throw new Error(err);
      }
    );
  }
}
