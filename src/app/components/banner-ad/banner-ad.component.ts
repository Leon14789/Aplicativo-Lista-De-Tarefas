import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { AdMob } = Plugins;
@Component({
  selector: 'app-banner-ad',
  templateUrl: './banner-ad.component.html',
  styleUrls: ['./banner-ad.component.scss'],
})
export class BannerAdComponent  implements OnInit {

  constructor() { }

  async ngOnInit() {
    await AdMob['showBanner']({
      adId: 'ca-app-pub-9861532517570088/8378007605',
      position: 'BOTTOM_CENTER',
    });
  }

}
