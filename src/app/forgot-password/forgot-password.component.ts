import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  message: string = '';
  resetPasswordForm: any;
  loading: boolean = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    if (this.email) {
      this.loading = true;
      this.userService.resetPassword(this.email)
        .then(() => {
          this.message = 'Se ha enviado un correo electrónico de restablecimiento de contraseña a su dirección de correo electrónico.';
        })
        .catch((error) => {
          this.message = error.message;
        })
        .finally(() => {
          // Muestra el circulo de carga durante medio segundo después de enviar el formulario
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    }
  }
}
