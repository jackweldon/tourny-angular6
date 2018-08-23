import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel, AccountService } from '../services/account.service';
import { BadInput, AppError } from '../../shared/app-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    account: new FormGroup({
      email: new FormControl('', [ Validators.email, Validators.required ]),
      password: new FormControl('', [ Validators.minLength(6), Validators.required ]),
    })
  });

  constructor(private router: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.email.setValue('weldonjack@gmail.com');
    this.password.setValue('Jack12.');
  
  }

  get email() {
    return this.loginForm.get('account.email');
  }
  get password() {
    return this.loginForm.get('account.password');
  }

  login() {
    this.accountService.login(this.loginForm.get('account').value as LoginModel)
      .subscribe(response => {
        this.router.navigate([ '/tournament']);
      },
        (error: AppError) => this.handleError
      );
  }

  handleError(error: AppError) {
    if (error instanceof BadInput) {
      console.log(error);
      this.loginForm.setErrors({
        invalid: true
      });
    }
    else throw error;
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
