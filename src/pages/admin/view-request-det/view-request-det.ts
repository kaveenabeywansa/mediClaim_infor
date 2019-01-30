import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import swal from 'sweetalert2';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the ViewRequestDetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-request-det',
  templateUrl: 'view-request-det.html',
})
export class ViewRequestDetPage {

  selectedReqToView;
  current_date;
  formKey;
  userKey;
  oldBalance;
  requestBal;
  userName;
  uEmail;
  oldAcceptedCount = 0;
  oldRejectedCount = 0;
  oldPendingCount = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adf: AngularFireDatabase,
    private emailComposer: EmailComposer) {
    this.selectedReqToView = navParams.get("selectedReqToView");
    var cur_day = new Date().getDate();
    var cur_month = new Date().getMonth() + 1;
    var cur_year = new Date().getFullYear();
    this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
    this.getAllKeys();
  }

  ionViewDidLoad() {
  }

  notifyEmployee(item, state) {
    // notify the employee using an email
    if (state)
      state = 'accepted';
    else
      state = 'rejected';

    let email = {
      to: this.uEmail,
      cc: 'kaveen.abeywansa@infor.com', // Make it some responsible partys' email address later
      subject: 'Your claim request was ' + state + ' !',
      body: 'Hi ' + this.userName
        + ',<br>This is an automated mail sent to notify that your request was ' + state + '<br><br>Thank you',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  acceptRequest() {
    // mark the listing as accepted
    swal({
      title: 'Are you sure?',
      text: "Are you sure you want to accept this request?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        // user confirms action
        // validate if balance is available to claim
        if (this.oldBalance > this.selectedReqToView.amount) {
          // calculate the new balance and counts
          const newBalance = parseInt(this.oldBalance) - parseInt(this.selectedReqToView.amount);
          const newAccepted = this.oldAcceptedCount + 1;
          const newReqBal = parseInt(this.requestBal) - parseInt(this.selectedReqToView.amount);

          // update db
          this.adf.object('/forms/' + this.formKey).update({ status: 'accepted', processDate: this.current_date });
          this.adf.object('/users/' + this.userKey).update({
            balance: newBalance,
            acceptedCount: newAccepted,
            pendingCount: (this.oldPendingCount - 1),
            requestedClaimAmount: newReqBal
          });

          // alert('Request has been accepted !');
          swal({
            type: 'success',
            title: 'Accepted',
            text: 'Request has been accepted'
          });
          this.navCtrl.pop();
          this.notifyEmployee(this.selectedReqToView, true);
        } else {
          swal({
            type: 'error',
            title: 'Failed',
            text: 'Insufficient user balance to claim !'
          });
        }
      }
    })
  }

  rejectRequest() {
    // mark the listing as rejected
    swal({
      title: 'Are you sure?',
      text: "Are you sure you want to reject this request?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        // executed when user confirms action
        // calculations
        const newRejected = this.oldRejectedCount + 1;
        const newReqBal = parseInt(this.requestBal) - parseInt(this.selectedReqToView.amount);

        // update db
        this.adf.object('/forms/' + this.formKey).update({ status: 'rejected', processDate: this.current_date });
        this.adf.object('/users/' + this.userKey).update({
          rejectedCount: newRejected,
          pendingCount: (this.oldPendingCount - 1),
          requestedClaimAmount: newReqBal
        });

        // alert('Request has been rejected !');
        swal({
          type: 'error',
          title: 'Rejected',
          text: 'Request has been rejected !'
        });
        this.navCtrl.pop();
        this.notifyEmployee(this.selectedReqToView, false);
      }
    })
  }

  getAllKeys() {
    var users = this.adf.list('/users', ref => ref.orderByChild('user_id').equalTo(this.selectedReqToView.user_id));
    var forms = this.adf.list('/forms', ref => ref.orderByChild('ClaimNo').equalTo(this.selectedReqToView.ClaimNo));

    users.valueChanges().subscribe(data => {
      this.oldBalance = data[0]['balance'];
      this.requestBal = data[0]['requestedClaimAmount'];
      this.userName = data[0]['name'];
      this.uEmail = data[0]['email'];
      this.oldAcceptedCount = data[0]['acceptedCount'];
      this.oldRejectedCount = data[0]['rejectedCount'];
      this.oldPendingCount = data[0]['pendingCount'];
    });

    forms.snapshotChanges().subscribe(data => {
      this.formKey = data[0].key;
    });

    users.snapshotChanges().subscribe(data => {
      this.userKey = data[0].key;
    });
  }

}
