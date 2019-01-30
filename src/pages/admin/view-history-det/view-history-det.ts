import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewHistoryDetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-history-det',
  templateUrl: 'view-history-det.html',
})
export class ViewHistoryDetPage {

  selectedItem;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('selectedItem');
  }

  ionViewDidLoad() {

  }

}
