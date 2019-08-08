import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GetAccount, CreateAccount, CreateAccountTotal } from '../action/account.actions';
import { Account } from '../model/account.model';
import { AccountService } from '../service/account.service';

export class AccountStateModel {
  public account: Account[];
}

@State<AccountStateModel>({
  name: 'account',
  defaults: {
    account: [],
  },
})
export class AccountState {
  constructor(private accountService: AccountService) {}

  @Selector()
  static getAccount(state: AccountStateModel) {
    return state.account;
  }

  @Action(GetAccount)
  getAccounts({ patchState }: StateContext<AccountStateModel>) {
    this.accountService.getAddedProducts().subscribe(account => {
      patchState({ account: [...account] });
    });
  }

  @Action(CreateAccount)
  add({ getState, patchState }: StateContext<AccountStateModel>, { payload }: CreateAccount) {
    return this.accountService.addProduct(payload.id, payload.paymentReceived).then(
      account => {
        patchState({
          account: getState().account.map(accounts => {
            if (accounts.id === payload.id) {
              accounts.paymentReceived = payload.paymentReceived;
            }
            return accounts;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }

  @Action(CreateAccountTotal)
  addTotal({ getState, patchState }: StateContext<AccountStateModel>, { payload }: CreateAccountTotal) {
    return this.accountService.addProductTotal(payload.id, payload.paymentReceivedTotal).then(
      account => {
        patchState({
          account: getState().account.map(accounts => {
            if (accounts.id === payload.id) {
              accounts.paymentReceivedTotal = payload.paymentReceivedTotal;
            }
            return accounts;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }
}
