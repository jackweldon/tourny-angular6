 import { AccountService, RegisterModel } from '../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidators } from '../email.validators';
 import { BadInput, AppError } from '../../shared/app-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {

  errors: string[];

  registerForm = new FormGroup({
    account: new FormGroup({
      email: new FormControl('', [ Validators.email, Validators.required, EmailValidators.shouldBeUnique ]),
      password: new FormControl('', [ Validators.minLength(6), Validators.required ]),
      username: new FormControl('', [ Validators.minLength(6), Validators.required ]),
      firstname: new FormControl('', [ Validators.required ]),
    })
  });

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

  get email() {
    return this.registerForm.get('account.email');
  }

  register() {
    this.accountService.register(this.registerForm.get('account').value as RegisterModel)
      .subscribe(
        response => {
          console.log(response);
          //we need to login and stuff?
        },
        (error: AppError) => {
          console.log(error)
          if (error instanceof BadInput) {
            this.registerForm.setErrors({
              'code': error.description,
            });
          }
          else throw error;
        });


  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        this.email.hasError('shouldBeUnique') ? 'Email address has been taken.' : '';
  }

}
