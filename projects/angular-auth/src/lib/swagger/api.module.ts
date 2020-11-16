/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LibConfiguration, LibConfigurationInterface } from './lib-configuration';

/**
 * Provider for all Api services, plus LibConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LibConfiguration
     ],
})
export class ApiModule {
  static forRoot(customParams: LibConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: LibConfiguration,
          useValue: {
                        rootUrl: customParams.rootUrl,
                        grant_type: customParams.grant_type,
                        client_id: customParams.client_id,
                        client_secret: customParams.client_secret,
                        default_routes: customParams.default_routes
                      }
        }
      ]
    }
  }
}
