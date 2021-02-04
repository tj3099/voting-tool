import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  myQuestion: Question = new Question;
  submitted: boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.myQuestion.title = "";
    this.myQuestion.description = "";
    this.myQuestion.open = false;
    this.submitted = false;
  }

  addQuestion(): void {
    if (this.myQuestion.title != '' && this.myQuestion.description){
      const data = {
          question: this.myQuestion,
          user: {
          mail: localStorage.getItem('mail') || '',
           sessionId: localStorage.getItem('sessionId') || '',
          }
        }
        this.questionService.add(data)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
            },
            error => {
              console.log(error);
            });
    }
  }

  newQuestion(): void{
    this.submitted = false;
    this.myQuestion.title = "";
    this.myQuestion.description = "";
    this.myQuestion.open = false;
  }

}
