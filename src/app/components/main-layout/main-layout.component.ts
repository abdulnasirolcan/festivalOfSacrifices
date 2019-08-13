import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  @Select(LoginState.getInitialized)
  initialized$: Observable<boolean>;

  @Select(LoginState.getUser)
  public user$: Observable<User>;
  navbarOpen = false;

  navigations = [
    {
      name: 'Anasayfa',
      link: '/dashboard',
      icon: 'fas fa-house-damage',
    },
    {
      name: 'Muhasebe',
      link: '/account',
      icon: 'fas fa-calculator',
    },
    {
      name: 'Kesimin Sorumlusu',
      link: '/cutter',
      icon: 'fas fa-portrait',
    },
    {
      name: 'Kontenyır Çıkışı',
      link: '/contour-output',
      icon: 'fas fa-user-clock',
    },
    {
      name: 'Kurban Teslimi',
      link: '/stock-tent',
      icon: 'fas fa-truck',
    },
  ];

  public trackByFunction(index: number, navigations: any) {
    return navigations ? !!navigations : null;
  }

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.spinner.show();
    this.store.dispatch(new Logout());
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
}
