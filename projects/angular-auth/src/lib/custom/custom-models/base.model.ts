import {Injectable} from '@angular/core';

export class BaseModel
{

    protected localStored: boolean = null;
    isLocalStored(): boolean
    {
        return this.localStored ? true : false;
    }
    setLocalStored(local: boolean = true): this
    {
        this.localStored = local;
        return this;
    }



    initialize(data: any): this
    {
        //        console.log("Parsing class", this);
        let key: any;
        for (key in data)
        {
            //            console.log(key, this.hasOwnProperty(key) && typeof this[key] !== 'function');
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function')
            {
                this[key] = data[key];
            }
        }
        return this;
    }

    serialize()
    {
        var toRet = [];
        let key: any;
        for (key in this)
        {
            if (typeof this[key] !== 'function')
            {
                toRet[key] = this[key];
            }
        }
        return toRet;
    }

    toString()
    {
        var toRet = '';
        let key: any;
        for (key in this)
        {
            if (typeof this[key] !== 'function')
            {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    }

    clear()
    {
        for (let key in this)
        {
            //set all properties to null
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function')
            {
                if (key != 'http' && key != 'api' && key != 'helper')
                {
                    //                    console.log("removing ", key, typeof this[key]);
                    this[key] = null;
                }
            }
        }
    }
    clone()
    {
        return JSON.parse(JSON.stringify(this));
    }

}
