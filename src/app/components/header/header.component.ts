import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SIZE_TO_MEDIA } from '@ionic/core/dist/collection/utils/media'
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LanguageStorageService } from 'src/app/shared/services/language-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() withBack: boolean = false;
  darkMode: boolean = false;
  user = null;

  constructor(
    public translate: TranslateService,
    private languageStorage: LanguageStorageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.translate.addLangs(['hu', 'sr', 'en']);
    if (this.languageStorage.getLanguage()) {
      translate.use(this.languageStorage.getLanguage());
    }
  }

  // TODO: does not work perfectly on first load
  ngOnInit() {
    this.authService.getUserProfile().subscribe((res) => {
      this.user = res;
    });
  }

  toggleMenu() {
    const splitPane = document.querySelector('ion-split-pane');
    if (window.matchMedia(SIZE_TO_MEDIA[splitPane.when] || splitPane.when).matches)
      splitPane.classList.toggle('split-pane-visible')
  }

  toggleDarkMode() {
    // TODO: 
    console.log(this.darkMode);
  }

  switchLang(lang: any): void {
    this.translate.use(lang);
    this.languageStorage.setLanguage(lang);
  }

  // TODO: header options button does not refresh ?== this.user does not refresh?
  logout() {
    this.authService.logout();
    this.user = null;
  }

  login() {
    this.router.navigateByUrl('login');
  }

}
