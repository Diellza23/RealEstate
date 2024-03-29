import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../Helper/constants';
import { ResponseModel } from '../Models/responseModel';
import { User } from '../Models/user';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log('on submit');

    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    this.userService.login(email, password).subscribe(
      (data: ResponseModel) => {
        if (data.responseCode == 1) {
          localStorage.setItem(
            Constants.USER_KEY,
            JSON.stringify(data.dateSet)
          );
          let user = data.dateSet as User;
          if (user.roles.indexOf('Admin') > -1)
            this.router.navigate(['/profile']);
          else {
            this.router.navigate(['/profile']);
          }
        } else if (data.responseCode == 2) {
          this.alertify.error(data.responseMessage);
        }
        // console.log('response', data);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
