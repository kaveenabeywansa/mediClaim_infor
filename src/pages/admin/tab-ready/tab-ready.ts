import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewHistoryDetPage } from '../view-history-det/view-history-det';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the TabReadyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-ready',
  templateUrl: 'tab-ready.html',
})
export class TabReadyPage {

  users;
  forms;
  temp;
  count;
  formkeys;
  current_date;
  year;
  month;
  user_name;
  s_count;
  s_tot;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adf: AngularFireDatabase) {
    this.fetchDataFromFireBase();
  }

  ionViewDidLoad() {

  }

  getSummary() {
    this.s_count = 0;
    this.s_tot = 0;
    this.forms.forEach(element => {
      if (element['status'] == 'ready') {
        this.s_count++;
        this.s_tot += parseInt(element['amount']);
      }
    });
  }

  applyFilters() {

    if (this.year != null) {
      this.annualFilter();
    }

    if (this.month != null) {
      this.monthlyFilter();
    }

    if (this.user_name != null) {
      this.userFilter();
    }

    this.getSummary();
  }

  annualFilter() {
    var newtemp = [];
    var cnt = 0;
    this.temp.forEach(element => {
      if (new Date(element.readyDate).getFullYear() == this.year) {
        newtemp[cnt] = element;
        cnt++;
      }
    });
    // console.log(newtemp);
    this.forms = newtemp;
  }

  monthlyFilter() {
    var newtemp = [];
    var cnt = 0;
    this.temp.forEach(element => {
      if (new Date(element.readyDate).getFullYear() == new Date(this.month).getFullYear() && new Date(element.readyDate).getMonth() + 1 == new Date(this.month).getMonth() + 1) {
        newtemp[cnt] = element;
        cnt++;
      }
    });
    // console.log(newtemp);
    this.forms = newtemp;
  }

  userFilter() {
    var newtemp = [];
    var cnt = 0;
    this.temp.forEach(element => {
      if (element.user_id == this.user_name) {
        newtemp[cnt] = element;
        cnt++;
        // console.log(element.user_id);
      }
    });
    // console.log(newtemp);
    this.forms = newtemp;
  }

  reMapUsersWithData() {
    for (var i = 0; i < this.count; i++) {
      this.users.forEach(usr => {
        if (usr.user_id == this.forms[i].user_id) {
          this.forms[i].name = usr.name;
        }
      });
    }
  }

  viewRequest(form) {
    this.reMapUsersWithData();
    this.navCtrl.push(ViewHistoryDetPage, { selectedItem: form });
  }

  fetchDataFromFireBase() {
    // Retrieves data from firebase and stores it in a variable

    // Get list of users
    this.adf.list('/users').valueChanges().subscribe(
      data => {
        this.users = data;
        // console.log(this.users);
      }
    );

    // Get list of forms
    this.adf.list('/forms').valueChanges().subscribe(
      data => {
        this.forms = data;
        // console.log(this.forms);

        this.temp = data;
        this.count = data.length;
      }
    );

    // Get the keys for the forms
    this.adf.list('/forms').snapshotChanges().subscribe(
      data => {
        this.formkeys = data;
        // console.log(this.formkeys);
        this.getSummary();
      }
    );

  }

}
