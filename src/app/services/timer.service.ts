import { Injectable } from '@angular/core';
import { ExamState } from '../models/exam-state';
import { EventService } from './event.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { SettingsService } from './settings.service';
import { ExamConfig } from '../models/exam-config';
import { millisecondsToHms } from '../lib/util';

@Injectable({
  providedIn: 'root'
})
export class TimerService{
  private state: ExamState = ExamState.INITIAL;
  private stateChange: Subject<ExamState> = new BehaviorSubject<ExamState>(this.state);
  private duration: number = 2 * 60 * 60 * 1000;
  private durationChange: Subject<void> = new Subject<void>();
  private bonus: number = 0;
  private startTime?: Date;
  private elapsedDuration?: number;

  constructor(private eventService: EventService, private settingsService: SettingsService) {
    this.settingsService.getExamConfig().subscribe((examConfig: ExamConfig) => {
      if(examConfig.duration !== this.duration){
        this.setTimer(examConfig.duration);
        this.stateChange.next(this.state);
      }
    });

    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));

    this.loadStartTime();
    this.loadBonus();
    this.loadElapsedDuration();
    this.loadExamState();
  }

  /**
   * sets the timer
   * @param duration duration in milliseconds
   */
  public setTimer(duration: number): void {
    this.duration = duration;
    this.durationChange.next();
  }

  public getDurationChange(): Subject<void>{
    return this.durationChange;
  }

  public addBonus(duration: number): void {
    this.setBonus(this.bonus + duration);
    this.eventService.log($localize`Zeitbonus gewährt ${this.bonus > 0 ? '+' : '-'}${millisecondsToHms(Math.abs(this.bonus), true)}`);
  }

  public resetTimer(): void{
    this.setBonus(0);
    this.setExamState(ExamState.INITIAL);
    this.setStartTime(undefined);
  }

  public startTimer(): void{
    this.setStartTime(new Date());
    this.eventService.log($localize`Klausur gestartet`);
    this.setExamState(ExamState.RUNNING);
  }

  public pauseTimer(): void{
    this.setElapsedDuration(Date.now() - (this.startTime?.getTime() ?? 0));
    this.eventService.log($localize`Klausur pausiert`);
    this.setExamState(ExamState.PAUSED);
  }

  public resumeTimer(): void{
    this.setStartTime(new Date(Date.now() - (this.elapsedDuration ?? 0)));
    this.setElapsedDuration(undefined);
    this.eventService.log($localize`Klausur fortgesetzt`);
    this.setExamState(ExamState.RUNNING);
  }

  public stopTimer(): void{
    if(this.state === ExamState.FINISHED) return;
    this.setStartTime(undefined);
    this.eventService.log($localize`Klausur beendet`);
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
    localStorage.setItem('examState', examState.toString());
    this.stateChange.next(this.state);
  }

  setStartTime(date: Date | undefined): void{
    this.startTime = date;
    localStorage.setItem('startTime', date?.getTime().toString() ?? '');
  }

  setBonus(duration: number): void{
    this.bonus = duration;
    localStorage.setItem('bonus', this.bonus.toString());
    this.durationChange.next();
  }

  setElapsedDuration(duration: number | undefined): void{
    this.elapsedDuration = duration;
    localStorage.setItem('elapsedDuration', this.elapsedDuration?.toString() ?? '');
  }

  handleStorageEvent(event: StorageEvent): void {
    if(event.key === 'examState'){
      this.loadExamState();
    }else if(event.key === 'startTime'){
      this.loadStartTime();
    }else if(event.key === 'bonus'){
      this.loadBonus();
    }else if(event.key === 'elapsedDuration'){
      this.loadElapsedDuration();
    }
  }

  loadExamState(): void{
    this.state = parseInt(localStorage.getItem('examState') ?? '0');
    this.stateChange.next(this.state);
  }

  loadStartTime(): void{
    const val: string | null = localStorage.getItem('startTime');
    this.startTime = val ? new Date(parseInt(val)) : undefined;
  }

  loadBonus(): void{
    const val: string = localStorage.getItem('bonus') ?? '0';
    this.bonus = parseInt(val);
    this.durationChange.next();
  }

  loadElapsedDuration(): void{
    const val: string | null = localStorage.getItem('elapsedDuration');
    this.elapsedDuration = val ? parseInt(val) : undefined;
  }
}
