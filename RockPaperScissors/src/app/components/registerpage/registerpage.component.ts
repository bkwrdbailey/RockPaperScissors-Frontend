import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserhandlingService } from 'src/app/services/userhandling.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent {

  constructor(private userService: UserhandlingService, private router: Router) { }

  newUser: User = {username: '', password: ''};

  incorrectUsername: boolean = false;
  incorrectPasswordLength: boolean = false;
  incorrectPasswordValues: boolean = false;
  unsuccessfulRegister: boolean = false;

  passwordNumRegEx: RegExp = new RegExp('[0-9]');
  passwordLetterRegEx: RegExp = new RegExp('[a-zA-Z]');

  attemptToRegister(registerForm: NgForm) {
    // Resetting boolean requirement values to false in case user meets a requirement
    this.incorrectPasswordLength = false;
    this.incorrectPasswordValues = false;
    this.incorrectUsername = false;
    this.unsuccessfulRegister = false;

    // Checking to make sure requirements are met then attempting to register a new account
    if (registerForm.value.username.length >= 8 && registerForm.value.password.length >= 8 && this.passwordNumRegEx.test(registerForm.value.password) && this.passwordLetterRegEx.test(registerForm.value.password))
    {
      this.newUser.username = registerForm.value.username;
      this.newUser.password = registerForm.value.password;

      // Check if account creation was successful on the backend
      this.userService.attemptToRegister(this.newUser).subscribe(res => {
        if(res) {
          this.userService.setUserData(this.newUser.username.toLowerCase(), true);
          // Route to landing page
          this.router.navigate(['/home']);
        } else {
          // Notify user that the username is already taken
          this.unsuccessfulRegister = true;
        }
      })
    }

    // Conditionals to notify user what requirements are not being met for username and/or password creation
    if (registerForm.value.username.length < 8)
    {
      this.incorrectUsername = true;
    }
    if (registerForm.value.password.length < 8)
    {
      this.incorrectPasswordLength = true;
    }
    if (!this.passwordNumRegEx.test(registerForm.value.password) || !this.passwordLetterRegEx.test(registerForm.value.password))
    {
      this.incorrectPasswordValues = true;
    }
  }

}
