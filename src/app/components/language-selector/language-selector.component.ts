import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
    constructor(@Inject(LOCALE_ID) public locale: string) {
    }
}
