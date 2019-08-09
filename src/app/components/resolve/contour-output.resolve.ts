import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetContourOutput } from 'src/app/core/action';

@Injectable({ providedIn: 'root' })
export class ContourOutputResolve implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.store.dispatch(new GetContourOutput());
  }
}
