import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient)
  base_api_url: string = 'https://icherniakov.ru/yt-course/'

  constructor() { }

  getTestAccounts() {
    return this.http.get('${this.base_api_url}account/test_accounts')
  }
}
