import { Component, Input } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin, ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appInsights: ApplicationInsights;
  constructor(private router: Router, private ngZone: NgZone, private errorService: ApplicationinsightsAngularpluginErrorService){
    const angularPlugin = new AngularPlugin(errorService);
    this.appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '519a0443-db9f-4a3d-8e90-8f293e4d3de8',
      disableFlushOnBeforeUnload: true,
      disableFlushOnUnload: true,
      extensions: [angularPlugin],
      extensionConfig: {
        [angularPlugin.identifier]: {
          router: this.router
        }
      }
    } });
    this.appInsights.loadAppInsights();
    // this.ngZone.runOutsideAngular(() => {
    //   this.appInsights.loadAppInsights();
    // });

    // this.appInsights.trackEvent({name: 'name123'});
  }

  normalError() {
    throw new Error('This is normal error without a try catch');
  }

  errorWithCatch() {
    try {
      throw new Error('This is an error with a try catch');
    } catch (error) {
      console.log(' — Error is handled gracefully: ', error.name);
    }
    console.log(' — Execution continues without app breaking');
  }
}
