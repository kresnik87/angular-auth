# Ksk-AngularAuth


## Installation

```bash
npm i @kresnik87/angular-auth
```
###Usage
 Setup in app.module.ts
```
import {AngularAuthModule, LibConfiguration} from '@kresnik87/angular-auth';
import {NgModule, Provider, APP_INITIALIZER} from '@angular/core';

 export const config: LibConfiguration = {
    rootUrl: environment.backendUrl,
    client_secret: environment.clientSecret,
    grant_type: environment.grant_type,
    client_id: environment.clientId,
    default_routes:environment.default_routes,
    oauthMode:environment.oauthMode
};

function initLibConfiguration(lib: LibConfiguration)
{
    return () =>
    {
        lib.rootUrl = environment.backendUrl;
        lib.grant_type = environment.grant_type;
        lib.client_id = environment.clientId
        lib.client_secret = environment.clientSecret;
        lib.default_routes = environment.default_routes;
        lib.oauthMode = environment.oauthMode;
    };
}

export const INIT_ENVIRONMENT: Provider = {
    provide: APP_INITIALIZER,
    useFactory: initLibConfiguration,
    deps: [LibConfiguration],
    multi: true
};

@NgModule({
    declarations: [...],
    entryComponents: [
    ],
    imports: [
        AngularAuthModule.forRoot(config),
        ...
    ],
    providers: [
        INIT_ENVIRONMENT,
        ...
    ],
    bootstrap: [...]
})
```
### Configuration Variables

### Example
```
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  public login() {
    this.authService.login(this.email, this.password, environment.auth_endpoint).then((resp) => {
     console.log(resp);
    }, reason => {
      console.log(reason);
    })
  }
}
```

