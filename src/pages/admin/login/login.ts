import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, ToastController } from 'ionic-angular';
import swal from 'sweetalert2';
import { HomePage } from '../home/home';
import { HomeMngrPage } from '../home-mngr/home-mngr';
import { AngularFireDatabase } from 'angularfire2/database';
import { Network } from '@ionic-native/network';
import { DashboardPage } from '../../client/client_dashboard/dashboard';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  events;
  in_username;
  in_password;

  constructor(public navCtrl: NavController, public navParams: NavParams, events: Events, private afd: AngularFireDatabase,
    private menu: MenuController, private network: Network, public toast: ToastController) {
    this.events = events;
    this.balanceResetter();
    this.checkInternet();
  }

  ionViewDidLoad() {
    this.menu.enable(false);
  }

  checkInternet() {
    if (this.network.type == 'none') {
      this.toast.create({
        message: 'No Internet Connection Detected !',
        duration: 2000
      }).present();
    }
    this.network.onConnect().subscribe(() => {
      this.toast.create({
        message: 'Internet Connected !',
        duration: 2000
      }).present();
    });

    this.network.onDisconnect().subscribe(() => {
      this.toast.create({
        message: 'Internet Disconnected !',
        duration: 2000
      }).present();
    });
  }

  signIn() {
    if (this.in_username != null && this.in_password != null) {
      try {
        // match username against db credentials
        var users = this.afd.list('/users', ref => ref.orderByChild('username').equalTo(this.in_username)).valueChanges().subscribe(user_data => {
          if (user_data.length > 0) {
            // console.log(user_data);
            const db_pwd = user_data[0]['password'];
            if (db_pwd == this.in_password) {
              // correct credentials
              const user_type = user_data[0]['user_type'];
              this.menu.enable(true);
              this.toast.create({
                message: 'Welcome ' + user_data[0]['name'],
                duration: 2000
              }).present();

              // identify user type and redirect
              if (user_type == 'admin') {
                // open admin dashboard
                this.events.publish('user:admin');
                this.navCtrl.setRoot(HomePage);
              } else if (user_type == 'manager') {
                // open manager dashboard
                this.events.publish('user:manager');
                this.navCtrl.setRoot(HomeMngrPage);
              } else if (user_type == 'employee') {
                // open manager dashboard
                sessionStorage.setItem('userId', user_data[0]['user_id']);
                this.events.publish('user:employee');
                this.navCtrl.setRoot(DashboardPage);
              }
            } else {
              // incorrect credentials
              alert('Incorrect credentials ! Please Re-Try !');
            }
          } else {
            alert('Incorrect credentials ! Please Re-Try !');
          }
          users.unsubscribe();
        });

      } catch (error) {
        alert('An Error Occured !');
        console.log(error);
      }
    } else {
      alert('Please enter your username and password !');
    }
  }

  forgotpwd() {
    // not implemented.
    swal({
      type: 'success',
      title: 'Success',
      text: 'Password reset link was sent to your email !'
    });
  }

  balanceResetter() {
    // a function that resets users' balances back to te limit amount every year
    var s1 = this.afd.list('/settings').valueChanges().subscribe(data => {
      if (new Date(data[0] + '').getFullYear() != new Date().getFullYear()) {
        // first app launch of the year. reset user balances to limit
        var s2 = this.afd.list('/users').snapshotChanges().subscribe(actions => {
          actions.forEach(action => {
            this.afd.list('/users').update(action.key, { balance: 7000 });
            this.afd.object('/settings/').update({ current_year: new Date().getFullYear() });
          });
          s2.unsubscribe();
        });
      }
      s1.unsubscribe();
    });
  }

}
