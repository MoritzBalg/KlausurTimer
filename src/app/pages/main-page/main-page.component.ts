import { Component } from '@angular/core';
import { ClockComponent } from '../../components/clock/clock.component';
import { ExamInfoComponent } from '../../components/exam-info/exam-info.component';
import { GithubLinkComponent } from '../../components/github-link/github-link.component';
import { StatusDisplayComponent } from '../../components/status-display/status-display.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { EventLogComponent } from '../../components/event-log/event-log.component';
import { globals } from '../../../globals';
import { NgIf } from '@angular/common';
import { ToiletDisplayComponent } from '../../components/toilet-display/toilet-display.component';

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
export class MainPageComponent {
  protected readonly displayConfig = globals.displayConfig;
}
