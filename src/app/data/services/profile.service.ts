import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { Observable, tap, map } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { Pageble } from '../interfaces/pageble.interface'
import { AuthService } from '../../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient)
  authservice = inject(AuthService)
  me: WritableSignal<Profile | null> = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>('https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/some_user_card')
  }

  getMe(): Observable<Profile> {
    const token = this.authservice.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(token)
    return this.http.get<Profile>('https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/me',{ headers })
      .pipe(
        tap((res: Profile) => this.me.set(res))
      );
  }

  getAccount(id: string): Observable<Profile> {
    return this.http.get<Profile>('$add_url') // Треба зробити урлу на беці

  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>("https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/fake_followers")
      .pipe(
        map((res:Pageble<Profile>) => res.items.slice(0, 3))
        )
  }

  pathProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.http.patch<Profile>(
      'https://photo-bank-by-drujba-drujba-06de47a4.koyeb.app/api/users/me',
        profile
     )
  }
}
