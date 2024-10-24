import { Injectable } from '@angular/core';
import { ExamEvent } from '../models/exam-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventLog: ExamEvent[] = [];

  constructor() { }

  log(message: string){
    this.eventLog.push(new ExamEvent(new Date(), message));
  }

  getLog(): ExamEvent[] {
    return this.eventLog;
  }
}
