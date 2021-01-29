import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
    mail: '',
    secretKey: '',
    hasVoted: false,
    sessionId: '',
    grants: 0
  };

  alert: Alert;

  constructor(private userService: UserService, private router: Router) { }

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
          if(this.myUser.grants === 99){
            this.router.navigateByUrl('/admin');
          }
          if(this.myUser.grants == 0){
          this.alert = {
            type: 'alert alert-success',
            message: 'You are logged in!'
          }
              this.router.navigateByUrl('/login');
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
        sessionId: localStorage.getItem('sessionId')
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
            this.myUser = {
              mail: "",
              secretKey: ""
            };
          },
          error => {
            console.log(error);
          });
    }
}
