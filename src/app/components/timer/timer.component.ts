import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';
import { millisecondsToHms } from '../../lib/util';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {
  timerInterval?: number;

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    this.timerService.getStateChange().subscribe((state: ExamState) => this.handleTimerStateChange(state));
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval!);
    this.timerInterval = undefined;
  }

  handleTimerStateChange(examState: ExamState) {
    if(examState === ExamState.INITIAL){
      this.displayTime(millisecondsToHms(this.timerService.getCumulatedDuration()));
    }else if(examState === ExamState.FINISHED){
      this.displayTime($localize`ENDE`);
    }
  }

  updateTimer(): void {
    if(this.timerService.getState() !== ExamState.RUNNING) return;
    const remainingTime: number = this.timerService.getRemainingDuration();
    if(remainingTime < 0){
      this.timerService.stopTimer();
      return;
    }
    this.displayTime(millisecondsToHms(remainingTime));
  }

  displayTime(time: string): void{
    const span :HTMLElement | null  = document.getElementById('timer');
    if(span) span.innerText = time;
  }
}
