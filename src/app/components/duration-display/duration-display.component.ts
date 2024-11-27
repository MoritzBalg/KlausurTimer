import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { millisecondsToHms } from '../../lib/util';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-duration-display',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './duration-display.component.html',
  styleUrl: './duration-display.component.scss'
})
export class DurationDisplayComponent implements OnInit{
  duration: string = '';
  bonus?: string;
  positiveBonus: boolean = true;

  constructor(public timerService: TimerService) {
  }

  ngOnInit(): void {
    this.timerService.getDurationChange().subscribe(() => {
      this.updateDuration();
    });
    this.updateDuration();
  }

  updateDuration(): void {
    this.duration = millisecondsToHms(this.timerService.getDuration());
    const bonusValue = this.timerService.getBonus();
    if(bonusValue && bonusValue !== 0) {
      this.bonus = millisecondsToHms(Math.abs(bonusValue), true);
      this.positiveBonus = bonusValue > 0;
    }else {
      this.bonus = undefined;
    }
  }
}
