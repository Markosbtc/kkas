import { Component, Input, OnInit } from '@angular/core';
import { SIZE_TO_MEDIA } from '@ionic/core/dist/collection/utils/media'
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorageService } from 'src/app/shared/services/language-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() withBack: boolean = false;

  constructor(
    public translate: TranslateService,
    private languageStorage: LanguageStorageService
  ) {
    this.translate.addLangs(['hu', 'sr', 'en']);
    if (this.languageStorage.getLanguage()) {
      translate.use(this.languageStorage.getLanguage());
    }
  }

  ngOnInit() { }

  toggleMenu() {
    const splitPane = document.querySelector('ion-split-pane');
    if (window.matchMedia(SIZE_TO_MEDIA[splitPane.when] || splitPane.when).matches)
      splitPane.classList.toggle('split-pane-visible')
  }

  switchLang(ev: any): void {
    this.translate.use(ev.detail.value);
    this.languageStorage.setLanguage(ev.detail.value);
  }

}
