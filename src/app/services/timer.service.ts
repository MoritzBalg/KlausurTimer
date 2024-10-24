import { Injectable } from '@angular/core';
import { ExamState } from '../models/exam-state';
import { EventService } from './event.service';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService{
  private state: ExamState = ExamState.INITIAL;
  private stateChange: Subject<ExamState> = new BehaviorSubject<ExamState>(this.state);
  private duration: number = 2 * 60 * 60 * 1000;
  private bonus: number = 0;
  private startTime?: Date;
  private elapsedDuration?: number;

  constructor(private eventService: EventService) {
  }

  /**
   * sets the timer
   * @param duration duration in milliseconds
   */
  public setTimer(duration: number): void {
    this.duration = duration;
  }

  public addBonus(duration: number): void {
    this.bonus += duration;
  }

  public resetTimer(): void{
    this.setExamState(ExamState.INITIAL);
    this.bonus = 0;
    this.startTime = undefined;
  }

  public startTimer(): void{
    this.startTime = new Date();
    this.eventService.log('Klausur gestartet');
    this.setExamState(ExamState.RUNNING);
  }

  public pauseTimer(): void{
    this.elapsedDuration = Date.now() - (this.startTime?.getTime() ?? 0);
    this.eventService.log('Klausur pausiert');
    this.setExamState(ExamState.PAUSED);
  }

  public resumeTimer(): void{
    this.startTime = new Date(Date.now() - (this.elapsedDuration ?? 0));
    this.elapsedDuration = undefined;
    this.eventService.log('Klausur fortgesetzt');
    this.setExamState(ExamState.RUNNING);
  }

  public stopTimer(): void{
    if(this.state === ExamState.FINISHED) return;
    this.startTime = undefined;
    this.eventService.log('Klausur beendet');
    this.setExamState(ExamState.FINISHED);
  }

  public getEndTime(): Date | undefined{
    if(!this.startTime) return undefined;
    return this.dateAdd(this.startTime, this.getCumulatedDuration());
  }

  public getState(): ExamState {
    return this.state;
  }

  public getStateChange(): Subject<ExamState> {
    return this.stateChange;
  }

  public dateAdd(date: Date, duration: number): Date {
    return new Date(date.getTime() + duration);
  }

  public getDuration(): number{
    return this.duration;
  }

  public getBonus(): number{
    return this.bonus;
  }

  public getRemainingDuration(): number{
    return (this.getEndTime()?.getTime() ?? 0) - (new Date()).getTime();
  }

  public getCumulatedDuration(): number{
    return this.duration + this.bonus;
  }

  setExamState(examState: ExamState): void {
    this.state = examState;
    this.stateChange.next(this.state);
  }
}
