import { Component, Input } from '@angular/core';
import { ExamState } from '../../models/exam-state';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-status-display',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
  ],
  templateUrl: './status-display.component.html',
  styleUrl: './status-display.component.scss'
})
export class StatusDisplayComponent {
  protected readonly ExamState = ExamState;

  constructor(public timerService: TimerService) {
  }
}
