import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ToiletState } from '../../models/toilet-state';
import { Toilet } from '../../models/toilet';
import { ToiletService } from '../../services/toilet.service';

@Component({
  selector: 'app-toilet-state',
  standalone: true,
  imports: [],
  templateUrl: './toilet-state.component.html',
  styleUrl: './toilet-state.component.scss'
})
export class ToiletStateComponent {
  @Input() index!: number;
  @Input() toilet!: Toilet;

  constructor(private toiletService: ToiletService) {
  }

  @HostBinding('class.vacant') get isVacant():boolean {
    return this.toilet.state === ToiletState.VACANT
  };

  @HostBinding('class.occupied') get isOccupied(): boolean {
    return this.toilet.state === ToiletState.OCCUPIED
  };

  @HostBinding('class.blocked') get idBlocked(): boolean {
    return this.toilet.state === ToiletState.BLOCKED
  };

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if(this.toilet.state !== ToiletState.BLOCKED){
      if(this.toilet.state === ToiletState.OCCUPIED) this.toiletService.setToiletState(this.index, ToiletState.VACANT);
      else this.toiletService.setToiletState(this.index, ToiletState.OCCUPIED);
    }
  }
}
