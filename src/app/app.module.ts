import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/admin/home/home';
import { ListPage } from '../pages/admin/list/list';

import { SubmissionPage } from '../pages/admin/submission/submission';
import { ViewRequestDetPage } from '../pages/admin/view-request-det/view-request-det';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DecimalPipe } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { ChequesmngPage } from '../pages/admin/chequesmng/chequesmng';
import { AdminHistoryPage } from '../pages/admin/admin-history/admin-history';
import { TabSubmittedPage } from '../pages/admin/tab-submitted/tab-submitted';
import { TabReleasedPage } from '../pages/admin/tab-released/tab-released';
import { TabAcceptedPage } from '../pages/admin/tab-accepted/tab-accepted';
import { TabRejectedPage } from '../pages/admin/tab-rejected/tab-rejected';
import { ViewHistoryDetPage } from '../pages/admin/view-history-det/view-history-det';
import { ChequecollectedPage } from '../pages/admin/chequecollected/chequecollected';
import { TabReadyPage } from '../pages/admin/tab-ready/tab-ready';
import { EmailComposer } from '@ionic-native/email-composer';
import { LoginPage } from '../pages/admin/login/login';
import { HomeMngrPage } from '../pages/admin/home-mngr/home-mngr';
import { Network } from '@ionic-native/network';
import { IonicImageViewerModule } from 'ionic-img-viewer';


import { PendingclaimsPage } from '../pages/client/pendingclaims/pendingclaims';
import { HistoryPage } from '../pages/client/history/history';
import { DashboardPage } from '../pages/client/client_dashboard/dashboard';
import { PatientdetailsPage } from '../pages/client/patientdetails/patientdetails';
import { FormdetailsPage } from '../pages/client/formdetails/formdetails';
import { Camera } from '@ionic-native/camera';

var config = {
  apiKey: "AIzaSyBRJFbY1J2LEDad9sN6f53wq3Fa9ee9VyM",
  authDomain: "expense-management-e1e6d.firebaseapp.com",
  databaseURL: "https://expense-management-e1e6d.firebaseio.com",
  projectId: "expense-management-e1e6d",
  storageBucket: "expense-management-e1e6d.appspot.com",
  messagingSenderId: "687363091029"
};

@NgModule({
  declarations: [
    PendingclaimsPage,
    HistoryPage,
    DashboardPage,
    PatientdetailsPage,
    FormdetailsPage,
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    SubmissionPage,
    ChequesmngPage,
    AdminHistoryPage,
    TabSubmittedPage,
    TabAcceptedPage,
    TabRejectedPage,
    TabReadyPage,
    TabReleasedPage,
    ViewRequestDetPage,
    ViewHistoryDetPage,
    ChequecollectedPage,
    HomeMngrPage
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    CommonModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PendingclaimsPage,
    HistoryPage,
    DashboardPage,
    PatientdetailsPage,
    FormdetailsPage,
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    SubmissionPage,
    ChequesmngPage,
    AdminHistoryPage,
    TabSubmittedPage,
    TabAcceptedPage,
    TabRejectedPage,
    TabReadyPage,
    TabReleasedPage,
    ViewRequestDetPage,
    ViewHistoryDetPage,
    ChequecollectedPage,
    HomeMngrPage
  ],
  providers: [
    DecimalPipe,
    StatusBar,
    SplashScreen,
    Network,
    EmailComposer,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
