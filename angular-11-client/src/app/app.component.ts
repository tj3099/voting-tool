import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { TextService } from 'src/app/services/text.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Voting Tool | by Thomas';

    constructor(private textService: TextService, private titleService: Title) {
      console.log('Production: ', environment.production); // Logs false for default environment
      this.textService.init('default')
        .subscribe(
          response => {
            localStorage.setItem('texts', JSON.stringify(response));
            console.log('[init]', response);
            this.titleService.setTitle(response.title);
          },
          error => {
            console.log(error);
          });
    }
}
