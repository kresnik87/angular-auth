import {Injectable} from '@angular/core';
import {BaseCustomService} from './base-custom.service';
import {AuthModel} from '../custom-models';
import {ApiProvider} from '../providers';
import {LibConfiguration} from "../../swagger/lib-configuration";

import {STORAGE_KEY_AUTH, STORAGE_KEY_LOGIN} from '../hooks';
import {AuthConfigInterface} from "../interfaces";

const default_login_path = "api/login";
const default_logout_path = "api/logout";
export {AuthModel}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseCustomService {
  private _config: LibConfiguration;
  private _url: string;

  constructor(
    private api_provider: ApiProvider,
    protected config: LibConfiguration
  ) {
    super();
    this._config = this.config
  }

  logout(url_custom?: string) {
    this._config.default_routes ? this._url = default_logout_path : this._url = url_custom;
    return new Promise((resolve, reject) => {
      this.api_provider.post(this._url).subscribe(
        (resp: any) => {
          this.clearLocal();
          //                            this.events.publish(USER_EVENT_CHANGE);
          resolve(resp);
        },
        (err) => {
          this.clearLocal();
          //                    this.events.publish(USER_EVENT_CHANGE);
          reject(err);
        }
      );
    });
  }

  login(username: string, password: string, authConfig?: AuthConfigInterface) {
    let body: any;
    if (this._config.oauthMode) {
      body = {
        "username": username,
        "password": password,
        "grant_type": this._config.grant_type,
        "client_id": this._config.client_id,
        "client_secret": this._config.client_secret
      };
    } else {
      body = {
        "username": username,
        "password": password
      };
    }

    this._config.default_routes ? this._url = default_login_path : this._url = authConfig.endpoint;
    return new Promise<AuthModel>((resolve, reject) => {
      if (authConfig.options) {
        this.api_provider.form(this._url, authConfig.customBody ? authConfig.body : body).subscribe(
          (resp: any) => {
            let auth = new AuthModel();
            auth.initialize(resp);
            this.setLocalAuth(auth);
            resolve(auth);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        this.api_provider.post(this._url, body).subscribe(
          (resp: any) => {
            let auth = new AuthModel();
            auth.initialize(resp);
            this.setLocalAuth(auth);
            resolve(auth);
          },
          (err) => {
            reject(err);
          }
        );
      }

    });
  }


  storeLogin(username: string, password: string) {
    this.setLocal(STORAGE_KEY_LOGIN, {
      'username': username,
      'password': password,
    });
    //            this.events.publish(STORAGE_KEY_LOGIN);

  }


  getLogin() {
    return this.getLocal(STORAGE_KEY_LOGIN);
  }

  getLocalAuth(): AuthModel {
    let auth = this.getLocal(STORAGE_KEY_AUTH);

    let obj: AuthModel = new AuthModel();
    obj.initialize(auth);
    return obj;
  }

  setLocalAuth(auth: AuthModel) {
    this.setLocal(STORAGE_KEY_AUTH, auth);
    return this;
  }

  isGranted(): boolean {
    let auth = this.getLocalAuth();
    if (auth) {
      if (auth.getAccess_token() && !auth.tokenExpired()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


}
