import { Component, OnInit, Input} from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { QuestionService } from 'src/app/services/question.service';
import { VoteService } from 'src/app/services/vote.service';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { environment } from './../../../environments/environment';
import { FormControl, FormGroup} from '@angular/forms';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input()
  user: User = new User();

  alert: Alert;
  texts: any = JSON.parse(localStorage.getItem('texts') || '') || environment.texts;

  checked: boolean = false;

  question: Question = new Question();

  // Radios for Voting
  voteForm = new FormGroup({
    vote: new FormControl()
  });

  /**
  * Consructor
  */
  constructor(private questionService: QuestionService, private voteService: VoteService, private userService: UserService) {
    console.log(this.user);
    this.refreshData();
    this.alert = {
      message: '',
      type: ''
    }
  }

  ngOnInit(): void {
  setTimeout(()=>{
     this.texts = JSON.parse(localStorage.getItem('texts') || '') || environment.texts;
     console.log(this.texts);
   }, 1);
  }

  /**
  * loading open question and all needed data
  */
  public refreshData() : void{
    this.questionService.getOpen()
      .subscribe(
        response => {
          this.question = response[0];
          console.log('[current Questions] ', this.question);
        },
        error => {
          console.log(error);
        });
        if(this.user.mail){
          this.user.sessionId = localStorage.getItem('sessionId') || '';
          this.userService.getHasVoted(this.user)
            .subscribe(
              response => {
                this.user.hasVoted = response;
              },
              error => {
                console.error('[vote refreshData] ', error);
            });
        }
        this.checked = false;
  }

  /**
  * vote
  */
  public vote(id: any, vote: any) : void {
    const myVote = {
      id: id,
      vote: vote
    }
    const data = {
      user: {
        mail: localStorage.getItem('mail') || '',
         sessionId: localStorage.getItem('sessionId') || '',
      },
      vote: myVote
    };
    console.log('[vote vote]', data);
      this.voteService.vote(data)
          .subscribe(
            response => {
            if(this.user){
              this.user.hasVoted = response;
            }
            this.alert = {
              message: this.texts.vote.alert.success,
              type: 'alert alert-success'
            }
            },
            error => {
            this.alert = {
              message: this.texts.vote.alert.error,
              type: 'alert alert-danger'
            }
              console.error('[vote vote]', error);
            });
    }
}
