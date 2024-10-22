import { Component, NgModule, inject} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import {ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import {RouterLink } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { WritableSignal, signal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { Pageble } from '../../data/interfaces/pageble.interface'
import { Observable, tap,  } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
   SubscriberCardComponent,
   CommonModule,
   SvgIconComponent,
   RouterLink,
   ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
 profileService: ProfileService = inject(ProfileService)

 subscribers$ = this.profileService.getSubscribersShortList()

 me = this.profileService.me

 arrow: string = 'arrow';
 menuItems: { label: string; icon: string; link: string }[] = [
   {
     label: "My profile",
     icon: 'home',
     link: ''
   },
   {
     label: "Chats",
     icon: 'chats',
     link: 'chats'
   },
   {
     label: "Search",
     icon: 'search',
     link: 'search'
   },
 ]
}
