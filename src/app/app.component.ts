import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { CommonModule } from '@angular/common'; // імпорт жсон
import { Profile } from './data/interfaces/profile.interface';

@Component({                  //Декоратор тому що так потрібно
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, CommonModule],  // Тут залежності


  templateUrl: './app.component.html',  // Посилання на хтмл
  styleUrl: './app.component.scss'     // Посилання на стиль
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
