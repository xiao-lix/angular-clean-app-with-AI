import { Component, Input } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {
  shippingCosts = this.cartService.getShippingPrices();
  // appInsightsVar: ApplicationInsights;
  // @Input()
  //   set AppInsights(appInsights: ApplicationInsights) {
  //     this.appInsightsVar = appInsights;
  //   }

  // appInsights.trackTrace({name: "myEvent", message: "message123"})

  constructor(private cartService: CartService) {
    // console.log('calling appInsightsVar.track');
    // this.appInsightsVar.trackEvent({name: 'test'});
  }


}
