import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class UsersListComponent implements OnInit {
  users?: User[];
  currentUser?: User;
  currentIndex = -1;
  title = '';
  message = '';
  isAdmin: boolean = false;
  activeUsers: number = 0;
  votedUsers: number = 0;


  constructor(private UserService: UserService,  private router: Router) { }

  ngOnInit(): void {
    this.getGrants();
  }

  retrieveUsers(): void {
  const data = {
    mail: localStorage.getItem('mail') || '',
     sessionId: localStorage.getItem('sessionId') || '',
  }
  console.log(data);
    this.UserService.getAll(data)
      .subscribe(
        data => {
          this.users = data;
          console.log('[retrieveUsers]',data);
          this.loadStatistics();
        },
        error => {
          console.log(error);
        });
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
  const data = {
      mail: localStorage.getItem('mail') || '',
       sessionId: localStorage.getItem('sessionId') || '',
    }
    if (confirm('Are you sure, you want to delete all users? The calling user will remain.')){
      this.UserService.deleteAll(data)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveUsers();
          },
          error => {
            console.log(error);
          });
    }else {
      this.retrieveUsers();
    }
  }

  resetHasVoted(): void {
  const data = {
      mail: localStorage.getItem('mail') || '',
       sessionId: localStorage.getItem('sessionId') || '',
    }
    if (confirm('Are you sure, you want to reset hasVoted for users? All users can vote again afterwards!')){
      this.UserService.resetVoting(data, false)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveUsers();
          },
          error => {
            console.log(error);
          });
    } else {
       this.retrieveUsers();
    }
  }

  updateList(): void {
    const data = {
      callingUser:{
        mail: localStorage.getItem('mail') || '',
        sessionId: localStorage.getItem('sessionId') || '',
      },
      users: this.users
      }
      if (confirm('Are you sure, you want to update all users? ')){
      this.UserService.updateList(data)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveUsers();
          },
          error => {
            console.log(error);
          });
      } else {
           this.retrieveUsers();
      }
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
              this.retrieveUsers();
            }else{
              this.router.navigateByUrl('/login');
            }
          },
          error => {
            console.log(error);
            this.isAdmin = false;
          });
    }

    loadStatistics(): void {
        this.activeUsers = 0;
        this.votedUsers = 0;
        if(this.users){
          for(let i = 0; i < this.users.length; i++){
            if(this.users && this.users[i].hasVoted){
              this.votedUsers++;
            }
            if(this.users && this.users[i].active){
              this.activeUsers++;
            }
          }
        }
    }

}
