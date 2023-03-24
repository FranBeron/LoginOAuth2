import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: any;
  email: string = '';
  loading: boolean = false;
  userError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
        this.userError = true;
      });
  }
  onClickGoogle() {
    this.loading = true;
    this.userService
      .loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }
  onClickFacebook() {
    this.userService
      .loginWithFacebook()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }
}
