import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WindowType } from '../models/window-type';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  public showSettingsModalSubject: Subject<boolean> = new Subject<boolean>();
  public windowTypeSubject: Subject<WindowType> = new BehaviorSubject<WindowType>(WindowType.ALL_IN_ONE);

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params['hideSettings']) this.hideSettingsModal();
      if(params['billboard']) this.setWindowType(WindowType.BILLBOARD);
    });
  }

  public showSettingsModal(): void{
    this.showSettingsModalSubject.next(true);
  }

  public hideSettingsModal(): void{
    this.showSettingsModalSubject.next(false);
  }

  public setWindowType(windowType: WindowType): void{
    this.windowTypeSubject.next(windowType);
  }
}
