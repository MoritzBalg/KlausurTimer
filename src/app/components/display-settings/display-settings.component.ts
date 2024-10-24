import { Component, OnInit } from '@angular/core';
import { globals } from '../../../globals';
import { DisplayConfig } from '../../models/display-config';
import { FormsModule } from '@angular/forms';
import { ToiletService } from '../../services/toilet.service';
import { cloneObject, updateObject } from '../../lib/util';

@Component({
  selector: 'app-display-settings',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './display-settings.component.html',
  styleUrl: './display-settings.component.scss'
})
export class DisplaySettingsComponent implements OnInit{
  tempDisplayConfig!: DisplayConfig

  constructor(private toiletService: ToiletService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  public reset(): void{
    this.tempDisplayConfig = cloneObject(globals.displayConfig);
  }

  public saveChanges(): void{
    updateObject(globals.displayConfig, this.tempDisplayConfig);
    this.toiletService.setToiletCount(globals.displayConfig.toiletCount);
  }
}
