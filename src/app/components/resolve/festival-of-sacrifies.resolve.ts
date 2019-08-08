import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetFestivalOfSacrifices } from 'src/app/core/action';

@Injectable({ providedIn: 'root' })

export class FestivalOfSacrificesResolve implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.store.dispatch(new GetFestivalOfSacrifices());
  }
}
