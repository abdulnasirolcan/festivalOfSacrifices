import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Account } from '../model/account.model';
import { StockTentService, VictimDeliveryService } from '../service';
import {
  GetStockTent,
  CreateStockTent,
  CreateStockTentTotal,
  GetVictimDelivery,
  CreateVictimDelivery,
  CreateVictimDeliveryTotal,
  CreateFormVictimDelivery,
} from '../action';

export class VictimDeliveryStateModel {
  public victimDelivery: Account[];
}

@State<VictimDeliveryStateModel>({
  name: 'victimDelivery',
  defaults: {
    victimDelivery: [],
  },
})
export class VictimDeliveryState {
  constructor(private victimDeliveryService: VictimDeliveryService) {}

  @Selector()
  static getVictimDelivery(state: VictimDeliveryStateModel) {
    return state.victimDelivery;
  }

  @Action(GetVictimDelivery)
  getVictimDeliverys({ patchState }: StateContext<VictimDeliveryStateModel>) {
    this.victimDeliveryService.getAddedVictimDelivery().subscribe(victimDelivery => {
      patchState({ victimDelivery: [...victimDelivery] });
    });
  }

  @Action(CreateFormVictimDelivery)
  addForm({ getState, patchState }: StateContext<VictimDeliveryStateModel>, { payload }: CreateFormVictimDelivery) {
    return this.victimDeliveryService.addFormVictimDelivery(payload.id, payload.meat, payload.bone).then(
      victimDelivery => {
        patchState({
          victimDelivery: getState().victimDelivery.map(victimDeliverys => {
            if (victimDeliverys.id === payload.id) {
              victimDeliverys.meat = payload.meat;
              victimDeliverys.bone = payload.bone;
            }
            return victimDeliverys;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }

  @Action(CreateVictimDelivery)
  add({ getState, patchState }: StateContext<VictimDeliveryStateModel>, { payload }: CreateVictimDelivery) {
    return this.victimDeliveryService.addVictimDelivery(payload.id, payload.victimDelivery).then(
      victimDelivery => {
        patchState({
          victimDelivery: getState().victimDelivery.map(victimDeliverys => {
            if (victimDeliverys.id === payload.id) {
              victimDeliverys.victimDelivery = payload.victimDelivery;
            }
            return victimDeliverys;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }

  @Action(CreateVictimDeliveryTotal)
  addTotal({ getState, patchState }: StateContext<VictimDeliveryStateModel>, { payload }: CreateVictimDeliveryTotal) {
    return this.victimDeliveryService.addVictimDeliveryTotal(payload.id, payload.victimDeliveryTotal).then(
      victimDelivery => {
        patchState({
          victimDelivery: getState().victimDelivery.map(victimDeliverys => {
            if (victimDeliverys.id === payload.id) {
              victimDeliverys.victimDeliveryTotal = payload.victimDeliveryTotal;
            }
            return victimDeliverys;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }
}
