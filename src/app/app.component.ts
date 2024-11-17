import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Leagues', url: '/leagues', icon: 'paper-plane' },
    { title: 'Teams', url: '/teams', icon: 'heart' },
    { title: 'Players', url: '/players', icon: 'archive' },
    { title: 'Login', url: '/login', icon: 'trash' },
    { title: 'Register', url: '/register', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
