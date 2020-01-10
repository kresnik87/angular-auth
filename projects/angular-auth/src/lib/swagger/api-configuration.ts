/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '';
  grant_type: string = '';
  client_id: string = '';
  client_secret: string = '';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
}
