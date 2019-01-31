import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { SubmissionPage } from '../submission/submission';
import { ChequesmngPage } from '../chequesmng/chequesmng';
import { ChequecollectedPage } from '../chequecollected/chequecollected';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  badgeSubCount = 0;
  badgeChqCount = 0;
  badgeColCount = 0;
  changeColorSub = false;
  changeColorChq = false;
  changeColorCol = false;
  forms;
  loggedUserName;

  constructor(public navCtrl: NavController, public adf: AngularFireDatabase, private platform: Platform) {
  }

  ionViewDidLoad() {


  }
  ionViewDidEnter() {
    this.fetchDataFromFireBase();
    this.generateCharts();
    this.loggedUserName = sessionStorage.getItem('username'); 
    // this.navCtrl.resize();
  }

  generateCharts() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Submissions', this.badgeSubCount],
      ['Wait Queue', this.badgeChqCount],
      ['Collectibles', this.badgeColCount]
    ]);

    var options = {
      pieHole: 0.4,
      'width': this.platform.width()
    };

    try {
      var chart = new google.visualization.PieChart(document.getElementById('adminDashCharts'));
      chart.draw(data, options);
    } catch (e) {

    }

  }

  goToPage(page) {
    if (page == 'submissions') {
      this.navCtrl.push(SubmissionPage);
    } else if (page == 'cheques') {
      this.navCtrl.push(ChequesmngPage);
    } else if (page == 'collect')
      this.navCtrl.push(ChequecollectedPage);
  }

  fetchDataFromFireBase() {
    // Retrieves data from firebase and stores it in a variable

    // Get list of forms
    this.adf.list('/forms').valueChanges().subscribe(data => {
      this.badgeSubCount = 0;
      this.badgeChqCount = 0;
      this.badgeColCount = 0;
      this.changeColorSub = false;
      this.changeColorChq = false;
      this.changeColorCol = false;
      this.forms = data;
      this.forms.forEach(element => {
        if (element.status == 'submitted') {
          this.badgeSubCount++;
          this.changeColorSub = true;
        } else if (element.status == 'accepted') {
          this.badgeChqCount++;
          this.changeColorChq = true
        } else if (element.status == 'ready') {
          this.badgeColCount++;
          this.changeColorCol = true;
        }
      });
      this.generateCharts();
    }
    );

  }

}
