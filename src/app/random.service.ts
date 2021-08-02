import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
    appInsightsFactory(): ApplicationInsights {
        return new ApplicationInsights({ config: {
            instrumentationKey: 'b4348c7f-70e9-4acb-8826-43be875dfa9f'
          } });
    }
}
