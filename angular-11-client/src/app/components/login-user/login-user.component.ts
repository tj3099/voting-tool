import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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
    grant: 0
  };
  logedin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
  this.logedin = false;
    const data = {
      mail: this.myUser.mail,
      secretKey: this.myUser.secretKey
    };
    this.userService.login(data)
      .subscribe(
        response => {
          this.logedin = true;
          this.myUser = response;
          localStorage.setItem('sessionId', this.myUser.sessionId);
          localStorage.setItem('mail', this.myUser.mail);
          if(this.myUser.grant == 99){
            this.router.navigateByUrl('/admin');
          }
          if(this.myUser.grant == 0){
              this.router.navigateByUrl('/login');
          }
        },
        error => {
          console.log(error);
        });
  }
}
