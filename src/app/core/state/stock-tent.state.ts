import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Account } from '../model/account.model';
import { StockTentService } from '../service';
import { GetStockTent, CreateStockTent, CreateStockTentTotal } from '../action';

export class StockTentStateModel {
  public stockTent: Account[];
}

@State<StockTentStateModel>({
  name: 'stockTent',
  defaults: {
    stockTent: [],
  },
})
export class StockTentState {
  constructor(private stockTentService: StockTentService) {}

  @Selector()
  static getStockTent(state: StockTentStateModel) {
    return state.stockTent;
  }

  @Action(GetStockTent)
  getStockTents({ patchState }: StateContext<StockTentStateModel>) {
    this.stockTentService.getAddedStockTent().subscribe(stockTent => {
      patchState({ stockTent: [...stockTent] });
    });
  }

  @Action(CreateStockTent)
  add({ getState, patchState }: StateContext<StockTentStateModel>, { payload }: CreateStockTent) {
    return this.stockTentService.addStockTent(payload.id, payload.shareTentEntry).then(
      stockTent => {
        patchState({
          stockTent: getState().stockTent.map(stockTents => {
            if (stockTents.id === payload.id) {
              stockTents.shareTentEntry = payload.shareTentEntry;
            }
            return stockTents;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }

  @Action(CreateStockTentTotal)
  addTotal({ getState, patchState }: StateContext<StockTentStateModel>, { payload }: CreateStockTentTotal) {
    return this.stockTentService.addStockTentTotal(payload.id, payload.shareTentEntryTotal).then(
      stockTent => {
        patchState({
          stockTent: getState().stockTent.map(stockTents => {
            if (stockTents.id === payload.id) {
              stockTents.shareTentEntryTotal = payload.shareTentEntryTotal;
            }
            return stockTents;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }
}
