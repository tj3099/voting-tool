import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  myUser: User = {
    mail: localStorage.getItem('mail') || '',
    secretKey: '',
    hasVoted: false,
    sessionId: '',
    grants: 0
  };

  alert: Alert;

  loggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {
      this.alert = {
        type: 'alert alert-success',
        message: ''
      }
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    const data = {
      mail: this.myUser.mail,
      secretKey: this.myUser.secretKey
    };
    this.userService.login(data)
      .subscribe(
        response => {
          this.myUser = response;
          localStorage.setItem('sessionId', this.myUser.sessionId);
          localStorage.setItem('mail', this.myUser.mail);
          this.loggedIn = true;
          if(this.myUser.grants === 99){
            this.router.navigateByUrl('/admin');
          }
          if(this.myUser.grants == 0){
          this.alert = {
            type: 'alert alert-success',
            message: 'You are logged in!'
          }
          }
        },
        error => {
          console.log(error);
          this.alert = {
            type: 'alert alert-danger',
            message: 'Login not possible. Please check credentials!'
          }
        });
  }

  logoutUser(): void {
      const data = {
        mail: this.myUser.mail,
         sessionId: localStorage.getItem('sessionId') || '',
      };
      this.userService.logout(data)
        .subscribe(
          response => {
            this.myUser = response;
            localStorage.clear();
            this.alert = {
              type: 'alert alert-success',
              message: 'You are logged out!'
            };
            this.loggedIn = false;
            this.myUser = {
              mail: "",
              secretKey: "",
              hasVoted: false,
              sessionId: '',
              grants: 0
            };
          },
          error => {
            console.log(error);
          });
    }
}
