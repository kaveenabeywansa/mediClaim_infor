import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmailComposer } from '@ionic-native/email-composer';
import swal from 'sweetalert2';

/**
 * Generated class for the ChequesmngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chequesmng',
  templateUrl: 'chequesmng.html',
})
export class ChequesmngPage {

  current_date;
  users;
  forms;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adf: AngularFireDatabase,
    private emailComposer: EmailComposer) {
    this.fetchDataFromFireBase();
    var cur_day = new Date().getDate();
    var cur_month = new Date().getMonth() + 1;
    var cur_year = new Date().getFullYear();
    this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
  }

  ionViewDidLoad() {

  }

  confirmChequeReady(item) {
    // record the cheque as ready if user confirms the prompt

    swal({
      title: 'Are you sure?',
      text: "Are you sure to notify about the cheque is ready?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        // executed when user confirms action
        var emailAdd;
        var Name;

        var users = this.adf.list('/users', ref => ref.orderByChild('user_id').equalTo(item.user_id));
        var forms = this.adf.list('/forms', ref => ref.orderByChild('ClaimNo').equalTo(item.ClaimNo));

        var usrSub1 = users.snapshotChanges().subscribe(uData => {
          var usrSub2 = users.valueChanges().subscribe(uData2 => {
            var frmSub = forms.snapshotChanges().subscribe(fData => {
              this.adf.object('/forms/' + fData[0].key).update({ status: 'ready', readyDate: this.current_date });
              this.adf.object('/users/' + uData[0].key).update
                ({ acceptedCount: (uData2[0]['acceptedCount'] - 1), readyCount: (uData2[0]['readyCount'] + 1) });

              emailAdd = uData2[0]['email'];
              Name = uData2[0]['name'];
              this.notifyEmployee(emailAdd, Name);
              frmSub.unsubscribe();
            })

            usrSub2.unsubscribe();
          })

          usrSub1.unsubscribe();
        })
      }
    })
  }

  notifyEmployee(emailAdd, Name) {
    // notify the employee using an email
    let email = {
      to: emailAdd,
      cc: 'kaveen.abeywansa@infor.com', // Make it some responsible partys' email address later
      subject: 'Your cheque is ready !',
      body: 'Hi ' + Name + ',<br>We are pleased to inform you that your cheque is ready to be collected.<br><br>Thank you',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  fetchDataFromFireBase() {
    // Retrieves data from firebase and stores it in a variable

    // Get list of users
    this.adf.list('/users').valueChanges().subscribe(
      data => {
        this.users = data;
      }
    );

    // Get list of forms
    this.adf.list('/forms').valueChanges().subscribe(
      data => {
        this.forms = data;
      }
    );

  }

}
