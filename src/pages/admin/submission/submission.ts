import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewRequestDetPage } from '../view-request-det/view-request-det';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SubmissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submission',
  templateUrl: 'submission.html',
})
export class SubmissionPage {

  users;
  forms;
  temp;
  count;
  formkeys;
  current_date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adf: AngularFireDatabase) {
    this.fetchDataFromFireBase();
    var cur_day = new Date().getDate();
    var cur_month = new Date().getMonth() + 1;
    var cur_year = new Date().getFullYear();
    this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
  }

  ionViewDidLoad() {

  }

  reMapDataWithKeys() {
    // loop through to map the keys
    for (var i = 0; i < this.count; i++) {
      this.temp[i].key = this.formkeys[i].key;
    }
  }

  reMapUsersWithData() {

    for (var i = 0; i < this.count; i++) {
      this.users.forEach(usr => {
        if (usr.user_id == this.temp[i].user_id) {
          this.temp[i].name = usr.name;
          this.temp[i].email = usr.email;
        }
      });
    }
  }

  viewRequest(item) {
    // go to view request in detail page

    this.reMapDataWithKeys();
    this.reMapUsersWithData();

    this.navCtrl.push(ViewRequestDetPage, { selectedReqToView: item });
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
      }
    );

  }
}
