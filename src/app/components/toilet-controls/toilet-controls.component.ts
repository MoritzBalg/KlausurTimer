import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Toilet } from '../../models/toilet';
import { ToiletService } from '../../services/toilet.service';
import { ToiletControlComponent } from '../toilet-control/toilet-control.component';

@Component({
  selector: 'app-toilet-controls',
  standalone: true,
    imports: [
        NgForOf,
        ToiletControlComponent,
    ],
  templateUrl: './toilet-controls.component.html',
  styleUrl: './toilet-controls.component.scss'
})
export class ToiletControlsComponent {
  toilets: Toilet[] = [];

  constructor(private toiletService: ToiletService) {
  }

  ngOnInit(): void {
    this.toiletService.getToilets().subscribe((toilets: Toilet[]) => this.toilets = toilets);
  }
}
