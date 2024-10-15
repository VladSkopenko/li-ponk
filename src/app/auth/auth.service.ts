import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  url: string = 'https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/auth/login'

  login(payload: { username: string; password: string }) {
    const fd: FormData = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post(
      this.url,
      fd
      );
  }
}
