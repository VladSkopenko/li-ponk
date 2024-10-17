import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient)
  constructor() { }

  getTestAccounts() {
    return this.http.get<Profile[]>('https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/some_user_card')
  }

  getMe() {
    return this.http.get<Profile>('https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/me')
  }
}
