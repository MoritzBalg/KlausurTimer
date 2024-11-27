import { Component, OnInit } from '@angular/core';
import { ClockComponent } from '../../components/clock/clock.component';
import { ExamInfoComponent } from '../../components/exam-info/exam-info.component';
import { GithubLinkComponent } from '../../components/github-link/github-link.component';
import { StatusDisplayComponent } from '../../components/status-display/status-display.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { EventLogComponent } from '../../components/event-log/event-log.component';
import { DatePipe, NgIf } from '@angular/common';
import { ToiletDisplayComponent } from '../../components/toilet-display/toilet-display.component';
import { DisplayConfig } from '../../models/display-config';
import { SettingsService } from '../../services/settings.service';
import { ViewService } from '../../services/view.service';
import { WindowType } from '../../models/window-type';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';
import { DurationDisplayComponent } from '../../components/duration-display/duration-display.component';
import { NotesDisplayComponent } from '../../components/notes-display/notes-display.component';

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
    DurationDisplayComponent,
    DatePipe,
    NotesDisplayComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  displayConfig!: DisplayConfig;
  windowType!: WindowType;
  date?: Date;

  constructor(private viewService: ViewService, private settingsService: SettingsService, private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.updateDate();
    this.settingsService.getDisplayConfig().subscribe((displayConfig: DisplayConfig) => {
      this.displayConfig = displayConfig;
    });
    this.viewService.windowTypeSubject.subscribe(windowType => {
      this.windowType = windowType;
      if(this.windowType !== WindowType.ALL_IN_ONE) this.viewService.hideSettingsModal();
    })
    this.timerService.getStateChange().subscribe(state => {
      if(state === ExamState.INITIAL && this.windowType === WindowType.ALL_IN_ONE) this.viewService.showSettingsModal();
      if(state === ExamState.RUNNING) this.updateDate();
    })
  }

  updateDate(): void{
    this.date = new Date();
  }
}
