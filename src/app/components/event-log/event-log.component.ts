import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-event-log',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
  ],
  templateUrl: './event-log.component.html',
  styleUrl: './event-log.component.scss'
})
export class EventLogComponent {
  constructor(public eventService: EventService) {
  }

  protected readonly EventService = EventService;
}
