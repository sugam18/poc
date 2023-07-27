import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-beginner';
  data: any;
  constructor(private appService: AppService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appService.getData().subscribe(
      (response: any) => {
        this.data = response;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
