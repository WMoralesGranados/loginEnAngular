import { Component } from '@angular/core';
import { FormBuilder, Validators
 } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm=this.formBuilder.group({
    email:['ejemplo@gmail.com',[Validators.required,Validators.email]],
    password: ['',Validators.required]

  })
  constructor(private formBuilder: FormBuilder, private router:Router, private LoginService: LoginService) {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
  login(){
    if(this.loginForm.valid) {
      this.LoginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData) => {
          console.log(userData)
        },
        error: (errorData) => {
          console.error(errorData)
        },
        complete:() => {
          console.info("Login completo")
        }
      })
      this.router.navigateByUrl('/inicio')
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error: faltan datos')
    }
  }
}
