import { Component, Input, OnInit } from '@angular/core';
import { SessionmanagmentService } from 'src/app/services/sessionmanagment.service';
import { UserhandlingService } from 'src/app/services/userhandling.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userData: UserhandlingService, private sessionService: SessionmanagmentService) { }

  ngOnInit() {
    this.loggedIn = this.userData.getUserActiveStatus();
    this.currUsername = this.userData.getUsername();
  }

  loggedIn: boolean = false;

  currUsername: string = '';

  signOut() {
    this.loggedIn = false;
    this.sessionService.removeSession(this.currUsername);
    this.currUsername = '';
    this.userData.clearUserData();
  }
}
