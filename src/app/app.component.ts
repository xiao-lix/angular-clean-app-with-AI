import { Component } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){
    const angularPlugin = new AngularPlugin();
    const appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '<YOUR_IKEY>',
      extensions: [angularPlugin],
      extensionConfig: {
        [angularPlugin.identifier]: {
          router: this.router
        }
      }
    } });
    appInsights.loadAppInsights();
  }
}
