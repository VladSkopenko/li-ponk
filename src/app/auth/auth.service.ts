import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  url: string = 'https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/auth/login'
  cookieService: CookieService = inject(CookieService);


  token: string | null = null
  refreshToken: string | null = null

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }


  login(payload: { username: string; password: string }) {
    const fd: FormData = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post<TokenResponse>(
      this.url,
      fd
      ).pipe(
          tap(val => {
            this.token = val.access_token
            this.refreshToken = val.refresh_token

            this.cookieService.set('token', this.token)
            this.cookieService.set('refreshToken', this.refreshToken)
          }))
  }
}
