import { Component, NgModule} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
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
