import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoginState } from 'src/app/core/state';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/login.model';
import { Logout } from 'src/app/core/action';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  @Select(LoginState.getInitialized)
  initialized$: Observable<boolean>;

  @Select(LoginState.getUser)
  public user$: Observable<User>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit() {
  }

  logout() {
    this.spinner.show();
    this.store.dispatch(new Logout());
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 5000);
  }
}