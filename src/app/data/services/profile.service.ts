import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { Observable, tap } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { Pageble } from '../interfaces/pageble.interface'


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient)
  me: WritableSignal<Profile | null> = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>('https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/some_user_card')
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>('https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/me')
      .pipe(
        tap((res: Profile) => this.me.set(res))
      );
  }

  getAccount(id: string): Observable<Profile> {
    return this.http.get<Profile>('$add_url') // Треба зробити урлу на беці

  }

  getSubscribersShortList(): Observable<Pageble<Profile>> {
    return this.http.get<Pageble<Profile>>("addroot")// Треба зробити повернення пидписоты
  }

  pathProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.http.patch<Profile>(
      'https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/me',
        profile
     )
  }
}
