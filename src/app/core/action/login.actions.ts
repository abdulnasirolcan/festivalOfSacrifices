import { User } from '../model/login.model';
export class CheckSession {
  static type = '[Auth] CheckSession';
}

export class LoginWithEmailAndPassword {
  static type = '[Auth] LoginWithEmailAndPassword';
  constructor(public email: string, public password: string) {}
}
export class Logout {
  static type = '[Auth] Logout';
}
export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}

// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public user: User) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: any) {}
}
