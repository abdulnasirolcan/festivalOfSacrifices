import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetVictimDelivery } from 'src/app/core/action';

@Injectable({ providedIn: 'root' })
export class VictimDeliveryResolve implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.store.dispatch(new GetVictimDelivery());
  }
}
