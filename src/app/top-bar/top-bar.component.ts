import { Component, Input, OnInit } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  // @Input() appInsights: ApplicationInsights;

  // ngOnInit() {
  //   console.log(this.appInsights);
  //   this.appInsights.trackEvent({name: 'test event inside top bar component'});
  // }
}
