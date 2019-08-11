import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GetCutter, CreateCutter, CreateCutterTotal } from '../action/cutter.actions';
import { Account } from '../model/account.model';
import { CutterService } from '../service/cutter.service';

export class CutterStateModel {
  public cutter: Account[];
}

@State<CutterStateModel>({
  name: 'cutter',
  defaults: {
    cutter: [],
  },
})
export class CutterState {
  constructor(private cutterService: CutterService) {}

  @Selector()
  static getCutter(state: CutterStateModel) {
    return state.cutter;
  }

  @Action(GetCutter)
  getCutters({ patchState }: StateContext<CutterStateModel>) {
    this.cutterService.getAddedCutter().subscribe(cutter => {
      patchState({ cutter: [...cutter] });
    });
  }

  @Action(CreateCutter)
  add({ getState, patchState }: StateContext<CutterStateModel>, { payload }: CreateCutter) {
    return this.cutterService.addCutter(payload.id, payload.cutReceived).then(
      cutter => {
        patchState({
          cutter: getState().cutter.map(cutters => {
            if (cutters.id === payload.id) {
              cutters.cutReceived = payload.cutReceived;
            }
            return cutters;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }
  @Action(CreateCutterTotal)
  addTotal({ getState, patchState }: StateContext<CutterStateModel>, { payload }: CreateCutterTotal) {
    return this.cutterService.addCutterTotal(payload.id, payload.cutReceivedTotal).then(
      account => {
        patchState({
          cutter: getState().cutter.map(cutters => {
            if (cutters.id === payload.id) {
              cutters.cutReceivedTotal = payload.cutReceivedTotal;
            }
            return cutters;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }
}
