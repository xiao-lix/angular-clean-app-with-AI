import { Component, Input } from '@angular/core';
import { ApplicationInsights, DistributedTracingModes } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appInsights: ApplicationInsights;
  constructor(private router: Router, private ngZone: NgZone, private http: HttpClient){
    const angularPlugin = new AngularPlugin();
    this.appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '1fa60e21-a7f6-44d2-9dae-e53b6f00111e',
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

  //https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
  //https://rapidapi.com/Gramzivi/api/covid-19-data
  triggerDependencies() {
    this.http.get('https://api.first.org/data/v1/countries?region=Europe').subscribe((response: any) => {
      console.log(response);
      for (let i = 0; i < 5; i++) {
        const countryCode = Object.keys(response.data).slice(0, 5)[i];
        const name = response.data[countryCode].country;
        setTimeout(() => {
          this.http.get('https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name=' + name, {
            headers: {
              "x-rapidapi-key": "<rapidapi-key>",
              "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
            }
          }).subscribe(data => {
            console.log('AJAX Get COVID data for ' + name);
            console.log(data);
          });
        }, i * 1500);
      }
    });
  }

  triggerDependenciesWithFetch() {
    this.http.get('https://api.first.org/data/v1/countries?region=Europe').subscribe((response: any) => {
      console.log(response);
      for (let i = 0; i < 5; i++) {
        const countryCode = Object.keys(response.data).slice(0, 5)[i];
        const name = response.data[countryCode].country;
        setTimeout(() => {
          fetch("https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name=" + name, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "<rapidapi-key>",
                  "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
            }
          })
          .then(res => {
            console.log('FETCH Get COVID data for ' + name);
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          });
        }, i * 1500);
      }
    });
  }
}
