import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
    constructor(@Inject(LOCALE_ID) public locale: string, private router: Router) {
    }

    switchToLocale(targetLocale: string) {
      if(targetLocale === this.locale) return;
      window.open(this.router.serializeUrl(this.router.createUrlTree( [window.location.pathname.replace(`/${this.locale}`, `/${targetLocale}`)],{queryParams: Object.fromEntries((new URLSearchParams(window.location.search)).entries())})), '_self');
    }
}
