import { Component } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private ngZone: NgZone){
    const angularPlugin = new AngularPlugin();
    const appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '63969e7a-c5f7-4494-96f8-a33184d0fe30',
      disableFlushOnBeforeUnload: true,
      disableFlushOnUnload: true,
      extensions: [angularPlugin],
      extensionConfig: {
        [angularPlugin.identifier]: {
          router: this.router
        }
      }
    } });
    this.ngZone.runOutsideAngular(() => {
      appInsights.loadAppInsights();
    });
    // console.log(appInsights.config.connectionString);
    // throw new Error('123');
    // appInsights.loadAppInsights();
  }
}
