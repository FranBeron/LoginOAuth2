import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formReg: any;
  email: string = '';
  loading: boolean = false;
  userExist: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formReg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.userService
      .register(this.formReg.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log(error);
        this.userExist = true;
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }
}
