import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User = {
    mail: '',
    secretKey: '',
    hasVoted: false,
    sessionId: '',
    grants: 0
  };
  message = '';
  isAdmin: boolean = false;

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getGrants();
    this.getUser(this.route.snapshot.params.id);
  }

  getUser(id: string): void {
  const data = {
      mail: localStorage.getItem('mail') || '',
       sessionId: localStorage.getItem('sessionId') || '',
    }
    this.UserService.get(data, id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    const data = {
        mail: localStorage.getItem('mail') || '',
         sessionId: localStorage.getItem('sessionId') || '',
    }
    this.UserService.delete(data, this.currentUser.mail)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user']);
        },
        error => {
          console.log(error);
        });
  }

  getGrants(): void {
      const data = {
          mail: localStorage.getItem('mail') || '',
          sessionId: localStorage.getItem('sessionId') || '',
        }
        this.UserService.getGrants(data)
          .subscribe(
            response => {
              if(response && response <= 99){
                this.isAdmin = true;
              }else{
                this.isAdmin = false;
              }
              if(this.isAdmin){

              }else{
                this.router.navigateByUrl('/login');
              }
            },
            error => {
              console.log(error);
              this.isAdmin = false;
            });
      }
}
