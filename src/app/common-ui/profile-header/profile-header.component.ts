import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface'


@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile>()


  onError() {
  const currentProfile = this.profile();
  if (currentProfile?.avatarUrl) {
    currentProfile.avatarUrl = '/assets/imgs/li-ponk.jfif';
  }

}
