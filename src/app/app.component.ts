import { Component, Input } from '@angular/core';
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
  appInsights: ApplicationInsights;
  constructor(private router: Router, private ngZone: NgZone){
    const angularPlugin = new AngularPlugin();
    this.appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '<YOUR_IKEY>',
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
      this.appInsights.loadAppInsights();
    });

    this.appInsights.trackEvent({name: 'name123'});
  }
}
