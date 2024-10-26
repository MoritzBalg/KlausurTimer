import { Component, OnInit } from '@angular/core';
import { ClockComponent } from '../../components/clock/clock.component';
import { ExamInfoComponent } from '../../components/exam-info/exam-info.component';
import { GithubLinkComponent } from '../../components/github-link/github-link.component';
import { StatusDisplayComponent } from '../../components/status-display/status-display.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { EventLogComponent } from '../../components/event-log/event-log.component';
import { NgIf } from '@angular/common';
import { ToiletDisplayComponent } from '../../components/toilet-display/toilet-display.component';
import { DisplayConfig } from '../../models/display-config';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ClockComponent,
    ExamInfoComponent,
    GithubLinkComponent,
    StatusDisplayComponent,
    TimerComponent,
    EventLogComponent,
    NgIf,
    ToiletDisplayComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  displayConfig!: DisplayConfig;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.getDisplayConfig().subscribe((displayConfig: DisplayConfig) => {
      this.displayConfig = displayConfig;
    });
  }
}
