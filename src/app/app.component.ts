import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile } from './data/interfaces/profile.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, CommonModule],


  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileService: ProfileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe((val: Profile[]) => {
        this.profiles = val
      })
  }
}
