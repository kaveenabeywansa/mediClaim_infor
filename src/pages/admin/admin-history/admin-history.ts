import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabReleasedPage } from '../tab-released/tab-released';
import { TabSubmittedPage } from '../tab-submitted/tab-submitted';
import { TabAcceptedPage } from '../tab-accepted/tab-accepted';
import { TabRejectedPage } from '../tab-rejected/tab-rejected';
import { TabReadyPage } from '../tab-ready/tab-ready';

@IonicPage()
@Component({
  selector: 'page-admin-history',
  templateUrl: 'admin-history.html',
  template: `<ion-tabs>
  <ion-tab tabIcon="cloud-download" tabTitle="Submitted" [root]="tabSub" ></ion-tab>
  <ion-tab tabIcon="checkmark-circle" tabTitle="Accepted" [root]="tabAcp" ></ion-tab>
  <ion-tab tabIcon="close-circle" tabTitle="Rejected" [root]="tabRej" ></ion-tab>
  <ion-tab tabIcon="alarm" tabTitle="Ready" [root]="tabRdy" ></ion-tab>
  <ion-tab tabIcon="cash" tabTitle="Released" [root]="tabRel" ></ion-tab>
/ion-tabs>`

})
export class AdminHistoryPage {

  tabSub: any;
  tabRdy: any;
  tabRel: any;
  tabAcp: any;
  tabRej: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabSub = TabSubmittedPage;
    this.tabRdy = TabReadyPage;
    this.tabRel = TabReleasedPage;
    this.tabAcp = TabAcceptedPage;
    this.tabRej = TabRejectedPage;
  }


  ionViewDidLoad() {

  }

}
