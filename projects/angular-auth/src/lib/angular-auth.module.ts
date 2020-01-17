import {APP_INITIALIZER, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {ApiModule} from "./swagger/api.module";
import {ApiProvider} from "./custom/providers";
import {LibConfiguration, LibConfigurationInterface} from "./swagger/lib-configuration";

@NgModule({
  declarations: [],
  imports: [
    ApiModule
  ],
  providers: [
    ApiProvider
  ],
  exports: []
})
export class AngularAuthModule
{
  static forRoot(rootEnv: LibConfigurationInterface): ModuleWithProviders
  {
    function initEnvironment(lib: LibConfigurationInterface)
    {
      return () =>
      {
        lib.rootUrl= rootEnv.rootUrl;
        lib.grant_type = rootEnv.grant_type;
        lib.client_id = rootEnv.client_id;
        lib.client_secret = rootEnv.client_secret;

      };
    }
    const INIT_ENVIRONMENT: Provider = {
      provide: APP_INITIALIZER,
      useFactory: initEnvironment,
      deps: [LibConfiguration],
      multi: true
    };


    return {
      ngModule: ApiModule,
      providers: [
        INIT_ENVIRONMENT
      ]
    }
  }
}
