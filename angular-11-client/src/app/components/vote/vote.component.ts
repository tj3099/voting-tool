import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { QuestionService } from 'src/app/services/question.service';
import { VoteService } from 'src/app/services/vote.service';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';

interface Alert {
  type: string;
  message: string;
}

interface VotingModel {
  question: Question,
  selected: string
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input()
  user: User;

  alert: Alert;

  checked: boolean = false;

  votingList: VotingModel;

  constructor(private questionService: QuestionService, private voteService: VoteService, private userService: UserService) {
    console.log(this.user);
    this.votingList = {
      selected: '',
      question: new Question()
    }
    this.refreshData();
    this.alert = {
      message: '',
      type: ''
    }
  }

  ngOnInit(): void {
  }

  refreshData() : void{
    this.questionService.getOpen()
      .subscribe(
        response => {
          this.votingList = {
            question: response[0],
            selected: ''
          }
          console.log(this.votingList);
        },
        error => {
          console.log(error);
        });
        if(this.user){
          this.user.sessionId = localStorage.getItem('sessionId');
          this.userService.getHasVoted(this.user)
            .subscribe(
              response => {
                this.user.hasVoted = response;
              },
              error => {
                console.log(error);
            });
        }
        this.checked = false;
  }

  vote() : void {
  const myVote = {
    id: this.votingList.question.id,
    vote: this.votingList.selected
  }
  const data = {
    user: {
      mail: localStorage.getItem('mail'),
      sessionId: localStorage.getItem('sessionId')
    },
    vote: myVote
  };
    this.voteService.vote(data)
        .subscribe(
          response => {
          if(this.user){
            this.user.hasVoted = response;
          }
          },
          error => {
            console.log(error);
          });
  }

  setYes() : void {
    this.votingList.selected = 'yes';
  }

  setNo() : void {
      this.votingList.selected = 'no';
    }

 setAbstention() : void {
      this.votingList.selected = 'abstention';
  }

}
