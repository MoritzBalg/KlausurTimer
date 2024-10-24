import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClockComponent } from './components/clock/clock.component';
import { GithubLinkComponent } from './components/github-link/github-link.component';
import { TimerComponent } from './components/timer/timer.component';
import { ExamInfoComponent } from './components/exam-info/exam-info.component';
import { StatusDisplayComponent } from './components/status-display/status-display.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { ModalComponent } from './components/modal/modal.component';
import { ExamSettingsComponent } from './components/exam-settings/exam-settings.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClockComponent, GithubLinkComponent, TimerComponent, ExamInfoComponent, StatusDisplayComponent, TimerControlsComponent, ModalComponent, ExamSettingsComponent, SettingsModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('settingsModal') settingsModal!: ModalComponent;

  openSettings(): void{
    this.settingsModal.open();
  }
}
