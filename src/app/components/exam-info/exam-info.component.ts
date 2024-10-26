import { Component, Input, OnInit } from '@angular/core';
import { ExamConfig } from '../../models/exam-config';
import { NgIf } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { DisplayConfig } from '../../models/display-config';

@Component({
  selector: 'app-exam-info',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './exam-info.component.html',
  styleUrl: './exam-info.component.scss'
})
export class ExamInfoComponent implements OnInit{
  date: string = '';
  examConfig!: ExamConfig;
  displayConfig!: DisplayConfig;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.date = (new Date).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit', year: 'numeric'});

    this.settingsService.getDisplayConfig().subscribe((displayConfig: DisplayConfig) => {
      this.displayConfig = displayConfig;
    });

    this.settingsService.getExamConfig().subscribe((examConfig: ExamConfig) => {
      this.examConfig = examConfig;
    });
  }
}
