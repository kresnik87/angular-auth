import {Injectable, EventEmitter} from '@angular/core';
import {SubcriberEvent} from '../interfaces';
import {STORAGE_KEY_AUTH, STORAGE_KEY_USER} from '../hooks';

@Injectable({
    providedIn: 'root'
})
export class BaseCustomService
{

    public events: EventEmitter<SubcriberEvent> = new EventEmitter<SubcriberEvent>();

    constructor()
    {
    }


  getLocal(key: string)
  {
    let result = JSON.parse(localStorage.getItem(key));
    return result;
  }

  setLocal(key: string, item: any)
  {
    localStorage.setItem(key, JSON.stringify(item));
    return this;
  }

  clearLocal()
  {
    let returned: number = 0;
    let todelete = [
      STORAGE_KEY_AUTH, STORAGE_KEY_USER
    ];
    for (let item of todelete)
    {
      this.removeLocal(item);
      returned++;
      if (returned >= todelete.length)
      {
        return this;
      }

    }
  }

    removeLocal(key: string)
    {
        localStorage.removeItem(key);
        return this;
    }

    getEvents()
    {
        return this.events;
    }

    subscribEvent(key: string): EventEmitter<any>
    {
        let obs = new EventEmitter<any>();

        this.events.subscribe(
            (resp: SubcriberEvent) =>
            {
                if (resp.key == key)
                {
                    obs.emit(resp.data);
                }
            }
        );
        return obs;
    }

    emitEvent(key: string, data: any = null): void
    {
        let event: SubcriberEvent = {key: key, data: data};
        console.info("Event " + key + "emit", event);
        return this.events.emit(event);
    }

}
