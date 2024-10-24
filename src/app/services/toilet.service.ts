import { Injectable } from '@angular/core';
import { Toilet } from '../models/toilet';
import { ToiletState } from '../models/toilet-state';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ToiletService {
  t: Toilet[] = [
    {state: ToiletState.VACANT}
  ];
  toilets: Subject<Toilet[]> = new BehaviorSubject<Toilet[]>(this.t);

  constructor() { }

  public setToiletCount(value: number): void{
    this.t = [];
    for(let i = 0; i < value; i++){
      this.t.push({
        state: ToiletState.VACANT
      });
    }
    this.toilets.next(this.t);
  }

  public getToilets(): Subject<Toilet[]>{
    return this.toilets;
  }

  public setToiletState(index: number, state: ToiletState): void{
    this.t[index].state = state;
    this.toilets.next(this.t);
  }
}
