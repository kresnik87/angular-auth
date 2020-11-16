/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class LibConfiguration {
  rootUrl: string = '';
  grant_type: string = '';
  client_id: string = '';
  client_secret: string = '';
  default_routes:boolean = true;
}

export interface LibConfigurationInterface {
  rootUrl?: string;
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
  default_routes?: boolean;
}
