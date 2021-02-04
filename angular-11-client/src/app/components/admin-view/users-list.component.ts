import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users?: User[];
  currentUser?: User;
  currentIndex = -1;
  title = '';
  message = '';

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
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
          console.log(data);
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
    this.UserService.deleteAll(data)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveUsers();
        },
        error => {
          console.log(error);
        });
  }

  resetHasVoted(): void {
  const data = {
      mail: localStorage.getItem('mail') || '',
       sessionId: localStorage.getItem('sessionId') || '',
    }
    this.UserService.resetVoting(data, false)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveUsers();
        },
        error => {
          console.log(error);
        });
  }

}
