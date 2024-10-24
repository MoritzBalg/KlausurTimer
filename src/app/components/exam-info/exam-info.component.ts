import { Component, Input, OnInit } from '@angular/core';
import { ExamConfig } from '../../models/exam-config';
import { globals } from '../../../globals';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-exam-info',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './exam-info.component.html',
  styleUrl: './exam-info.component.scss'
})
export class ExamInfoComponent implements OnInit{
  date: string = '';

  ngOnInit() {
    this.date = (new Date).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  protected readonly examConfig = globals.examConfig;
  protected readonly displayConfig = globals.displayConfig;
}
