import { Component, OnInit } from '@angular/core';
import { ExamConfig } from '../../models/exam-config';
import { globals } from '../../../globals';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';
import { cloneObject, updateObject } from '../../lib/util';

@Component({
  selector: 'app-exam-settings',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './exam-settings.component.html',
  styleUrl: './exam-settings.component.scss'
})
export class ExamSettingsComponent implements OnInit{

  tempExamConfig!: ExamConfig
  tempDuration: string = '00:00';

  constructor(public timerService: TimerService) {
  }

  ngOnInit() {
    this.reset();
  }

  public saveChanges(): void{
    this.tempExamConfig.duration = this.hmToMilliseconds(this.tempDuration);
    updateObject(globals.examConfig, this.tempExamConfig);
    this.timerService.setTimer(globals.examConfig.duration);
  }

  public reset(): void {
    this.tempExamConfig = cloneObject(globals.examConfig);
    this.tempDuration = this.millisecondsToHm(this.tempExamConfig.duration);
  }

  hmToMilliseconds(time: string): number{
    const [hours, minutes] = time.split(':');
    return (parseInt(hours) * 60 + parseInt(minutes)) * 60000;
  }

  millisecondsToHm(milliseconds: number): string {
    const h: number = Math.floor(milliseconds / 3600000);
    const m: number = Math.floor((milliseconds % 3600000) / 60000);
    const hDisplay = h < 10 ? '0' + h : h;
    const mDisplay = m < 10 ? '0' + m : m;

    return hDisplay + ':' + mDisplay;
  }

  protected readonly ExamState = ExamState;
}
