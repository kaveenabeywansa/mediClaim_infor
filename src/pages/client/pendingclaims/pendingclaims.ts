import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormdetailsPage } from '../formdetails/formdetails';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the PendingclaimsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pendingclaims',
  templateUrl: 'pendingclaims.html',
})
export class PendingclaimsPage {
  forms;
  temp;
  users;
  count;
  pendingCount
  formkeys;
  requestedClaimAmount
  userIdNo;
  constructor(private alertCtrl: AlertController, public fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.userIdNo = sessionStorage.getItem('userId');
    this.fetchDataFromForms();
    
    
    this.fdb.list('/users', ref => ref.orderByChild('user_id').equalTo(this.userIdNo)).valueChanges().subscribe(
      userData => {

        
        this.requestedClaimAmount = userData[0]['requestedClaimAmount'];
        this.pendingCount = userData[0]['pendingCount']
        
      }
    );
  }

  

  //join the key with the prior form object
  reMapDataWithKeys() {

    for (var i = 0; i < this.count; i++) {
      this.temp[i].key = this.formkeys[i].key;
    }
  }
  fetchDataFromForms() {
    this.fdb.list('/users').valueChanges().subscribe(
      data => {
        this.users = data;
       
      }
    );

    this.fdb.list('/forms').valueChanges().subscribe(
      data => {
        this.forms = data;

        this.temp = data;
        this.count = data.length;
      }
    );
    this.fdb.list('/forms').snapshotChanges().subscribe(
      data => {
        this.formkeys = data;
        

      }
    );


  }


  //delete submitted claim
  deleteDetails(item) {

    console.log(item);

    let alert = this.alertCtrl.create({
      title: 'Delete Request',
      message: 'Do you want to delete your claim',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          role: 'Yes',
          handler: () => {
            this.reMapDataWithKeys();
            var updateCount = this.fdb.list('/users', ref => ref.orderByChild('user_id').equalTo(this.userIdNo)).snapshotChanges().subscribe(data => {

              this.fdb.object('/users/' + data[0].key).update({ pendingCount: this.pendingCount - 1, requestedClaimAmount: this.requestedClaimAmount - item.amount });
              updateCount.unsubscribe();
            })
            item.employeefile.forEach(element => {
              console.log(element);
              firebase.storage().refFromURL(element).delete();
            });
            this.fdb.object('/forms/' + item.key).remove();
          }
        }

      ]
    });
    alert.present();
  }



  //view requested claim
  viewDetails(form) {
    this.navCtrl.push(FormdetailsPage, { formdetails: form });
  }

}
