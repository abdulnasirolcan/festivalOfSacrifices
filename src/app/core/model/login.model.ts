import { UserInfo } from 'firebase/app';

export type User = UserInfo;

export interface LoginStateModel {
  initialized: boolean;
  user?: UserInfo;
}