import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { User } from 'src/app/models/User';
import { UserhandlingService } from 'src/app/services/userhandling.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {

  constructor(private userServices: UserhandlingService, private router: Router) { }

  userSigningIn : User = {username: '', password: ''}

  unsuccessfulSignIn: boolean = false;

  signIn() {
    this.unsuccessfulSignIn = false;
    console.log('signing in...');

    // Check if sign in information was correct or not
    this.userServices.attemptToSignIn(this.userSigningIn).subscribe(res => {
      if(res) {
        console.log('successful signin');
        this.userServices.setUserData(this.userSigningIn.username.toLowerCase(), true);
        // Route to landing page
        this.router.navigate(['/home']);
      } else {
        // Notify user that an incorrect username and/or password was given
        console.log('failed signin');
        this.unsuccessfulSignIn = true;
      }
    })
  }
}
