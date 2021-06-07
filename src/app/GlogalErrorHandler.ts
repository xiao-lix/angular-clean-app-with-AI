import { Injectable, ErrorHandler } from '@angular/core';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private aiErrorService: ApplicationinsightsAngularpluginErrorService) { }
  handleError(error: any) {
    this.aiErrorService.handleError(error);
    console.log(error);
  }
}
