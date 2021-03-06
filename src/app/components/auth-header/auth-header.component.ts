import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorageService } from 'src/app/shared/services/language-storage.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
  @Input() title: string;
  darkMode: boolean = false;
  langlist: string[] = ['Magyar', 'Srpski', 'English'];

  constructor(
    public translate: TranslateService,
    private languageStorage: LanguageStorageService
  ) {
    this.translate.addLangs(['hu', 'rs', 'gb']);
    if (this.languageStorage.getLanguage()) {
      translate.use(this.languageStorage.getLanguage());
    }
  }

  ngOnInit() { }

  toggleDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  switchLang(lang: any): void {
    this.translate.use(lang);
    this.languageStorage.setLanguage(lang);
  }

}
