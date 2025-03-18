import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent], 
  template: `<h1>{{ title }}</h1><app-main></app-main>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PeakCounter';
}
