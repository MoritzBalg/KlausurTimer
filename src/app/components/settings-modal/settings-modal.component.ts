import { Component, ViewChild } from '@angular/core';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';
import { ModalComponent } from '../modal/modal.component';
import { DisplaySettingsComponent } from '../display-settings/display-settings.component';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [
    ExamSettingsComponent,
    ModalComponent,
    DisplaySettingsComponent,
  ],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss'
})
export class SettingsModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(ExamSettingsComponent) examSettings!: ExamSettingsComponent;
  @ViewChild(DisplaySettingsComponent) displaySettings!: DisplaySettingsComponent;

  public open(): void{
    this.modal.open();
  }

  abort(): void{
    this.modal.close();
  }

  onClose(): void{
    this.examSettings.reset();
    this.displaySettings.reset();
  }

  saveChanges(): void{
    this.examSettings.saveChanges();
    this.displaySettings.saveChanges();
    this.modal.close();
  }
}
