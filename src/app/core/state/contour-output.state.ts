import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Account } from '../model/account.model';
import { ContourOutputService } from '../service';
import { GetContourOutput, CreateContourOutputTotal, CreateContourOutput } from '../action';

export class ContourOutputStateModel {
  public contourOutput: Account[];
}

@State<ContourOutputStateModel>({
  name: 'contourOutput',
  defaults: {
    contourOutput: [],
  },
})
export class ContourOutputState {
  constructor(private contourOutputService: ContourOutputService) {}

  @Selector()
  static getContourOutput(state: ContourOutputStateModel) {
    return state.contourOutput;
  }

  @Action(GetContourOutput)
  getContourOutputs({ patchState }: StateContext<ContourOutputStateModel>) {
    this.contourOutputService.getAddedContourOutput().subscribe(contourOutput => {
      patchState({ contourOutput: [...contourOutput] });
    });
  }

  @Action(CreateContourOutput)
  add({ getState, patchState }: StateContext<ContourOutputStateModel>, { payload }: CreateContourOutput) {
    return this.contourOutputService.addContourOutput(payload.id, payload.containerDelivered).then(
      contourOutput => {
        patchState({
          contourOutput: getState().contourOutput.map(contourOutputs => {
            if (contourOutputs.id === payload.id) {
              contourOutputs.containerDelivered = payload.containerDelivered;
            }
            return contourOutputs;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }

  @Action(CreateContourOutputTotal)
  addTotal({ getState, patchState }: StateContext<ContourOutputStateModel>, { payload }: CreateContourOutputTotal) {
    return this.contourOutputService.addContourOutputTotal(payload.id, payload.containerDeliveredTotal).then(
      contourOutput => {
        patchState({
          contourOutput: getState().contourOutput.map(contourOutputs => {
            if (contourOutputs.id === payload.id) {
              contourOutputs.containerDeliveredTotal = payload.containerDeliveredTotal;
            }
            return contourOutputs;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }
}
