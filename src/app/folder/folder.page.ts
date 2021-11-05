import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SIZE_TO_MEDIA } from '@ionic/core/dist/collection/utils/media'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  toggleMenu() {
    const splitPane = document.querySelector('ion-split-pane');
    if (window.matchMedia(SIZE_TO_MEDIA[splitPane.when] || splitPane.when).matches)
      splitPane.classList.toggle('split-pane-visible')
  }

}
