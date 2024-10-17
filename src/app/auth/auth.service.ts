import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  url: string = 'https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/auth/login';
  refresh_url = 'https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/auth/refresh_token';
  cookieService: CookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd: FormData = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(
      this.url,
      fd
    ).pipe(
      tap((val: TokenResponse) => this.saveTokens(val))
    );
  }

  refreshAuthToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.refresh_url, {
        refresh_token: this.refreshToken,
      }
    ).pipe(
      tap((val: TokenResponse) => this.saveTokens(val)),
      catchError(err => {
        this.logout();
        return throwError(err)
      })
    );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;
    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
