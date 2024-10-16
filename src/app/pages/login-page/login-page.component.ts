import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { inject, Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { from } from 'rxjs';
import {Router } from '@angular/router';
import { TokenResponse } from '../../auth/auth.interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router: Router = inject(Router)

  form: FormGroup<{username: FormControl, password:FormControl}> = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit() {
    if (this.form.valid) {
      //console.log(this.form.value)
      //@ts-ignore
      this.authService.login(this.form.value)
        .subscribe((res: TokenResponse) => {
          this.router.navigate([''])
          console.log(res)
        })
    }
  }
}
