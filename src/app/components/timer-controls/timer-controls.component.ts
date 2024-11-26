import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { NgIf } from '@angular/common';
import { ExamState } from '../../models/exam-state';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-timer-controls',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './timer-controls.component.html',
  styleUrl: './timer-controls.component.scss'
})
export class TimerControlsComponent {

  constructor(public timerService: TimerService, private eventService: EventService) {
  }

  startExam(): void{
    this.timerService.startTimer();
  }

  pauseExam(): void{
    this.timerService.pauseTimer();
  }

  resumeExam(): void{
    this.timerService.resumeTimer();
  }

  stopExam(): void{
    this.timerService.stopTimer();
  }

  resetTimer(): void{
    this.timerService.resetTimer();
    this.eventService.resetLog();
  }

  protected readonly ExamState = ExamState;
}
