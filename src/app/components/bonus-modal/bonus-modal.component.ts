import { Component, ViewChild } from '@angular/core';
import { DisplaySettingsComponent } from '../display-settings/display-settings.component';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';
import { ModalComponent } from '../modal/modal.component';
import { ViewService } from '../../services/view.service';
import { TimerService } from '../../services/timer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bonus-modal',
  standalone: true,
  imports: [
    DisplaySettingsComponent,
    ExamSettingsComponent,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './bonus-modal.component.html',
  styleUrl: './bonus-modal.component.scss'
})
export class BonusModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  bonusValue: string = '';

  constructor(private timerService: TimerService) {
  }

  public open(): void{
    this.modal.open();
  }

  abort(): void{
    this.modal.close();
  }

  onClose(): void{
    this.bonusValue = '';
  }

  saveChanges(): void{
    const bonus = parseFloat(this.bonusValue.replace(',', '.')) * 60 * 1000;
    console.log(bonus);
    if(typeof bonus === 'number') {
      this.timerService.addBonus(bonus);
      this.modal.close();
    }
  }
}
