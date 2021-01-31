import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersListComponent } from './components/admin-view/users-list.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { VoteComponent } from './components/vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    LoginUserComponent,
    UserDetailsComponent,
    UsersListComponent,
    AddQuestionComponent,
    QuestionListComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
