import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { CommonModule } from '@angular/common';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: Question[] = [];
  alert: Alert;

  constructor(private questionService: QuestionService) {
    this.alert = {
      type: 'alert alert-success',
      message: ''
    }
    this.refresh();
   }

  refresh(): void {
    this.questionService.getAll()
      .subscribe(
        response => {
          this.questions = response;
        },
        error => {
          console.log(error);
        });
  }

  open(currQuestion : Question): void {
  const data = {
       question: currQuestion,
       user: {
        mail: localStorage.getItem('mail'),
        sessionId: localStorage.getItem('sessionId')
       }
      }
      this.questionService.open(data)
        .subscribe(
          response => {
            this.refresh();
            this.alert = {
              type: 'alert alert-success',
              message: data.question.title + ' opened!'
            }
          },
          error => {
            console.log(error);
            this.alert = {
              type: 'alert alert-danger',
              message: 'Please check your sessionId / grants and make sure all question are closed!'
            }
          });
    }

    close(currQuestion : Question): void {
      const data = {
             question: currQuestion,
             user: {
              mail: localStorage.getItem('mail'),
              sessionId: localStorage.getItem('sessionId')
            }
      }
      this.questionService.close(data)
        .subscribe(
          response => {
            this.refresh();
            this.alert = {
              type: 'alert alert-success',
              message: data.question.title + ' closed!'
            }
          },
          error => {
            console.log(error);
            this.alert = {
              type: 'alert alert-danger',
              message: 'Please check your sessionId / grants!'
            }
          });
      }

  ngOnInit(): void {
  }

}
