import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginWithEmailAndPassword } from '../../../core/action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  return: string = '';
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {}

  showSpinner() {}

  onSubmit() {
    this.spinner.show();
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.store.dispatch(new LoginWithEmailAndPassword(email, password)).subscribe(
      () => {
        console.log('Signed out Successfuly');
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log('ooops');
        console.log(error);
      },
    );
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    // this.loginForm.reset();
  }
}
