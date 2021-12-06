import { Component, Input, OnInit } from '@angular/core';
import { SIZE_TO_MEDIA } from '@ionic/core/dist/collection/utils/media'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor(public translate: TranslateService) { 
    translate.use('hu');
    translate.addLangs(['en', 'hu', 'sr']);
  }

  ngOnInit() { }

  toggleMenu() {
    const splitPane = document.querySelector('ion-split-pane');
    if (window.matchMedia(SIZE_TO_MEDIA[splitPane.when] || splitPane.when).matches)
      splitPane.classList.toggle('split-pane-visible')
  }

  switchLang(ev: any) {    
    this.translate.use(ev.detail.value);
  }

}
