import {BaseModel} from './base.model';


export class AuthModel extends BaseModel
{

    private access_token: string = null;
    private refresh_token: string = null;
    private expires_in: number = null;
    private currentDate: number = null;

    public constructor()
    {
        super();
        this.setCurrentDate();
    }
    public getAccess_token(): string
    {
        return this.access_token;
    }
    public setAccess_token(access_token: string): this
    {
        this.access_token = access_token;
        return this;
    }
    public getRefresh_token(): string
    {
        return this.refresh_token;
    }
    public setRefresh_token(refresh_token: string): this
    {
        this.refresh_token = refresh_token;
        return this;
    }
    public getExpires_in(): number
    {
        return this.expires_in;
    }
    public setExpires_in(expiresIn: number): this
    {
        this.expires_in = expiresIn;
        return this;
    }

    public getCurrentDate(): number
    {
        return this.currentDate;
    }
    public setCurrentDate(seconds: number = null): this
    {
        //if seconds is null, get actual timestamp
        if (!seconds)
        {
            seconds = new Date().getTime();
        }
        this.currentDate = seconds;
        return this;
    }

    public tokenExpired(): boolean
    {
        //temporal
        var expired = true;
        if (this.getExpires_in() && this.getCurrentDate()) 
        {
            var currentTime = new Date().getTime();
            //            console.log("Auth date", new Date(this.getCurrentDate()));
            //            console.log("Expire date", new Date((this.getExpires_in() * 1000) + this.getCurrentDate()));
            //            console.log("Now date", new Date(currentTime));

            //multiplicate by 1000 to get milisecons
            if (+((this.getExpires_in() * 1000) + this.getCurrentDate()) > currentTime)
            {
                expired = false;
            }
        }
        return expired;
    }

}
