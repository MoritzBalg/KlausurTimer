import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit, OnDestroy{
  clockInterval?: number;

  ngOnInit() {
    this.clockInterval = setInterval(this.updateCurrentTime, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval!);
    this.clockInterval = undefined;
  }

  updateCurrentTime() {
    const span :HTMLElement | null  = document.getElementById('clock');
    if(span) span.innerText = (new Date).toLocaleTimeString();
  }
}
