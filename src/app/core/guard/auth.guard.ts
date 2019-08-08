import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRedirect } from '../action/login.actions';
import { LoginState } from '../state/login.state';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.selectOnce(LoginState.getUser).pipe(
      map(u => {
        if (!u) {
          this.store.dispatch(new LoginRedirect());
        }
        return true;
      })
    );
  }
}
