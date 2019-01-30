import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/admin/home/home';
import { SubmissionPage } from '../pages/admin/submission/submission';
import { ChequesmngPage } from '../pages/admin/chequesmng/chequesmng';
import { AdminHistoryPage } from '../pages/admin/admin-history/admin-history';
import { ChequecollectedPage } from '../pages/admin/chequecollected/chequecollected';
import { LoginPage } from '../pages/admin/login/login';
import { HomeMngrPage } from '../pages/admin/home-mngr/home-mngr';

import { PendingclaimsPage } from '../pages/client/pendingclaims/pendingclaims';
import { HistoryPage } from '../pages/client/history/history';
import { DashboardPage } from '../pages/client/client_dashboard/dashboard';
import { PatientdetailsPage } from '../pages/client/patientdetails/patientdetails';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  toastCtrl;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    events: Events, toastCtrl: ToastController) {
    this.toastCtrl = toastCtrl;
    this.initializeApp();

    let rootScope = {
      backButtonPressedOnceToExit: false
    };
    this.platform.registerBackButtonAction(() => {
      if (rootScope['backButtonPressedOnceToExit']) {
        this.platform.exitApp();
      }
      else {
        rootScope['backButtonPressedOnceToExit'] = true;
        this.toastCtrl.create({
          message: "Press back button again to exit",
          duration: 2000
        }).present();
        setTimeout(() => {
          rootScope['backButtonPressedOnceToExit'] = false;
        }, 2000);
      }
      return false;
    }, 101);

    // used for an example of ngFor and navigation
    this.pages = [];

    events.subscribe('user:admin', () => {
      this.pages = [
        { title: 'Dashboard', component: HomePage },
        // { title: 'List', component: ListPage },
        { title: 'Pending Submissions', component: SubmissionPage },
        { title: 'Cheque Ready Queue', component: ChequesmngPage },
        { title: 'Collected Cheques', component: ChequecollectedPage },
        { title: 'History', component: AdminHistoryPage }
      ];
    });

    events.subscribe('user:manager', () => {
      this.pages = [
        { title: 'Dashboard', component: HomeMngrPage },
        { title: 'History', component: AdminHistoryPage }
      ];
    });

    events.subscribe('user:employee', () => {
      this.pages = [{ title: 'Dashboard', component: DashboardPage },
      { title: 'New Request', component: PatientdetailsPage },
      { title: 'Pending Claims', component: PendingclaimsPage },
      { title: 'History', component: HistoryPage }
      ];
    });

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.nav.setRoot(LoginPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
