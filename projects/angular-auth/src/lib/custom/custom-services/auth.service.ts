import {Injectable} from '@angular/core';
import {BaseCustomService} from './base-custom.service';
import {AuthModel} from '../custom-models/auth.model';

export {AuthModel}
import {ApiProvider} from '../providers';
import {ApiConfiguration} from "../../swagger/api-configuration";

import {STORAGE_KEY_LOGIN, STORAGE_KEY_AUTH, USER_EVENT_CHANGE} from '../hooks';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseCustomService
{
    private _config: ApiConfiguration;

    constructor(
        private api_provider: ApiProvider,
        protected config: ApiConfiguration
    )
    {
        super();
        this._config = this.config
    }

    logout()
    {

        return new Promise((resolve, reject) =>
        {
            this.api_provider.post('api/logout').subscribe(
                (resp: any) =>
                {
                    this.clearLocal();
                    //                            this.events.publish(USER_EVENT_CHANGE);
                    resolve(resp);
                },
                (err) =>
                {
                    this.clearLocal();
                    //                    this.events.publish(USER_EVENT_CHANGE);
                    reject(err);
                }
            );
        });
    }

    login(username: string, password: string)
    {
        var body = {
            "username": username,
            "password": password,
            "grant_type": this._config.grant_type,
            "client_id": this._config.client_id,
            "client_secret": this._config.client_secret
        };

        return new Promise<AuthModel>((resolve, reject) =>
        {
            this.api_provider.form('api/login', body).subscribe(
                (resp: any) =>
                {
                    let auth = new AuthModel();
                    auth.initialize(resp);
                    this.setLocalAuth(auth);
                    resolve(auth);
                },
                (err) =>
                {
                    reject(err);
                }
            );
        });
    }


    storeLogin(username: string, password: string)
    {
        this.setLocal(STORAGE_KEY_LOGIN, {
            'username': username,
            'password': password,
        });
        //            this.events.publish(STORAGE_KEY_LOGIN);

    }

    getLogin()
    {
        return this.getLocal(STORAGE_KEY_LOGIN);
    }

    getLocalAuth(): AuthModel
    {
        let auth = this.getLocal(STORAGE_KEY_AUTH);

        let obj: AuthModel = new AuthModel();
        obj.initialize(auth);
        return obj;
    }

    setLocalAuth(auth: AuthModel)
    {
        this.setLocal(STORAGE_KEY_AUTH, auth);
        return this;
    }

    isGranted(): boolean
    {
        let auth = this.getLocalAuth();
        if (auth)
        {
            if (auth.getAccess_token() && !auth.tokenExpired())
            {
                return true;
            } else
            {
                return false;
            }
        } else
        {
            return false;
        }
    }
}
