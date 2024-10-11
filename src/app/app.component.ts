import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component'

@Component({                  //Декоратор тому що так потрібно
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent],  // Тут залежності



  templateUrl: './app.component.html',  // Посилання на хтмл
  styleUrl: './app.component.scss'     // Посилання на стиль
})
export class AppComponent {
  title = 'li-ponk';
}
