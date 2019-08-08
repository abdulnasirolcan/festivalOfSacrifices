import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { take, tap } from 'rxjs/operators';

import {
  CheckSession,
  LoginFailed,
  LoginRedirect,
  LoginSuccess,
  LoginWithEmailAndPassword,
  Logout,
  LogoutSuccess,
} from '../action/login.actions';
import { User, LoginStateModel } from '../model/login.model';

@State<LoginStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    user: null,
  },
})
export class LoginState implements NgxsOnInit {
  constructor(private store: Store, private afAuth: AngularFireAuth) {}

  @Selector()
  static getInitialized(state: LoginStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static getUser(state: LoginStateModel) {
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<LoginStateModel>) {
    ctx.dispatch(new CheckSession());
  }

  /**
   * Commands
   */

  @Action(CheckSession)
  checkSession(ctx: StateContext<LoginStateModel>) {
    return this.afAuth.authState.pipe(
      take(1),
      tap((user: User) => {
        ctx.patchState({ initialized: true });
        if (user) {
          console.log(`CheckSession: ${user.displayName} is logged in`);
          ctx.dispatch(new LoginSuccess(user));
          return;
        }
        console.log('CheckSession: no user found');
      }),
    );
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(ctx: StateContext<LoginStateModel>, action: LoginWithEmailAndPassword) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(action.email, action.password)
      .then((response: { user: User }) => {
        ctx.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(Logout)
  logout(ctx: StateContext<LoginStateModel>) {
    return this.afAuth.auth.signOut().then(() => {
      ctx.dispatch(new LogoutSuccess());
    });
  }

  /**
   * Events
   */

  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<LoginStateModel>) {
    console.log('onLoginSuccess, navigating to /dashboard');
    ctx.dispatch(new Navigate(['/dashboard']));
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<LoginStateModel>) {
    console.log('onLoginRedirect, navigating to /login');
    ctx.dispatch(new Navigate(['/login']));
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(ctx: StateContext<LoginStateModel>, event: LoginSuccess) {
    ctx.patchState({
      user: event.user,
    });
  }

  @Action([LoginFailed, LogoutSuccess])
  setUserStateOnFailure(ctx: StateContext<LoginStateModel>) {
    ctx.patchState({
      user: undefined,
    });
    ctx.dispatch(new LoginRedirect());
  }
}
