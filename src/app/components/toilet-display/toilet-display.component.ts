import { Component, OnInit } from '@angular/core';
import { ToiletStateComponent } from '../toilet-state/toilet-state.component';
import { NgForOf } from '@angular/common';
import { Toilet } from '../../models/toilet';
import { ToiletService } from '../../services/toilet.service';

@Component({
  selector: 'app-toilet-display',
  standalone: true,
  imports: [
    ToiletStateComponent,
    NgForOf,
  ],
  templateUrl: './toilet-display.component.html',
  styleUrl: './toilet-display.component.scss'
})
export class ToiletDisplayComponent implements OnInit{
  toilets: Toilet[] = [];

  constructor(private toiletService: ToiletService) {
  }

  ngOnInit(): void {
    this.toiletService.getToilets().subscribe((toilets: Toilet[]) => this.toilets = toilets);
  }
}
