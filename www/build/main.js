webpackJsonp([18],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChequecollectedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChequecollectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChequecollectedPage = /** @class */ (function () {
    function ChequecollectedPage(navCtrl, navParams, adf, emailComposer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.emailComposer = emailComposer;
        this.fetchDataFromFireBase();
        var cur_day = new Date().getDate();
        var cur_month = new Date().getMonth() + 1;
        var cur_year = new Date().getFullYear();
        this.current_date = cur_year + '-' + cur_month + '-' + cur_day; // stores the current date
    }
    ChequecollectedPage.prototype.ionViewDidLoad = function () {
    };
    ChequecollectedPage.prototype.confirmChequeReady = function (item) {
        // marks the listing as collected if user confirms the prompt
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
            title: 'Are you sure?',
            text: "Are you sure the cheque is collected?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                // executed when user confirms action
                var users = _this.adf.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(item.user_id); });
                var forms = _this.adf.list('/forms', function (ref) { return ref.orderByChild('ClaimNo').equalTo(item.ClaimNo); });
                var usrSub1 = users.snapshotChanges().subscribe(function (uData) {
                    var usrSub2 = users.valueChanges().subscribe(function (uData2) {
                        var frmSub = forms.snapshotChanges().subscribe(function (fData) {
                            _this.adf.object('/forms/' + fData[0].key).update({ status: 'released', releaseDate: _this.current_date });
                            _this.adf.object('/users/' + uData[0].key).update({ readyCount: (uData2[0]['readyCount'] - 1), releaseCount: (uData2[0]['releaseCount'] + 1) });
                            _this.notifyEmployee(uData2[0]['email'], uData2[0]['name']);
                            frmSub.unsubscribe();
                        });
                        usrSub2.unsubscribe();
                    });
                    usrSub1.unsubscribe();
                });
            }
        });
    };
    ChequecollectedPage.prototype.notifyEmployee = function (emailAdd, Name) {
        // notify the employee using an email
        var email = {
            to: emailAdd,
            cc: 'kaveen.abeywansa@infor.com',
            subject: 'Your cheque was collected !',
            body: 'Hi ' + Name + ',<br>This is an automated mail sent to notify that you collected your cheque.<br><br>Thank you',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    ChequecollectedPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
        });
    };
    ChequecollectedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chequecollected',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/chequecollected/chequecollected.html"*/'<ion-header>\n\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Collected Cheques</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <!-- <h2>Action Needed !</h2> -->\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'ready\'">\n        <ion-item>\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <h4>Accepted on {{ form.processDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n        </ion-item>\n\n        <ion-item-options side="right">\n          <button ion-button color="secondary" (click)="confirmChequeReady(form)">Cheque Collected</button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="confirmChequeReady(form)">Cheque Collected</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <div class="swipe_ins">(Swipe to view options)</div>\n</ion-footer>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/chequecollected/chequecollected.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */]])
    ], ChequecollectedPage);
    return ChequecollectedPage;
}());

//# sourceMappingURL=chequecollected.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChequesmngPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChequesmngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChequesmngPage = /** @class */ (function () {
    function ChequesmngPage(navCtrl, navParams, adf, emailComposer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.emailComposer = emailComposer;
        this.fetchDataFromFireBase();
        var cur_day = new Date().getDate();
        var cur_month = new Date().getMonth() + 1;
        var cur_year = new Date().getFullYear();
        this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
    }
    ChequesmngPage.prototype.ionViewDidLoad = function () {
    };
    ChequesmngPage.prototype.confirmChequeReady = function (item) {
        // record the cheque as ready if user confirms the prompt
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            title: 'Are you sure?',
            text: "Are you sure to notify about the cheque is ready?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                // executed when user confirms action
                var emailAdd;
                var Name;
                var users = _this.adf.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(item.user_id); });
                var forms = _this.adf.list('/forms', function (ref) { return ref.orderByChild('ClaimNo').equalTo(item.ClaimNo); });
                var usrSub1 = users.snapshotChanges().subscribe(function (uData) {
                    var usrSub2 = users.valueChanges().subscribe(function (uData2) {
                        var frmSub = forms.snapshotChanges().subscribe(function (fData) {
                            _this.adf.object('/forms/' + fData[0].key).update({ status: 'ready', readyDate: _this.current_date });
                            _this.adf.object('/users/' + uData[0].key).update({ acceptedCount: (uData2[0]['acceptedCount'] - 1), readyCount: (uData2[0]['readyCount'] + 1) });
                            emailAdd = uData2[0]['email'];
                            Name = uData2[0]['name'];
                            _this.notifyEmployee(emailAdd, Name);
                            frmSub.unsubscribe();
                        });
                        usrSub2.unsubscribe();
                    });
                    usrSub1.unsubscribe();
                });
            }
        });
    };
    ChequesmngPage.prototype.notifyEmployee = function (emailAdd, Name) {
        // notify the employee using an email
        var email = {
            to: emailAdd,
            cc: 'kaveen.abeywansa@infor.com',
            subject: 'Your cheque is ready !',
            body: 'Hi ' + Name + ',<br>We are pleased to inform you that your cheque is ready to be collected.<br><br>Thank you',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    ChequesmngPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
        });
    };
    ChequesmngPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chequesmng',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/chequesmng/chequesmng.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cheques Ready Queue</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'accepted\'">\n        <ion-item>\n          <!-- <ion-avatar item-start>\n              <img src="/assets/imgs/avatar.png">\n            </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <h4>Accepted on {{ form.processDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button color="secondary" (click)="confirmChequeReady(form)">Cheque Ready</button>\n        </ion-item-options>\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="confirmChequeReady(form)">Cheque Ready</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <div class="swipe_ins">(Swipe to view options)</div>\n</ion-footer>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/chequesmng/chequesmng.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */]])
    ], ChequesmngPage);
    return ChequesmngPage;
}());

//# sourceMappingURL=chequesmng.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeMngrPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeMngrPage = /** @class */ (function () {
    function HomeMngrPage(navCtrl, navParams, adf, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.platform = platform;
        this.subCount = 1;
        this.accCount = 1;
        this.rejCount = 1;
        this.chRdyCount = 1;
        this.clmdCount = 1;
        this.annual_subCount = 1;
        this.annual_accCount = 1;
        this.annual_rejCount = 1;
        this.annual_chRdyCount = 1;
        this.annual_clmdCount = 1;
        this.fetchDataFromFireBase();
        this.loggedUserName = sessionStorage.getItem('username');
    }
    HomeMngrPage.prototype.ionViewDidLoad = function () {
        this.showChart();
    };
    HomeMngrPage.prototype.showChart = function () {
        // Generate charts for both overall and annual
        // get data for both charts
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Status');
        data.addColumn('number', 'Count');
        data.addRows([
            ['Not Reviewed', this.subCount],
            ['Accepted', this.accCount],
            ['Rejected', this.rejCount],
            ['Cheque Ready', this.chRdyCount],
            ['Claimed', this.clmdCount]
        ]);
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'Status');
        data2.addColumn('number', 'Count');
        data2.addRows([
            ['Not Reviewed', this.annual_subCount],
            ['Accepted', this.annual_accCount],
            ['Rejected', this.annual_rejCount],
            ['Cheque Ready', this.annual_chRdyCount],
            ['Claimed', this.annual_clmdCount]
        ]);
        // options for the charts
        var options = {
            'title': 'Claim Statistics - Overall',
            'width': this.platform.width(),
            is3D: true,
        };
        var options2 = {
            'title': 'Claim Statistics - Annual',
            'width': this.platform.width(),
            is3D: true,
        };
        // instantiate and draw the charts
        var chart = new google.visualization.PieChart(document.getElementById('overall_stats'));
        chart.draw(data, options);
        var chart2 = new google.visualization.PieChart(document.getElementById('annual_stats'));
        chart2.draw(data2, options2);
    };
    HomeMngrPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            // set chart data to zero at first
            _this.forms = data;
            _this.subCount = 0;
            _this.accCount = 0;
            _this.rejCount = 0;
            _this.chRdyCount = 0;
            _this.clmdCount = 0;
            _this.annual_subCount = 0;
            _this.annual_accCount = 0;
            _this.annual_rejCount = 0;
            _this.annual_chRdyCount = 0;
            _this.annual_clmdCount = 0;
            // loop through the forms and get the count of all statuses
            data.forEach(function (element) {
                if (element['status'] == 'submitted') {
                    _this.subCount++;
                    if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
                        _this.annual_subCount++;
                    }
                }
                else if (element['status'] == 'accepted') {
                    _this.accCount++;
                    if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
                        _this.annual_accCount++;
                    }
                }
                else if (element['status'] == 'rejected') {
                    _this.rejCount++;
                    if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
                        _this.annual_rejCount++;
                    }
                }
                else if (element['status'] == 'ready') {
                    _this.chRdyCount++;
                    if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
                        _this.annual_chRdyCount++;
                    }
                }
                else if (element['status'] == 'released') {
                    _this.clmdCount++;
                    if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
                        _this.annual_clmdCount++;
                    }
                }
            });
            // regenerate the charts for new data
            _this.showChart();
        });
    };
    HomeMngrPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home-mngr',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/home-mngr/home-mngr.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Dashboard</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class=\'home_logo\'>\n    <img src="/assets/imgs/infor.png" height=40% width=40%>\n  </div>\n  <div class="centerAlign">\n    <h2>Infor Medi Claim - Manager</h2>\n  </div>\n  <div class="centerAlign">\n    <h3>Welcome {{ loggedUserName }} !</h3>\n  </div>\n\n  <div>\n    <div id="overall_stats"></div>\n    <div id="annual_stats"></div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/home-mngr/home-mngr.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]) === "function" && _d || Object])
    ], HomeMngrPage);
    return HomeMngrPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home-mngr.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmissionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_request_det_view_request_det__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SubmissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SubmissionPage = /** @class */ (function () {
    function SubmissionPage(navCtrl, navParams, adf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.fetchDataFromFireBase();
        var cur_day = new Date().getDate();
        var cur_month = new Date().getMonth() + 1;
        var cur_year = new Date().getFullYear();
        this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
    }
    SubmissionPage.prototype.ionViewDidLoad = function () {
    };
    SubmissionPage.prototype.reMapDataWithKeys = function () {
        // loop through to map the keys
        for (var i = 0; i < this.count; i++) {
            this.temp[i].key = this.formkeys[i].key;
        }
    };
    SubmissionPage.prototype.reMapUsersWithData = function () {
        var _this = this;
        for (var i = 0; i < this.count; i++) {
            this.users.forEach(function (usr) {
                if (usr.user_id == _this.temp[i].user_id) {
                    _this.temp[i].name = usr.name;
                    _this.temp[i].email = usr.email;
                }
            });
        }
    };
    SubmissionPage.prototype.viewRequest = function (item) {
        // go to view request in detail page
        this.reMapDataWithKeys();
        this.reMapUsersWithData();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__view_request_det_view_request_det__["a" /* ViewRequestDetPage */], { selectedReqToView: item });
    };
    SubmissionPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
            // console.log(this.users);
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            // console.log(this.forms);
            _this.temp = data;
            _this.count = data.length;
        });
        // Get the keys for the forms
        this.adf.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
            // console.log(this.formkeys);
        });
    };
    SubmissionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-submission',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/submission/submission.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Pending Submissions</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'submitted\'">\n        <ion-item>\n          <!-- <ion-avatar item-start> -->\n          <!-- <ion-icon name="alert"></ion-icon> -->\n          <!-- </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button (click)="viewRequest(form)">View Details</button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button (click)="viewRequest(form)">View Details</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <div class="swipe_ins">(Swipe to view options)</div>\n</ion-footer>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/submission/submission.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"]])
    ], SubmissionPage);
    return SubmissionPage;
}());

//# sourceMappingURL=submission.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__patientdetails_patientdetails__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardPage = /** @class */ (function () {
    function DashboardPage(decimalPipe, fdb, navCtrl, navParams) {
        this.decimalPipe = decimalPipe;
        this.fdb = fdb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.releaseTodayAmount = 0;
        this.releasedAmount = 0;
        this.accpetedAmount = 0;
        this.rejectedAmount = 0;
        this.submittedAmount = 0;
        this.readyAmount = 0;
        this.formsAvailable = false;
        this.submittedCount = 0;
        this.releaseCount = 0;
        this.acceptedCount = 0;
        this.rejectedCount = 0;
        this.readyCount = 0;
        //retrieve data of useres
        var cur_day = new Date().getDate();
        var cur_month = new Date().getMonth() + 1;
        var cur_year = new Date().getFullYear();
        this.reqDate = cur_year + '-' + cur_month + '-' + cur_day;
        this.dateType = "today";
        console.log("today" + this.reqDate);
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        this.userIdNo = sessionStorage.getItem('userId');
        this.retreiveTodayData();
        this.fetchDataFromUsers();
    };
    //retrieve the current user details
    DashboardPage.prototype.fetchDataFromUsers = function () {
        var _this = this;
        this.fdb.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).valueChanges().subscribe(function (userData) {
            _this.currentUser = userData[0];
            console.log(userData);
            _this.name = _this.currentUser.name;
            _this.limit = _this.currentUser.limit;
            _this.balance = _this.currentUser.balance;
            _this.requestedClaimAmount = _this.currentUser.requestedClaimAmount;
            _this.drawChart();
        });
    };
    DashboardPage.prototype.drawChart = function () {
        var data = google.visualization.arrayToDataTable([
            ["Claim Type", "", { role: "style" }],
            ["Claim limit", this.limit, "#FF0000"],
            ["Available balance", this.balance, "#0000FF"],
            ["Requested claim amount", this.requestedClaimAmount, "#008000"],
        ]);
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2]);
        var options = {
            chartArea: { left: "20%" },
            height: 300,
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
        chart.draw(view, options);
    };
    DashboardPage.prototype.drawTable = function (submittedCount, submittedAmount, readyCount, readyAmount, releaseCount, accpetedCount, rejectedCount, releasedAmount, accpetedAmount, rejectedAmount) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Type');
        data.addColumn('string', 'Amount');
        data.addColumn('string', 'Number of Request');
        data.addRows([
            ['Claimed', "LKR " + this.decimalPipe.transform(releasedAmount, '1.2-2').toString(), releaseCount.toString()],
            ['ready', "LKR " + this.decimalPipe.transform(readyAmount, '1.2-2').toString(), readyCount.toString()],
            ['accepted', "LKR " + this.decimalPipe.transform(accpetedAmount, '1.2-2').toString(), accpetedCount.toString()],
            ['Submitted', "LKR " + this.decimalPipe.transform(submittedAmount, '1.2-2').toString(), submittedCount.toString()],
            ['Rejected', "LKR " + this.decimalPipe.transform(rejectedAmount, '1.2-2').toString(), rejectedCount.toString()],
        ]);
        this.table = new google.visualization.Table(document.getElementById('table_div'));
        this.table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
    };
    DashboardPage.prototype.retreiveMonthData = function () {
        var _this = this;
        this.fdb.list('/forms', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).valueChanges().subscribe(function (userData) {
            _this.resetUserDate();
            userData.forEach(function (element) {
                if (new Date(element['requestDate']).getMonth() == new Date().getMonth()) {
                    _this.formsAvailable = true;
                    _this.retrieveData(element['status'], element['amount']);
                }
            });
            if (!_this.formsAvailable) {
                _this.tableEmpty = true;
            }
        });
    };
    DashboardPage.prototype.retreiveTodayData = function () {
        var _this = this;
        this.fdb.list('/forms', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).valueChanges().subscribe(function (userData) {
            _this.resetUserDate();
            userData.forEach(function (element) {
                if (element['requestDate'] == _this.reqDate.toString()) {
                    _this.formsAvailable = true;
                    _this.retrieveData(element['status'], element['amount']);
                }
            });
            if (!_this.formsAvailable) {
                _this.tableEmpty = true;
            }
        });
    };
    DashboardPage.prototype.retreiveYearData = function () {
        var _this = this;
        this.fdb.list('/forms', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).valueChanges().subscribe(function (userData) {
            _this.resetUserDate();
            userData.forEach(function (element) {
                if (new Date(element['requestDate']).getFullYear() == new Date().getFullYear()) {
                    _this.formsAvailable = true;
                    _this.retrieveData(element['status'], element['amount']);
                }
            });
            if (!_this.formsAvailable) {
                _this.tableEmpty = true;
            }
        });
    };
    DashboardPage.prototype.segmentChanged = function (type) {
        this.resetUserDate();
        if (this.table) {
            this.table.clearChart();
        }
        console.log(type);
        if (type.value == "month") {
            this.retreiveMonthData();
        }
        if (type.value == "today") {
            this.retreiveTodayData();
        }
        if (type.value == "year") {
            this.retreiveYearData();
        }
    };
    DashboardPage.prototype.resetUserDate = function () {
        this.releasedAmount = 0;
        this.accpetedAmount = 0;
        this.rejectedAmount = 0;
        this.submittedAmount = 0;
        this.readyAmount = 0;
        this.tableEmpty = false;
        this.submittedCount = 0;
        this.releaseCount = 0;
        this.acceptedCount = 0;
        this.rejectedCount = 0;
        this.readyCount = 0;
    };
    DashboardPage.prototype.retrieveData = function (elementStatus, elementAmount) {
        if (elementStatus == "released") {
            this.releaseCount = this.releaseCount + 1;
            this.releasedAmount = this.releasedAmount + parseFloat(elementAmount);
            // console.log("amount" + this.releasedMonthAmount);
        }
        if (elementStatus == "accepted") {
            this.acceptedCount = this.acceptedCount + 1;
            this.accpetedAmount = this.accpetedAmount + parseFloat(elementAmount);
        }
        if (elementStatus == "rejected") {
            this.rejectedCount = this.rejectedCount + 1;
            this.rejectedAmount = this.rejectedAmount + parseFloat(elementAmount);
        }
        if (elementStatus == "submitted") {
            this.submittedCount = this.submittedCount + 1;
            this.submittedAmount = this.submittedAmount + parseFloat(elementAmount);
        }
        if (elementStatus == "ready") {
            this.readyCount = this.readyCount + 1;
            this.readyAmount = this.readyAmount + parseFloat(elementAmount);
        }
        this.drawTable(this.submittedCount, this.submittedAmount, this.readyCount, this.readyAmount, this.releaseCount, this.acceptedCount, this.rejectedCount, this.releasedAmount, this.accpetedAmount, this.rejectedAmount);
    };
    DashboardPage.prototype.newRequestClicked = function () {
        var _this = this;
        var currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__patientdetails_patientdetails__["a" /* PatientdetailsPage */]).then(function () {
            _this.navCtrl.remove(currentIndex);
        });
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/client_dashboard/dashboard.html"*/'<ion-header>\n  <ion-toolbar color="dark">\n    <button ion-button menuToggle left>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title class="title-style">Dashboard</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content class="background">\n\n  <br>\n  <div class="textcolor">\n    Welcome {{name}}\n  </div>\n  <br>\n\n  <ion-card>\n    <ion-card-header>\n      Claim Balance Summary\n    </ion-card-header>\n    <ion-card-content>\n      <ion-item id="barchart_values">\n\n      </ion-item>\n      <br>\n      <br>\n      <ion-row>\n        <ion-col>\n          <ion-fab right bottom>\n            <button (click)="newRequestClicked()" ion-fab>\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-fab>\n        </ion-col>\n      </ion-row>\n\n\n    </ion-card-content>\n  </ion-card>\n\n\n\n  <ion-card>\n\n    <ion-card-header>\n      Claim Summary\n    </ion-card-header>\n\n    <ion-card-content>\n      <ion-segment [(ngModel)]="dateType" color="primary" (ionChange)="segmentChanged($event)">\n        <ion-segment-button value="today">\n          Today\n        </ion-segment-button>\n        <ion-segment-button value="month">\n          This Month\n        </ion-segment-button>\n        <ion-segment-button value="year">\n          This Year\n        </ion-segment-button>\n      </ion-segment>\n    </ion-card-content>\n\n\n    <p id="form_available" *ngIf="tableEmpty" style="text-align:center">No Request Available</p>\n\n    <ion-item id="table_div">\n\n    </ion-item>\n\n  </ion-card>\n\n\n  <div>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/client_dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DecimalPipe */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var PatientdetailsPage = /** @class */ (function () {
    function PatientdetailsPage(loadingCtrl, alertCtrl, fdb, camera, navCtrl, navParams) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.fdb = fdb;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.receiptCountValidation = 0;
        this.employeefile = [];
        this.receiptCount = 0;
        this.maxDate = new Date().toISOString();
        this.buttonClicked = false;
        //current date/month/year
        var cur_day = new Date().getDate();
        var cur_month = new Date().getMonth() + 1;
        var cur_year = new Date().getFullYear();
        this.requestDate = cur_year + '-' + cur_month + '-' + cur_day;
        //get user id from session storage
        this.userIdNo = sessionStorage.getItem('userId');
        this.uploadButtonHide = true;
        //retrieve data from using users tabel using user id
        this.fdb.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).valueChanges().subscribe(function (userData) {
            _this.NameOfEmployee = userData[0]['name'];
            _this.requestedClaimAmount = userData[0]['requestedClaimAmount'];
            _this.designation = userData[0]['designation'];
            _this.EpfNo = userData[0]['epf_no'];
            _this.availableBalance = userData[0]['balance'];
            _this.pendingCount = userData[0]['pendingCount'];
            _this.claimNo = userData[0]['pendingCount'] + userData[0]['readyCount'] + userData[0]['rejectedCount']
                + userData[0]['acceptedCount'] + userData[0]['releaseCount'];
            var remainingClaimBalance = _this.availableBalance - _this.requestedClaimAmount;
            document.getElementById("validate_balance").innerHTML = "Maximum claimable amount " + remainingClaimBalance.toString();
        });
    }
    PatientdetailsPage_1 = PatientdetailsPage;
    //upload receipt
    PatientdetailsPage.prototype.takePhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options, result, image_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ReceiptNo) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        image_1 = "data:image/jpeg;base64," + result;
                        this.loader = this.loadingCtrl.create({
                            content: "Uploading Reciept",
                        });
                        this.loader.present().then(function () {
                            var pictures = Object(__WEBPACK_IMPORTED_MODULE_2_firebase__["storage"])().ref(_this.userIdNo + "/" + ((parseInt(_this.claimNo) + 1))).child(_this.userIdNo + "-" + (_this.claimNo + 1) + "-" + _this.receiptCount);
                            pictures.putString(image_1, 'data_url').then(function (data) {
                                _this.receiptCountValidation += 1;
                                //get receipt url to upload it with forms
                                _this.getPhotoUrl();
                            });
                        });
                        this.uploadButtonClicked = true;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        alert("theradfdf" + e_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.showAlert();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //validate requested claim 
    PatientdetailsPage.prototype.submitButtonClicked = function () {
        var _this = this;
        if (this.nameofpatient && this.patientrelationship && this.nameofdoctor
            && this.dateofExpen && this.ReceiptNo &&
            this.amountofExpen && this.natureofillness && this.requestDate && this.claimMonth &&
            this.NameOfEmployee && this.designation && this.EpfNo &&
            this.receiptCountValidation > 0 && this.employeefile && (this.availableBalance - this.requestedClaimAmount) >= this.amountofExpen) {
            var alert_1 = this.alertCtrl.create({
                title: 'Confirm Submission',
                message: 'Do you want to submit your claim',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                        }
                    },
                    {
                        text: 'Confirm',
                        handler: function () {
                            _this.callConfirmRequest();
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else if ((this.availableBalance - this.requestedClaimAmount) < this.amountofExpen) {
            this.showExceedAmountAlert();
        }
        else {
            this.showAlert();
        }
    };
    //claimable amount exceed
    PatientdetailsPage.prototype.showExceedAmountAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Amount of Expenditure Exceed claimable amount',
            subTitle: 'You cannot claim higher than the claimable amount',
            buttons: ['OK']
        });
        alert.present();
    };
    // upload requested cliam to the firebase
    PatientdetailsPage.prototype.callConfirmRequest = function () {
        var _this = this;
        this.fdb.list("/forms/").push({
            "patientName": this.nameofpatient,
            "relationship": this.patientrelationship,
            "nameDoctor": this.nameofdoctor,
            "dateofExpenditure": this.dateofExpen,
            "recieptNo": this.ReceiptNo,
            "amount": this.amountofExpen,
            "NatureIllness": this.natureofillness,
            "status": "submitted",
            "employeefile": this.employeefile,
            "requestDate": this.requestDate,
            "claimMonth": this.claimMonth,
            "NameOfEmployee": this.NameOfEmployee,
            "Designation": this.designation,
            "EpfNo": this.EpfNo,
            "user_id": this.userIdNo,
            "ClaimNo": this.userIdNo + "-" + this.claimNo
        });
        var finalRequestedClaimAmount = parseFloat(this.requestedClaimAmount) + parseFloat(this.amountofExpen);
        var updateCount = this.fdb.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).snapshotChanges().subscribe(function (data) {
            _this.fdb.object('/users/' + data[0].key).update({ pendingCount: _this.pendingCount + 1, requestedClaimAmount: finalRequestedClaimAmount });
            updateCount.unsubscribe();
        });
        var remainingClaimBalance = this.availableBalance - this.requestedClaimAmount;
        document.getElementById("validate_balance").innerHTML = "Maximum claimable amount " + remainingClaimBalance.toString();
        // let currentIndex = this.navCtrl.getActive().index;
        // this.navCtrl.push(PatientdetailsPage).then(() => {
        //   this.navCtrl.remove(currentIndex);
        // });
        alert("Your request was sumbitted");
        this.navCtrl.setRoot(PatientdetailsPage_1);
    };
    //get receipt url
    PatientdetailsPage.prototype.getPhotoUrl = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_firebase__["storage"]().ref(this.userIdNo + "/" + (parseInt(this.claimNo) + 1)).child(this.userIdNo + "-" + (this.claimNo + 1) + "-" + this.receiptCount).getDownloadURL()
            .then(function (url) {
            _this.employeefile[_this.receiptCount] = url;
            _this.loader.dismiss().then(function () {
                // this.ReceiptUploaded = true;
                _this.receiptCount = _this.receiptCount + 1;
                _this.receiptDatabaseNumber = _this.userIdNo + "-" + (_this.claimNo + 1) + "-" + _this.receiptCount;
            });
        });
    };
    //alert for empty fields
    PatientdetailsPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Empty fields',
            subTitle: 'Please complete the form before continue',
            buttons: ['OK']
        });
        alert.present();
    };
    //reset claim
    PatientdetailsPage.prototype.cancelButtonClicked = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cancel Request',
            message: 'Do you want to cancel your claim',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    role: 'Yes',
                    handler: function () {
                        _this.navCtrl.setRoot(PatientdetailsPage_1);
                    }
                }
            ]
        });
        alert.present();
    };
    // delete uploaded receipt 
    PatientdetailsPage.prototype.deleteButtonClicked = function (element) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Receipt',
            message: 'Do you want to delete the receipt',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_2_firebase__["storage"]().ref(_this.userIdNo + "/" + (parseInt(_this.claimNo) + 1)).child(_this.userIdNo + "-" + (_this.claimNo + 1) + "-" + (_this.receiptCount - 1)).delete();
                        _this.uploadButtonHide = true;
                        _this.uploadButtonClicked = false;
                        var index = _this.employeefile.indexOf(element);
                        if (index !== -1) {
                            _this.employeefile.splice(index, 1);
                        }
                        _this.receiptCountValidation -= 1;
                    }
                }
            ]
        });
        alert.present();
    };
    PatientdetailsPage = PatientdetailsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-patientdetails',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/patientdetails/patientdetails.html"*/'<ion-header>\n  <ion-toolbar color="dark">\n    <button ion-button menuToggle left>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="title-style">New Request</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="background" padding>\n  <div class="textcolor">Claim Request Form</div>\n  <br>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Name of Employee</ion-label>\n      <ion-input type="text" [(ngModel)]="NameOfEmployee" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Designation</ion-label>\n      <ion-input type="text" [(ngModel)]="designation" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>EPF No</ion-label>\n      <ion-input type="text" [(ngModel)]="EpfNo" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Claim for the month of</ion-label>\n      <ion-datetime displayFormat="MMMM/YYYY" pickerFormat="MMMM YYYY" [(ngModel)]="claimMonth" [max]="maxDate" required="required"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Name of the patient</ion-label>\n      <ion-input type="text" [(ngModel)]="nameofpatient" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Patients relationship to the employee</ion-label>\n      <ion-input type="text" [(ngModel)]="patientrelationship" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Name of the Specialist</ion-label>\n      <ion-input type="text" [(ngModel)]="nameofdoctor" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Nature of illness</ion-label>\n      <ion-input type="text" [(ngModel)]="natureofillness" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Date of Expenditure</ion-label>\n      <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="dateofExpen" [max]="maxDate" required="required"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Receipt No</ion-label>\n      <ion-input type="text" [(ngModel)]="ReceiptNo" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Amount of expenditure</ion-label>\n      <ion-input type="number" step="0.01" [(ngModel)]="amountofExpen" required="required"></ion-input>\n    </ion-item>\n    <ion-item >\n        \n        <ion-label id="validate_balance"></ion-label>\n      \n      </ion-item>\n\n    <ion-item>\n      <p *ngIf="ReceiptUploaded">Receipt Uploaded - {{ReceiptNo}}</p>\n\n    </ion-item>\n  </ion-list>\n\n  <div>\n    <button (click)="takePhoto()" class="button-inner" ion-button color="primary" col-12 *ngIf="uploadButtonHide">\n      Upload Receipt </button>\n  </div>\n\n  <!-- <div>\n    <button (click)="deleteButtonClicked()" class="button-inner" ion-button color="danger" *ngIf="uploadButtonClicked" clear item-end>\n      Delete Receipt </button>\n  </div> -->\n\n  <ion-list >\n      <ng-container *ngFor="let element of employeefile">\n          <ion-item *ngIf="element">\n        <ion-thumbnail item-start>\n          <img [src]="element" imageViewer>\n        </ion-thumbnail>\n        <ion-label>Receipt Uploaded</ion-label>\n        \n        <button (click)="deleteButtonClicked(element)" ion-button color="danger"  clear item-end>\n            Delete</button>\n         \n      </ion-item>\n    </ng-container>\n    </ion-list>\n\n  <div>\n    <button (click)="submitButtonClicked()" class="alignright" ion-button color="primary"> submit </button>\n  </div>\n  <div>\n    <button (click)="cancelButtonClicked()" class="alignright" ion-button color="danger"> cancel </button>\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/patientdetails/patientdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], PatientdetailsPage);
    return PatientdetailsPage;
    var PatientdetailsPage_1;
}());

//# sourceMappingURL=patientdetails.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FormdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormdetailsPage = /** @class */ (function () {
    function FormdetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        //retrive form details from history/pending pages
        this.formDetails = navParams.get("formdetails");
    }
    FormdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-formdetails',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/formdetails/formdetails.html"*/'<ion-header>\n\n    <ion-navbar color="dark">\n        <ion-title>Claimed form details</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-row>\n            <ion-col>\n                <ion-label>Status :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.status}}</ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <ion-label>Claim No : </ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.ClaimNo}}</ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <ion-label>Claim for the month of :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.claimMonth}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Name of Employee :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.NameOfEmployee}}</ion-label>\n            </ion-col>\n\n\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <ion-label>EPF No :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.EpfNo}}</ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <ion-label>Requested Date :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.requestDate}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Name of the patient :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.patientName}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Patients relationship to the employee :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.relationship}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Name of the Specialist :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.nameDoctor}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Nature of illness :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.NatureIllness}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Date of Expenditure :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.dateofExpenditure}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Receipt No :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.recieptNo}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Amount of expenditure :</ion-label>\n            </ion-col>\n            <ion-col>\n                <ion-label> {{formDetails.amount}}</ion-label>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-label>Receipt :</ion-label>\n            </ion-col>\n            <ion-col *ngFor="let element of formDetails.employeefile">\n                <img [src]="element" imageViewer>\n            </ion-col>\n        </ion-row>\n        \n\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/formdetails/formdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], FormdetailsPage);
    return FormdetailsPage;
}());

//# sourceMappingURL=formdetails.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__submission_submission__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chequesmng_chequesmng__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chequecollected_chequecollected__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, adf, platform) {
        this.navCtrl = navCtrl;
        this.adf = adf;
        this.platform = platform;
        this.badgeSubCount = 0;
        this.badgeChqCount = 0;
        this.badgeColCount = 0;
        this.changeColorSub = false;
        this.changeColorChq = false;
        this.changeColorCol = false;
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.fetchDataFromFireBase();
        this.generateCharts();
        this.loggedUserName = sessionStorage.getItem('username');
        // this.navCtrl.resize();
    };
    HomePage.prototype.generateCharts = function () {
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
        }
        catch (e) {
        }
    };
    HomePage.prototype.goToPage = function (page) {
        if (page == 'submissions') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__submission_submission__["a" /* SubmissionPage */]);
        }
        else if (page == 'cheques') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chequesmng_chequesmng__["a" /* ChequesmngPage */]);
        }
        else if (page == 'collect')
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__chequecollected_chequecollected__["a" /* ChequecollectedPage */]);
    };
    HomePage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.badgeSubCount = 0;
            _this.badgeChqCount = 0;
            _this.badgeColCount = 0;
            _this.changeColorSub = false;
            _this.changeColorChq = false;
            _this.changeColorCol = false;
            _this.forms = data;
            _this.forms.forEach(function (element) {
                if (element.status == 'submitted') {
                    _this.badgeSubCount++;
                    _this.changeColorSub = true;
                }
                else if (element.status == 'accepted') {
                    _this.badgeChqCount++;
                    _this.changeColorChq = true;
                }
                else if (element.status == 'ready') {
                    _this.badgeColCount++;
                    _this.changeColorCol = true;
                }
            });
            _this.generateCharts();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/home/home.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n    <ion-title>Dashboard</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="home_logo">\n    <img src="/assets/imgs/infor.png" height="40%" width="40%" />\n  </div>\n  <div class="centerAlign"><h2>Infor Medi Claim - Admin</h2></div>\n  <div class="centerAlign">\n    <h3>Welcome {{ loggedUserName }} !</h3>\n  </div>\n\n  <div id="adminDashCharts"></div>\n\n  <ion-card\n    (click)="goToPage(\'submissions\')"\n    color="secondary"\n    [ngClass]="{ \'bg-red\': changeColorSub }"\n  >\n    <ion-card-header class="centerAlign">\n      <h1>Pending Submissions</h1>\n    </ion-card-header>\n    <ion-card-content *ngIf="badgeSubCount == 0">\n      You do not have any pending subissions !\n    </ion-card-content>\n    <ion-card-content *ngIf="badgeSubCount > 0">\n      You have {{ badgeSubCount }} pending submissions to be processed !\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card\n    (click)="goToPage(\'cheques\')"\n    color="secondary"\n    [ngClass]="{ \'bg-red\': changeColorChq }"\n  >\n    <ion-card-header class="centerAlign">\n      <h1>Cheque Ready Queue</h1>\n    </ion-card-header>\n    <ion-card-content *ngIf="badgeChqCount == 0">\n      You do not have any cheques pending !\n    </ion-card-content>\n    <ion-card-content *ngIf="badgeChqCount > 0">\n      You have {{ badgeChqCount }} cheques pending !\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card\n    (click)="goToPage(\'collect\')"\n    color="secondary"\n    [ngClass]="{ \'bg-red\': changeColorCol }"\n  >\n    <ion-card-header class="centerAlign">\n      <h1>Collected Cheques</h1>\n    </ion-card-header>\n    <ion-card-content *ngIf="badgeColCount == 0">\n      You do not have any cheques waiting to be collected !\n    </ion-card-content>\n    <ion-card-content *ngIf="badgeColCount > 0">\n      You have {{ badgeColCount }} cheques waiting to be collected !\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]) === "function" && _c || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_released_tab_released__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_submitted_tab_submitted__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tab_accepted_tab_accepted__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tab_rejected_tab_rejected__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tab_ready_tab_ready__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AdminHistoryPage = /** @class */ (function () {
    function AdminHistoryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tabSub = __WEBPACK_IMPORTED_MODULE_3__tab_submitted_tab_submitted__["a" /* TabSubmittedPage */];
        this.tabRdy = __WEBPACK_IMPORTED_MODULE_6__tab_ready_tab_ready__["a" /* TabReadyPage */];
        this.tabRel = __WEBPACK_IMPORTED_MODULE_2__tab_released_tab_released__["a" /* TabReleasedPage */];
        this.tabAcp = __WEBPACK_IMPORTED_MODULE_4__tab_accepted_tab_accepted__["a" /* TabAcceptedPage */];
        this.tabRej = __WEBPACK_IMPORTED_MODULE_5__tab_rejected_tab_rejected__["a" /* TabRejectedPage */];
    }
    AdminHistoryPage.prototype.ionViewDidLoad = function () {
    };
    AdminHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin-history',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/admin-history/admin-history.html"*/'<ion-header>\n\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>History</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/admin-history/admin-history.html"*/,
            template: "<ion-tabs>\n  <ion-tab tabIcon=\"cloud-download\" tabTitle=\"Submitted\" [root]=\"tabSub\" ></ion-tab>\n  <ion-tab tabIcon=\"checkmark-circle\" tabTitle=\"Accepted\" [root]=\"tabAcp\" ></ion-tab>\n  <ion-tab tabIcon=\"close-circle\" tabTitle=\"Rejected\" [root]=\"tabRej\" ></ion-tab>\n  <ion-tab tabIcon=\"alarm\" tabTitle=\"Ready\" [root]=\"tabRdy\" ></ion-tab>\n  <ion-tab tabIcon=\"cash\" tabTitle=\"Released\" [root]=\"tabRel\" ></ion-tab>\n/ion-tabs>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], AdminHistoryPage);
    return AdminHistoryPage;
}());

//# sourceMappingURL=admin-history.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabReleasedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TabReleasedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabReleasedPage = /** @class */ (function () {
    function TabReleasedPage(navCtrl, navParams, adf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.fetchDataFromFireBase();
    }
    TabReleasedPage.prototype.ionViewDidLoad = function () {
    };
    TabReleasedPage.prototype.getSummary = function () {
        var _this = this;
        this.s_count = 0;
        this.s_tot = 0;
        this.forms.forEach(function (element) {
            if (element['status'] == 'released') {
                _this.s_count++;
                _this.s_tot += parseInt(element['amount']);
            }
        });
    };
    TabReleasedPage.prototype.applyFilters = function () {
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
    };
    TabReleasedPage.prototype.annualFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.releaseDate).getFullYear() == _this.year) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabReleasedPage.prototype.monthlyFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.releaseDate).getFullYear() == new Date(_this.month).getFullYear() && new Date(element.releaseDate).getMonth() + 1 == new Date(_this.month).getMonth() + 1) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabReleasedPage.prototype.userFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (element.user_id == _this.user_name) {
                newtemp[cnt] = element;
                cnt++;
                // console.log(element.user_id);
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabReleasedPage.prototype.reMapUsersWithData = function () {
        var _this = this;
        for (var i = 0; i < this.count; i++) {
            this.users.forEach(function (usr) {
                if (usr.user_id == _this.forms[i].user_id) {
                    _this.forms[i].name = usr.name;
                }
            });
        }
    };
    TabReleasedPage.prototype.viewRequest = function (form) {
        this.reMapUsersWithData();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__["a" /* ViewHistoryDetPage */], { selectedItem: form });
    };
    TabReleasedPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
            // console.log(this.users);
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            // console.log(this.forms);
            _this.temp = data;
            _this.count = data.length;
        });
        // Get the keys for the forms
        this.adf.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
            // console.log(this.formkeys);
            _this.getSummary();
        });
    };
    TabReleasedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tab-released',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-released/tab-released.html"*/'<!--\n  Generated template for the TabReleasedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cheques Released</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <!-- <ion-card-header>\n      Filter Results\n    </ion-card-header> -->\n    <ion-card-content>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Year</ion-label>\n        <ion-datetime displayFormat="YYYY" [(ngModel)]="year"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Month</ion-label>\n        <ion-datetime displayFormat="MM YYYY" [(ngModel)]="month"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Employee</ion-label>\n        <ion-select [(ngModel)]="user_name">\n          <ion-option *ngFor="let usr of users" value="{{usr.user_id}}">{{usr.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <button class=\'historyFilterCard\' ion-button full (click)="applyFilters()">Apply Filters</button>\n    </ion-card-content>\n  </ion-card>\n\n  <div>\n    <ion-card class=\'summaryCard\'>\n      <div class=\'historySum\'>Summary</div>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            Count : {{ s_count }}\n          </ion-col>\n          <ion-col>\n            Total : LKR {{ s_tot | number : \'1.2-2\'}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div class=\'historySwipeIns\'>(Click on an Item to view more details)</div>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'released\'" (click)="viewRequest(form)">\n        <ion-item>\n          <!-- <ion-avatar item-start>\n            <img src="/assets/imgs/avatar.png">\n          </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <h4>Accepted on {{ form.processDate }}</h4>\n            <h4>Released on {{ form.releaseDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button>View</button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button>View</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n    <!--  -->\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-released/tab-released.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]])
    ], TabReleasedPage);
    return TabReleasedPage;
}());

//# sourceMappingURL=tab-released.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabSubmittedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TabSubmittedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabSubmittedPage = /** @class */ (function () {
    function TabSubmittedPage(navCtrl, navParams, adf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.fetchDataFromFireBase();
    }
    TabSubmittedPage.prototype.ionViewDidLoad = function () {
    };
    TabSubmittedPage.prototype.getSummary = function () {
        var _this = this;
        this.s_count = 0;
        this.s_tot = 0;
        this.forms.forEach(function (element) {
            if (element['status'] == 'submitted') {
                _this.s_count++;
                _this.s_tot += parseInt(element['amount']);
            }
        });
    };
    TabSubmittedPage.prototype.applyFilters = function () {
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
    };
    TabSubmittedPage.prototype.annualFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.requestDate).getFullYear() == _this.year) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabSubmittedPage.prototype.monthlyFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.requestDate).getFullYear() == new Date(_this.month).getFullYear() && new Date(element.requestDate).getMonth() + 1 == new Date(_this.month).getMonth() + 1) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabSubmittedPage.prototype.userFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (element.user_id == _this.user_name) {
                newtemp[cnt] = element;
                cnt++;
                // console.log(element.user_id);
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabSubmittedPage.prototype.reMapUsersWithData = function () {
        var _this = this;
        for (var i = 0; i < this.count; i++) {
            this.users.forEach(function (usr) {
                if (usr.user_id == _this.forms[i].user_id) {
                    _this.forms[i].name = usr.name;
                }
            });
        }
    };
    TabSubmittedPage.prototype.viewRequest = function (form) {
        this.reMapUsersWithData();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__["a" /* ViewHistoryDetPage */], { selectedItem: form });
    };
    TabSubmittedPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
            // console.log(this.users);
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            // console.log(this.forms);
            _this.temp = data;
            _this.count = data.length;
        });
        // Get the keys for the forms
        this.adf.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
            // console.log(this.formkeys);
            _this.getSummary();
        });
    };
    TabSubmittedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tab-submitted',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-submitted/tab-submitted.html"*/'<!--\n  Generated template for the TabSubmittedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Requests Submitted</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n    <!-- <ion-card-header>\n      Filter Results\n    </ion-card-header> -->\n    <ion-card-content>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Year</ion-label>\n        <ion-datetime displayFormat="YYYY" [(ngModel)]="year"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Month</ion-label>\n        <ion-datetime displayFormat="MM YYYY" [(ngModel)]="month"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Employee</ion-label>\n        <ion-select [(ngModel)]="user_name">\n          <ion-option *ngFor="let usr of users" value="{{usr.user_id}}">{{usr.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <button class=\'historyFilterCard\' ion-button full (click)="applyFilters()">Apply Filters</button>\n    </ion-card-content>\n  </ion-card>\n\n  <div>\n    <ion-card class=\'summaryCard\'>\n      <div class=\'historySum\'>Summary</div>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            Count : {{ s_count }}\n          </ion-col>\n          <ion-col>\n            Total : LKR {{ s_tot | number : \'1.2-2\'}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div class=\'historySwipeIns\'>(Click on an Item to view more details)</div>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'submitted\'" (click)="viewRequest(form)">\n        <ion-item>\n          <!-- <ion-avatar item-start>\n            <img src="/assets/imgs/avatar.png">\n          </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button>View</button>\n\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button>View</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n    <!--  -->\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-submitted/tab-submitted.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]])
    ], TabSubmittedPage);
    return TabSubmittedPage;
}());

//# sourceMappingURL=tab-submitted.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabAcceptedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TabAcceptedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabAcceptedPage = /** @class */ (function () {
    function TabAcceptedPage(navCtrl, navParams, adf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.fetchDataFromFireBase();
    }
    TabAcceptedPage.prototype.ionViewDidLoad = function () {
    };
    TabAcceptedPage.prototype.getSummary = function () {
        var _this = this;
        this.s_count = 0;
        this.s_tot = 0;
        this.forms.forEach(function (element) {
            if (element['status'] == 'accepted') {
                _this.s_count++;
                _this.s_tot += parseInt(element['amount']);
            }
        });
    };
    TabAcceptedPage.prototype.applyFilters = function () {
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
    };
    TabAcceptedPage.prototype.annualFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.processDate).getFullYear() == _this.year) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabAcceptedPage.prototype.monthlyFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.processDate).getFullYear() == new Date(_this.month).getFullYear() && new Date(element.processDate).getMonth() + 1 == new Date(_this.month).getMonth() + 1) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabAcceptedPage.prototype.userFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (element.user_id == _this.user_name) {
                newtemp[cnt] = element;
                cnt++;
                // console.log(element.user_id);
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabAcceptedPage.prototype.reMapUsersWithData = function () {
        var _this = this;
        for (var i = 0; i < this.count; i++) {
            this.users.forEach(function (usr) {
                if (usr.user_id == _this.forms[i].user_id) {
                    _this.forms[i].name = usr.name;
                }
            });
        }
    };
    TabAcceptedPage.prototype.viewRequest = function (form) {
        this.reMapUsersWithData();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__["a" /* ViewHistoryDetPage */], { selectedItem: form });
    };
    TabAcceptedPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
            // console.log(this.users);
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            // console.log(this.forms);
            _this.temp = data;
            _this.count = data.length;
        });
        // Get the keys for the forms
        this.adf.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
            // console.log(this.formkeys);
            _this.getSummary();
        });
    };
    TabAcceptedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tab-accepted',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-accepted/tab-accepted.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Accepted Requests</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n    <!-- <ion-card-header>\n      Filter Results\n    </ion-card-header> -->\n    <ion-card-content>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Year</ion-label>\n        <ion-datetime displayFormat="YYYY" [(ngModel)]="year"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Month</ion-label>\n        <ion-datetime displayFormat="MM YYYY" [(ngModel)]="month"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Employee</ion-label>\n        <ion-select [(ngModel)]="user_name">\n          <ion-option *ngFor="let usr of users" value="{{usr.user_id}}">{{usr.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <button class=\'historyFilterCard\' ion-button full (click)="applyFilters()">Apply Filters</button>\n    </ion-card-content>\n  </ion-card>\n\n  <div>\n    <ion-card class=\'summaryCard\'>\n      <div class=\'historySum\'>Summary</div>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            Count : {{ s_count }}\n          </ion-col>\n          <ion-col>\n            Total : LKR {{ s_tot | number : \'1.2-2\'}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div class=\'historySwipeIns\'>(Click on an Item to view more details)</div>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'accepted\'" (click)="viewRequest(form)">\n        <ion-item>\n          <!-- <ion-avatar item-start>\n            <img src="/assets/imgs/avatar.png">\n          </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <h4>Accepted on {{ form.processDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button>View</button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button>View</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n    <!--  -->\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-accepted/tab-accepted.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]])
    ], TabAcceptedPage);
    return TabAcceptedPage;
}());

//# sourceMappingURL=tab-accepted.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabRejectedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TabRejectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabRejectedPage = /** @class */ (function () {
    function TabRejectedPage(navCtrl, navParams, adf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.fetchDataFromFireBase();
    }
    TabRejectedPage.prototype.ionViewDidLoad = function () {
    };
    TabRejectedPage.prototype.getSummary = function () {
        var _this = this;
        this.s_count = 0;
        this.s_tot = 0;
        this.forms.forEach(function (element) {
            if (element['status'] == 'rejected') {
                _this.s_count++;
                _this.s_tot += parseInt(element['amount']);
            }
        });
    };
    TabRejectedPage.prototype.applyFilters = function () {
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
    };
    TabRejectedPage.prototype.annualFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.processDate).getFullYear() == _this.year) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabRejectedPage.prototype.monthlyFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.processDate).getFullYear() == new Date(_this.month).getFullYear() && new Date(element.processDate).getMonth() + 1 == new Date(_this.month).getMonth() + 1) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabRejectedPage.prototype.userFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (element.user_id == _this.user_name) {
                newtemp[cnt] = element;
                cnt++;
                // console.log(element.user_id);
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabRejectedPage.prototype.reMapUsersWithData = function () {
        var _this = this;
        for (var i = 0; i < this.count; i++) {
            this.users.forEach(function (usr) {
                if (usr.user_id == _this.forms[i].user_id) {
                    _this.forms[i].name = usr.name;
                }
            });
        }
    };
    TabRejectedPage.prototype.viewRequest = function (form) {
        this.reMapUsersWithData();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__view_history_det_view_history_det__["a" /* ViewHistoryDetPage */], { selectedItem: form });
    };
    TabRejectedPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
            // console.log(this.users);
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            // console.log(this.forms);
            _this.temp = data;
            _this.count = data.length;
        });
        // Get the keys for the forms
        this.adf.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
            // console.log(this.formkeys);
            _this.getSummary();
        });
    };
    TabRejectedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tab-rejected',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-rejected/tab-rejected.html"*/'<!--\n  Generated template for the TabRejectedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Rejected Requests</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <!-- <ion-card-header>\n      Filter Results\n    </ion-card-header> -->\n    <ion-card-content>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Year</ion-label>\n        <ion-datetime displayFormat="YYYY" [(ngModel)]="year"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Month</ion-label>\n        <ion-datetime displayFormat="MM YYYY" [(ngModel)]="month"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Employee</ion-label>\n        <ion-select [(ngModel)]="user_name">\n          <ion-option *ngFor="let usr of users" value="{{usr.user_id}}">{{usr.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <button class=\'historyFilterCard\' ion-button full (click)="applyFilters()">Apply Filters</button>\n    </ion-card-content>\n  </ion-card>\n\n  <div>\n    <ion-card class=\'summaryCard\'>\n      <div class=\'historySum\'>Summary</div>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            Count : {{ s_count }}\n          </ion-col>\n          <ion-col>\n            Total : LKR {{ s_tot | number : \'1.2-2\'}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div class=\'historySwipeIns\'>(Click on an Item to view more details)</div>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'rejected\'" (click)="viewRequest(form)">\n        <ion-item>\n          <!-- <ion-avatar item-start>\n            <img src="/assets/imgs/avatar.png">\n          </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <h4>Rejected on {{ form.processDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button>View</button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button>View</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n    <!--  -->\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-rejected/tab-rejected.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]])
    ], TabRejectedPage);
    return TabRejectedPage;
}());

//# sourceMappingURL=tab-rejected.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabReadyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_history_det_view_history_det__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TabReadyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabReadyPage = /** @class */ (function () {
    function TabReadyPage(navCtrl, navParams, adf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.fetchDataFromFireBase();
    }
    TabReadyPage.prototype.ionViewDidLoad = function () {
    };
    TabReadyPage.prototype.getSummary = function () {
        var _this = this;
        this.s_count = 0;
        this.s_tot = 0;
        this.forms.forEach(function (element) {
            if (element['status'] == 'ready') {
                _this.s_count++;
                _this.s_tot += parseInt(element['amount']);
            }
        });
    };
    TabReadyPage.prototype.applyFilters = function () {
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
    };
    TabReadyPage.prototype.annualFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.readyDate).getFullYear() == _this.year) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabReadyPage.prototype.monthlyFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (new Date(element.readyDate).getFullYear() == new Date(_this.month).getFullYear() && new Date(element.readyDate).getMonth() + 1 == new Date(_this.month).getMonth() + 1) {
                newtemp[cnt] = element;
                cnt++;
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabReadyPage.prototype.userFilter = function () {
        var _this = this;
        var newtemp = [];
        var cnt = 0;
        this.temp.forEach(function (element) {
            if (element.user_id == _this.user_name) {
                newtemp[cnt] = element;
                cnt++;
                // console.log(element.user_id);
            }
        });
        // console.log(newtemp);
        this.forms = newtemp;
    };
    TabReadyPage.prototype.reMapUsersWithData = function () {
        var _this = this;
        for (var i = 0; i < this.count; i++) {
            this.users.forEach(function (usr) {
                if (usr.user_id == _this.forms[i].user_id) {
                    _this.forms[i].name = usr.name;
                }
            });
        }
    };
    TabReadyPage.prototype.viewRequest = function (form) {
        this.reMapUsersWithData();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__view_history_det_view_history_det__["a" /* ViewHistoryDetPage */], { selectedItem: form });
    };
    TabReadyPage.prototype.fetchDataFromFireBase = function () {
        // Retrieves data from firebase and stores it in a variable
        var _this = this;
        // Get list of users
        this.adf.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
            // console.log(this.users);
        });
        // Get list of forms
        this.adf.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            // console.log(this.forms);
            _this.temp = data;
            _this.count = data.length;
        });
        // Get the keys for the forms
        this.adf.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
            // console.log(this.formkeys);
            _this.getSummary();
        });
    };
    TabReadyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tab-ready',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-ready/tab-ready.html"*/'<!--\n  Generated template for the TabReadyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cheques Ready</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <!-- <ion-card-header>\n      Filter Results\n    </ion-card-header> -->\n    <ion-card-content>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Year</ion-label>\n        <ion-datetime displayFormat="YYYY" [(ngModel)]="year"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Month</ion-label>\n        <ion-datetime displayFormat="MM YYYY" [(ngModel)]="month"></ion-datetime>\n      </ion-item>\n\n      <ion-item class=\'historyFilterCard\'>\n        <ion-label>Employee</ion-label>\n        <ion-select [(ngModel)]="user_name">\n          <ion-option *ngFor="let usr of users" value="{{usr.user_id}}">{{usr.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <button class=\'historyFilterCard\' ion-button full (click)="applyFilters()">Apply Filters</button>\n    </ion-card-content>\n  </ion-card>\n\n  <div>\n    <ion-card class=\'summaryCard\'>\n      <div class=\'historySum\'>Summary</div>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            Count : {{ s_count }}\n          </ion-col>\n          <ion-col>\n            Total : LKR {{ s_tot | number : \'1.2-2\'}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div class=\'historySwipeIns\'>(Click on an Item to view more details)</div>\n  <ion-list>\n\n    <!-- Iterate and list the pending forms -->\n    <div *ngFor="let form of forms">\n      <ion-item-sliding #item *ngIf="form.status == \'ready\'" (click)="viewRequest(form)">\n        <ion-item>\n          <!-- <ion-avatar item-start>\n            <img src="/assets/imgs/avatar.png">\n          </ion-avatar> -->\n          <ion-label>\n            <div *ngFor="let user of users">\n              <h2 *ngIf="user.user_id == form.user_id">\n                {{ user.name }}\n              </h2>\n            </div>\n            <h4>Submitted on {{ form.requestDate }}</h4>\n            <h4>Accepted on {{ form.processDate }}</h4>\n            <h4>Ready from {{ form.readyDate }}</h4>\n            <p>Claim for LKR {{ form.amount | number : \'1.2-2\'}}</p>\n          </ion-label>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button>View</button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button>View</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </div>\n\n    <!--  -->\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/tab-ready/tab-ready.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"]])
    ], TabReadyPage);
    return TabReadyPage;
}());

//# sourceMappingURL=tab-ready.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert2__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_mngr_home_mngr__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__client_client_dashboard_dashboard__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, events, afd, menu, network, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afd = afd;
        this.menu = menu;
        this.network = network;
        this.toast = toast;
        this.events = events;
        this.balanceResetter();
        this.checkInternet();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.menu.enable(false);
    };
    LoginPage.prototype.checkInternet = function () {
        var _this = this;
        if (this.network.type == 'none') {
            this.toast.create({
                message: 'No Internet Connection Detected !',
                duration: 2000
            }).present();
        }
        this.network.onConnect().subscribe(function () {
            _this.toast.create({
                message: 'Internet Connected !',
                duration: 2000
            }).present();
        });
        this.network.onDisconnect().subscribe(function () {
            _this.toast.create({
                message: 'Internet Disconnected !',
                duration: 2000
            }).present();
        });
    };
    LoginPage.prototype.signIn = function () {
        var _this = this;
        if (this.in_username != null && this.in_password != null) {
            try {
                // match username against db credentials
                var users = this.afd.list('/users', function (ref) { return ref.orderByChild('username').equalTo(_this.in_username); }).valueChanges().subscribe(function (user_data) {
                    if (user_data.length > 0) {
                        // console.log(user_data);
                        var db_pwd = user_data[0]['password'];
                        if (db_pwd == _this.in_password) {
                            // correct credentials
                            var user_type = user_data[0]['user_type'];
                            _this.menu.enable(true);
                            _this.toast.create({
                                message: 'Welcome ' + user_data[0]['name'],
                                duration: 2000
                            }).present();
                            // identify user type and redirect
                            if (user_type == 'admin') {
                                // open admin dashboard
                                sessionStorage.setItem('userId', user_data[0]['user_id']);
                                sessionStorage.setItem('username', user_data[0]['name']);
                                _this.events.publish('user:admin');
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                            }
                            else if (user_type == 'manager') {
                                // open manager dashboard
                                sessionStorage.setItem('userId', user_data[0]['user_id']);
                                sessionStorage.setItem('username', user_data[0]['name']);
                                _this.events.publish('user:manager');
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_mngr_home_mngr__["a" /* HomeMngrPage */]);
                            }
                            else if (user_type == 'employee') {
                                // open employee dashboard
                                sessionStorage.setItem('userId', user_data[0]['user_id']);
                                _this.events.publish('user:employee');
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__client_client_dashboard_dashboard__["a" /* DashboardPage */]);
                            }
                        }
                        else {
                            // incorrect credentials
                            alert('Incorrect credentials ! Please Re-Try !');
                        }
                    }
                    else {
                        alert('Incorrect credentials ! Please Re-Try !');
                    }
                    users.unsubscribe();
                });
            }
            catch (error) {
                alert('An Error Occured !');
                console.log(error);
            }
        }
        else {
            alert('Please enter your username and password !');
        }
    };
    LoginPage.prototype.forgotpwd = function () {
        // not implemented.
        __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default()({
            type: 'success',
            title: 'Success',
            text: 'Password reset link was sent to your email !'
        });
    };
    LoginPage.prototype.balanceResetter = function () {
        var _this = this;
        // a function that resets users' balances back to te limit amount every year
        var s1 = this.afd.list('/settings').valueChanges().subscribe(function (data) {
            if (new Date(data[0] + '').getFullYear() != new Date().getFullYear()) {
                // first app launch of the year. reset user balances to limit
                var s2 = _this.afd.list('/users').snapshotChanges().subscribe(function (actions) {
                    actions.forEach(function (action) {
                        _this.afd.list('/users').update(action.key, { balance: 7000 });
                        _this.afd.object('/settings/').update({ current_year: new Date().getFullYear() });
                    });
                    s2.unsubscribe();
                });
            }
            s1.unsubscribe();
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/login/login.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content padding color class=\'login_content\'>\n\n  <ion-avatar item-start class=\'loginpgLogo\'>\n    <img src="/assets/imgs/infor.png" height=40% width=40%>\n  </ion-avatar>\n  <div class="loginmaintxt">Infor Medi Claim</div>\n\n  <ion-list>\n\n    <ion-item class="loginfields">\n      <ion-input type="text" placeholder="Username" [(ngModel)]="in_username" class="loginTxtFlds"></ion-input>\n    </ion-item>\n\n    <ion-item class="loginfields">\n      <ion-input type="password" placeholder="Password" [(ngModel)]="in_password" class="loginTxtFlds"></ion-input>\n    </ion-item>\n\n    <button ion-button full class=\'loginbtn1\' (click)="signIn()">Sign In</button>\n    <!-- <button ion-button full class=\'loginbtn1\' (click)="signIn(\'manager\')">Sign In (Manager)</button>\n    <button ion-button full color=\'danger\' class=\'loginbtn1\' (click)="forgotpwd()">Forgot Password</button> -->\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewRequestDetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ViewRequestDetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewRequestDetPage = /** @class */ (function () {
    function ViewRequestDetPage(navCtrl, navParams, adf, emailComposer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adf = adf;
        this.emailComposer = emailComposer;
        this.oldAcceptedCount = 0;
        this.oldRejectedCount = 0;
        this.oldPendingCount = 0;
        this.selectedReqToView = navParams.get("selectedReqToView");
        var cur_day = new Date().getDate();
        var cur_month = new Date().getMonth() + 1;
        var cur_year = new Date().getFullYear();
        this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
        this.getAllKeys();
    }
    ViewRequestDetPage.prototype.ionViewDidLoad = function () {
    };
    ViewRequestDetPage.prototype.notifyEmployee = function (item, state) {
        // notify the employee using an email
        var extraText = "";
        if (state) {
            state = 'accepted';
            extraText = ". We will notify you when the cheque is ready !";
        }
        else
            state = 'rejected';
        var email = {
            to: this.uEmail,
            cc: 'kaveen.abeywansa@infor.com',
            subject: 'Your claim request was ' + state + ' !',
            body: 'Hi ' + this.userName
                + ',<br>This is an automated mail sent to notify that your request was ' + state + extraText + '<br><br>Thank you',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    ViewRequestDetPage.prototype.acceptRequest = function () {
        var _this = this;
        // mark the listing as accepted
        __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
            title: 'Are you sure?',
            text: "Are you sure you want to accept this request?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                // user confirms action
                // validate if balance is available to claim
                if (_this.oldBalance > _this.selectedReqToView.amount) {
                    // calculate the new balance and counts
                    var newBalance = parseInt(_this.oldBalance) - parseInt(_this.selectedReqToView.amount);
                    var newAccepted = _this.oldAcceptedCount + 1;
                    var newReqBal = parseInt(_this.requestBal) - parseInt(_this.selectedReqToView.amount);
                    // update db
                    _this.adf.object('/forms/' + _this.formKey).update({ status: 'accepted', processDate: _this.current_date });
                    _this.adf.object('/users/' + _this.userKey).update({
                        balance: newBalance,
                        acceptedCount: newAccepted,
                        pendingCount: (_this.oldPendingCount - 1),
                        requestedClaimAmount: newReqBal
                    });
                    // alert('Request has been accepted !');
                    __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
                        type: 'success',
                        title: 'Accepted',
                        text: 'Request has been accepted'
                    });
                    _this.navCtrl.pop();
                    _this.notifyEmployee(_this.selectedReqToView, true);
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
                        type: 'error',
                        title: 'Failed',
                        text: 'Insufficient user balance to claim !'
                    });
                }
            }
        });
    };
    ViewRequestDetPage.prototype.rejectRequest = function () {
        var _this = this;
        // mark the listing as rejected
        __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
            title: 'Are you sure?',
            text: "Are you sure you want to reject this request?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                // executed when user confirms action
                // calculations
                var newRejected = _this.oldRejectedCount + 1;
                var newReqBal = parseInt(_this.requestBal) - parseInt(_this.selectedReqToView.amount);
                // update db
                _this.adf.object('/forms/' + _this.formKey).update({ status: 'rejected', processDate: _this.current_date });
                _this.adf.object('/users/' + _this.userKey).update({
                    rejectedCount: newRejected,
                    pendingCount: (_this.oldPendingCount - 1),
                    requestedClaimAmount: newReqBal
                });
                // alert('Request has been rejected !');
                __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
                    type: 'error',
                    title: 'Rejected',
                    text: 'Request has been rejected !'
                });
                _this.navCtrl.pop();
                _this.notifyEmployee(_this.selectedReqToView, false);
            }
        });
    };
    ViewRequestDetPage.prototype.getAllKeys = function () {
        var _this = this;
        var users = this.adf.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(_this.selectedReqToView.user_id); });
        var forms = this.adf.list('/forms', function (ref) { return ref.orderByChild('ClaimNo').equalTo(_this.selectedReqToView.ClaimNo); });
        users.valueChanges().subscribe(function (data) {
            _this.oldBalance = data[0]['balance'];
            _this.requestBal = data[0]['requestedClaimAmount'];
            _this.userName = data[0]['name'];
            _this.uEmail = data[0]['email'];
            _this.oldAcceptedCount = data[0]['acceptedCount'];
            _this.oldRejectedCount = data[0]['rejectedCount'];
            _this.oldPendingCount = data[0]['pendingCount'];
        });
        forms.snapshotChanges().subscribe(function (data) {
            _this.formKey = data[0].key;
        });
        users.snapshotChanges().subscribe(function (data) {
            _this.userKey = data[0].key;
        });
    };
    ViewRequestDetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-view-request-det',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/view-request-det/view-request-det.html"*/'<ion-header>\n\n  <ion-navbar color="navbar">\n    <ion-title>View Request Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <!-- <ion-avatar item-start>\n      <img src="/assets/imgs/avatar.png">\n    </ion-avatar> -->\n    <ion-card-header>\n      <h1 class="centerAlign">{{ selectedReqToView.name }}</h1>\n      <div>\n        <p>User ID : {{ selectedReqToView.user_id }}</p>\n        <p>Submitted on {{ selectedReqToView.requestDate }}</p>\n        <p ion-text color="primary">Status : Waiting for approval</p>\n      </div>\n    </ion-card-header>\n    <ion-card-content>\n      <h2>Request Details</h2>\n      <div class="padding5pt">\n        <table>\n          <tr>\n            <td>Claim No</td>\n            <td>: {{ selectedReqToView.ClaimNo }}</td>\n          </tr>\n          <tr>\n            <td>EPF No</td>\n            <td>: {{ selectedReqToView.EpfNo }}</td>\n          </tr>\n          <!-- <tr>\n            <td>Policy No</td>\n            <td>: {{ selectedReqToView.policyNo }}</td>\n          </tr> -->\n          <tr>\n            <td>Date of Expenditure</td>\n            <td>: {{ selectedReqToView.dateofExpenditure }}</td>\n          </tr>\n          <tr>\n            <td>Claim Month</td>\n            <td>: {{ selectedReqToView.claimMonth }}</td>\n          </tr>\n          <tr>\n            <td>Patient Name</td>\n            <td>: {{ selectedReqToView.patientName }}</td>\n          </tr>\n          <tr>\n            <td>Relationship</td>\n            <td>: {{ selectedReqToView.relationship }}</td>\n          </tr>\n          <!-- <tr>\n            <td>Insurance Company</td>\n            <td>: {{ selectedReqToView.insurancecompany }}</td>\n          </tr> -->\n          <tr>\n            <td>Nature of Illness</td>\n            <td>: {{ selectedReqToView.NatureIllness }}</td>\n          </tr>\n          <tr>\n            <td>Doctor Name</td>\n            <td>: {{ selectedReqToView.nameDoctor }}</td>\n          </tr>\n          <tr>\n            <td>Amount</td>\n            <td>: LKR {{ selectedReqToView.amount | number : \'1.2-2\'}}</td>\n          </tr>\n          <tr>\n            <td>Receipt No</td>\n            <td>: {{ selectedReqToView.recieptNo }}</td>\n          </tr>\n        </table>\n      </div>\n      <div>\n        Receipt attachments:\n        <!-- receiptfile -->\n        <div *ngFor="let image of selectedReqToView.employeefile" class=\'receiptImgDiv\'>\n          <img [src]="image" imageViewer >\n        </div>\n      </div>\n\n      <div class="row">\n        <div class="col">\n          <button ion-button full color="danger" (click)="rejectRequest()">Reject</button>\n        </div>\n        <div class="col">\n          <button ion-button full color="secondary" (click)="acceptRequest()">Accept</button>\n        </div>\n      </div>\n\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/view-request-det/view-request-det.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */]])
    ], ViewRequestDetPage);
    return ViewRequestDetPage;
}());

//# sourceMappingURL=view-request-det.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formdetails_formdetails__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HistoryPage = /** @class */ (function () {
    function HistoryPage(fdb, navCtrl, navParams) {
        this.fdb = fdb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userIdNo = sessionStorage.getItem('userId');
        this.fetchDataFromForms();
    }
    //retrieve forms of current user
    HistoryPage.prototype.fetchDataFromForms = function () {
        var _this = this;
        this.fdb.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
        });
        this.fdb.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            _this.temp = data;
            _this.count = data.length;
        });
        this.fdb.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
        });
    };
    HistoryPage.prototype.viewDetails = function (form) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__formdetails_formdetails__["a" /* FormdetailsPage */], { formdetails: form });
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/history/history.html"*/'\n<ion-header>\n  <ion-toolbar color="dark">\n    <button ion-button menuToggle left>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="title-style">History</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content class="background" padding>\n  <div class="textcolor">Swipe to view claims</div>\n  <br>\n  <!-- <ion-tabs>\n        <ion-tab [root]="tab1Root" tabTitle="Released"></ion-tab>\n        <ion-tab [root]="tab2Root" tabTitle="Rejected"></ion-tab>\n      </ion-tabs> -->\n  <div *ngFor="let form of forms">\n    <div *ngIf="form.user_id == userIdNo">\n      <ion-list>\n        <ion-item-sliding #item *ngIf="form.status == \'released\'">\n          <ion-item>\n              <!-- <ion-img width="25" height="25" src="assets/imgs/checked" item-end></ion-img> -->\n            <ion-icon name="checkmark" color="secondary" item-end></ion-icon>\n            <ion-label>\n              <p><b>Requested on {{ form.date }}</b></p>\n              <p><b>Released on {{ form.releasedate }}</b></p>\n              <p>Claimed for Rs. {{ form.amount }}</p>\n            </ion-label>\n          </ion-item>\n\n          <ion-item-options side="right">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n          </ion-item-options>\n          <ion-item-options side="left">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n          </ion-item-options>\n        </ion-item-sliding>\n\n        <ion-item-sliding #item *ngIf="form.status == \'rejected\'">\n          <ion-item>\n\n              <ion-icon name="close" color="danger" item-end></ion-icon>\n            <ion-label>\n              <p><b>Requested on {{ form.date }}</b></p>\n              <p><b>Rejected on {{ form.rejectdate }}</b></p>\n              <p>Claimed for Rs. {{ form.amount }}</p>\n            </ion-label>\n          </ion-item>\n\n          <ion-item-options side="right">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n          </ion-item-options>\n          <ion-item-options side="right">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/history/history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PendingclaimsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formdetails_formdetails__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PendingclaimsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PendingclaimsPage = /** @class */ (function () {
    function PendingclaimsPage(alertCtrl, fdb, navCtrl, navParams) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.fdb = fdb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userIdNo = sessionStorage.getItem('userId');
        this.fetchDataFromForms();
        this.fdb.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).valueChanges().subscribe(function (userData) {
            _this.requestedClaimAmount = userData[0]['requestedClaimAmount'];
            _this.pendingCount = userData[0]['pendingCount'];
        });
    }
    //join the key with the prior form object
    PendingclaimsPage.prototype.reMapDataWithKeys = function () {
        for (var i = 0; i < this.count; i++) {
            this.temp[i].key = this.formkeys[i].key;
        }
    };
    PendingclaimsPage.prototype.fetchDataFromForms = function () {
        var _this = this;
        this.fdb.list('/users').valueChanges().subscribe(function (data) {
            _this.users = data;
        });
        this.fdb.list('/forms').valueChanges().subscribe(function (data) {
            _this.forms = data;
            _this.temp = data;
            _this.count = data.length;
        });
        this.fdb.list('/forms').snapshotChanges().subscribe(function (data) {
            _this.formkeys = data;
        });
    };
    //delete submitted claim
    PendingclaimsPage.prototype.deleteDetails = function (item) {
        var _this = this;
        console.log(item);
        var alert = this.alertCtrl.create({
            title: 'Delete Request',
            message: 'Do you want to delete your claim',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    role: 'Yes',
                    handler: function () {
                        _this.reMapDataWithKeys();
                        var updateCount = _this.fdb.list('/users', function (ref) { return ref.orderByChild('user_id').equalTo(_this.userIdNo); }).snapshotChanges().subscribe(function (data) {
                            _this.fdb.object('/users/' + data[0].key).update({ pendingCount: _this.pendingCount - 1, requestedClaimAmount: _this.requestedClaimAmount - item.amount });
                            updateCount.unsubscribe();
                        });
                        item.employeefile.forEach(function (element) {
                            console.log(element);
                            __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().refFromURL(element).delete();
                        });
                        _this.fdb.object('/forms/' + item.key).remove();
                    }
                }
            ]
        });
        alert.present();
    };
    //view requested claim
    PendingclaimsPage.prototype.viewDetails = function (form) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__formdetails_formdetails__["a" /* FormdetailsPage */], { formdetails: form });
    };
    PendingclaimsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pendingclaims',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/pendingclaims/pendingclaims.html"*/'<ion-header>\n  <ion-toolbar color="dark">\n    <button ion-button menuToggle left>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="title-style">Pending Claims</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content class="background" padding>\n  <div class="textcolor">Swipe to view/delete claims</div>\n  <br>\n  \n  <div *ngFor="let form of forms">\n    <div *ngIf="form.user_id == userIdNo">\n      <ion-list>\n        <ion-item-sliding #item *ngIf="form.status == \'accepted\'">\n          <ion-item>\n            <ion-label>\n              <br>\n              <p><b>Requested on {{ form.requestDate }} </b></p>\n              <p><b>Processing started on {{ form.processDate }}</b></p>\n              <p>Claiming for Rs. {{ form.amount }}</p>\n            </ion-label>\n          </ion-item>\n\n          <ion-item-options side="right">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n          </ion-item-options>\n          <ion-item-options side="left">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n          </ion-item-options>\n        </ion-item-sliding>\n        <ion-item-sliding #item *ngIf="form.status == \'submitted\'">\n          <ion-item>\n\n            <ion-label>\n              <p><b>Requested on {{ form.requestDate }}</b></p>\n              <p><b>Processing not started</b></p>\n              <p>Claiming for Rs. {{ form.amount }}</p>\n            </ion-label>\n          </ion-item>\n\n          <ion-item-options side="right">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n            <button ion-button (click)="deleteDetails(form)" ion-button color="danger">Delete details</button>\n          </ion-item-options>\n          <ion-item-options side="left">\n            <button ion-button (click)="viewDetails(form)">View details</button>\n\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/client/pendingclaims/pendingclaims.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], PendingclaimsPage);
    return PendingclaimsPage;
}());

//# sourceMappingURL=pendingclaims.js.map

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 255;

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/admin/admin-history/admin-history.module": [
		617,
		17
	],
	"../pages/admin/chequecollected/chequecollected.module": [
		618,
		16
	],
	"../pages/admin/chequesmng/chequesmng.module": [
		619,
		15
	],
	"../pages/admin/home-mngr/home-mngr.module": [
		620,
		14
	],
	"../pages/admin/login/login.module": [
		621,
		13
	],
	"../pages/admin/submission/submission.module": [
		622,
		12
	],
	"../pages/admin/tab-accepted/tab-accepted.module": [
		623,
		11
	],
	"../pages/admin/tab-ready/tab-ready.module": [
		624,
		10
	],
	"../pages/admin/tab-rejected/tab-rejected.module": [
		625,
		9
	],
	"../pages/admin/tab-released/tab-released.module": [
		626,
		8
	],
	"../pages/admin/tab-submitted/tab-submitted.module": [
		627,
		7
	],
	"../pages/admin/view-history-det/view-history-det.module": [
		628,
		6
	],
	"../pages/admin/view-request-det/view-request-det.module": [
		629,
		5
	],
	"../pages/client/client_dashboard/dashboard.module": [
		630,
		4
	],
	"../pages/client/formdetails/formdetails.module": [
		631,
		3
	],
	"../pages/client/history/history.module": [
		632,
		2
	],
	"../pages/client/patientdetails/patientdetails.module": [
		634,
		1
	],
	"../pages/client/pendingclaims/pendingclaims.module": [
		633,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 296;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(495);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_admin_home_home__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_admin_list_list__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_admin_submission_submission__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_admin_view_request_det_view_request_det__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_admin_chequesmng_chequesmng__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_admin_admin_history_admin_history__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_admin_tab_submitted_tab_submitted__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_admin_tab_released_tab_released__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_admin_tab_accepted_tab_accepted__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_admin_tab_rejected_tab_rejected__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_admin_view_history_det_view_history_det__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_admin_chequecollected_chequecollected__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_admin_tab_ready_tab_ready__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_admin_login_login__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_admin_home_mngr_home_mngr__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_network__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ionic_img_viewer__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_client_pendingclaims_pendingclaims__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_client_history_history__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_client_client_dashboard_dashboard__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_client_patientdetails_patientdetails__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_client_formdetails_formdetails__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































var config = {
    apiKey: "AIzaSyBRJFbY1J2LEDad9sN6f53wq3Fa9ee9VyM",
    authDomain: "expense-management-e1e6d.firebaseapp.com",
    databaseURL: "https://expense-management-e1e6d.firebaseio.com",
    projectId: "expense-management-e1e6d",
    storageBucket: "expense-management-e1e6d.appspot.com",
    messagingSenderId: "687363091029"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_27__pages_client_pendingclaims_pendingclaims__["a" /* PendingclaimsPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_client_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_client_client_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_client_patientdetails_patientdetails__["a" /* PatientdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_client_formdetails_formdetails__["a" /* FormdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_23__pages_admin_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_admin_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_admin_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_admin_submission_submission__["a" /* SubmissionPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_admin_chequesmng_chequesmng__["a" /* ChequesmngPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_admin_admin_history_admin_history__["a" /* AdminHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_admin_tab_submitted_tab_submitted__["a" /* TabSubmittedPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_admin_tab_accepted_tab_accepted__["a" /* TabAcceptedPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_admin_tab_rejected_tab_rejected__["a" /* TabRejectedPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_admin_tab_ready_tab_ready__["a" /* TabReadyPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_admin_tab_released_tab_released__["a" /* TabReleasedPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_admin_view_request_det_view_request_det__["a" /* ViewRequestDetPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_admin_view_history_det_view_history_det__["a" /* ViewHistoryDetPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_admin_chequecollected_chequecollected__["a" /* ChequecollectedPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_admin_home_mngr_home_mngr__["a" /* HomeMngrPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2__["AngularFireModule"],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2__["AngularFireModule"].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_10__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_26_ionic_img_viewer__["a" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/admin/admin-history/admin-history.module#AdminHistoryPageModule', name: 'AdminHistoryPage', segment: 'admin-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/chequecollected/chequecollected.module#ChequecollectedPageModule', name: 'ChequecollectedPage', segment: 'chequecollected', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/chequesmng/chequesmng.module#ChequesmngPageModule', name: 'ChequesmngPage', segment: 'chequesmng', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/home-mngr/home-mngr.module#HomeMngrPageModule', name: 'HomeMngrPage', segment: 'home-mngr', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/submission/submission.module#SubmissionPageModule', name: 'SubmissionPage', segment: 'submission', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/tab-accepted/tab-accepted.module#TabAcceptedPageModule', name: 'TabAcceptedPage', segment: 'tab-accepted', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/tab-ready/tab-ready.module#TabReadyPageModule', name: 'TabReadyPage', segment: 'tab-ready', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/tab-rejected/tab-rejected.module#TabRejectedPageModule', name: 'TabRejectedPage', segment: 'tab-rejected', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/tab-released/tab-released.module#TabReleasedPageModule', name: 'TabReleasedPage', segment: 'tab-released', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/tab-submitted/tab-submitted.module#TabSubmittedPageModule', name: 'TabSubmittedPage', segment: 'tab-submitted', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/view-history-det/view-history-det.module#ViewHistoryDetPageModule', name: 'ViewHistoryDetPage', segment: 'view-history-det', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin/view-request-det/view-request-det.module#ViewRequestDetPageModule', name: 'ViewRequestDetPage', segment: 'view-request-det', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/client/client_dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/client/formdetails/formdetails.module#FormdetailsPageModule', name: 'FormdetailsPage', segment: 'formdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/client/history/history.module#HistoryPageModule', name: 'HistoryPage', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/client/pendingclaims/pendingclaims.module#PendingclaimsPageModule', name: 'PendingclaimsPage', segment: 'pendingclaims', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/client/patientdetails/patientdetails.module#PatientdetailsPageModule', name: 'PatientdetailsPage', segment: 'patientdetails', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_27__pages_client_pendingclaims_pendingclaims__["a" /* PendingclaimsPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_client_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_client_client_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_client_patientdetails_patientdetails__["a" /* PatientdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_client_formdetails_formdetails__["a" /* FormdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_23__pages_admin_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_admin_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_admin_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_admin_submission_submission__["a" /* SubmissionPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_admin_chequesmng_chequesmng__["a" /* ChequesmngPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_admin_admin_history_admin_history__["a" /* AdminHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_admin_tab_submitted_tab_submitted__["a" /* TabSubmittedPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_admin_tab_accepted_tab_accepted__["a" /* TabAcceptedPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_admin_tab_rejected_tab_rejected__["a" /* TabRejectedPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_admin_tab_ready_tab_ready__["a" /* TabReadyPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_admin_tab_released_tab_released__["a" /* TabReleasedPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_admin_view_request_det_view_request_det__["a" /* ViewRequestDetPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_admin_view_history_det_view_history_det__["a" /* ViewHistoryDetPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_admin_chequecollected_chequecollected__["a" /* ChequecollectedPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_admin_home_mngr_home_mngr__["a" /* HomeMngrPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__angular_common__["d" /* DecimalPipe */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewHistoryDetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ViewHistoryDetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewHistoryDetPage = /** @class */ (function () {
    function ViewHistoryDetPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedItem = navParams.get('selectedItem');
    }
    ViewHistoryDetPage.prototype.ionViewDidLoad = function () {
    };
    ViewHistoryDetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-view-history-det',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/view-history-det/view-history-det.html"*/'<ion-header>\n\n  <ion-navbar color="navbar">\n    <ion-title>View Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <!-- <ion-avatar item-start>\n        <img src="/assets/imgs/avatar.png">\n      </ion-avatar> -->\n    <ion-card-header>\n      <h1 class="centerAlign">{{ selectedItem.name }}</h1>\n      <div>\n        <p>User ID : {{ selectedItem.user_id }}</p>\n        <p>Submitted on {{ selectedItem.requestDate }}</p>\n        <p ion-text color="primary" *ngIf="selectedItem.status==\'submitted\'">Status : Waiting for approval</p>\n        <p ion-text color="primary" *ngIf="selectedItem.status==\'accepted\'">Status : Accepted</p>\n        <p ion-text color="primary" *ngIf="selectedItem.status==\'rejected\'">Status : Rejected</p>\n        <p ion-text color="primary" *ngIf="selectedItem.status==\'ready\'">Status : Ready to be collected</p>\n        <p ion-text color="primary" *ngIf="selectedItem.status==\'released\'">Status : Claim collected</p>\n      </div>\n    </ion-card-header>\n    <ion-card-content>\n      <h2>Request Details</h2>\n      <div class="padding5pt">\n        <table>\n          <tr>\n            <td>Claim No</td>\n            <td>: {{ selectedItem.ClaimNo }}</td>\n          </tr>\n          <tr>\n            <td>EPF No</td>\n            <td>: {{ selectedItem.EpfNo }}</td>\n          </tr>\n          <!-- <tr>\n            <td>Policy No</td>\n            <td>: {{ selectedItem.policyNo }}</td>\n          </tr> -->\n          <tr>\n            <td>Date of Expenditure</td>\n            <td>: {{ selectedItem.dateofExpenditure }}</td>\n          </tr>\n          <tr>\n            <td>Claim Month</td>\n            <td>: {{ selectedItem.claimMonth }}</td>\n          </tr>\n          <tr>\n            <td>Patient Name</td>\n            <td>: {{ selectedItem.patientName }}</td>\n          </tr>\n          <tr>\n            <td>Relationship</td>\n            <td>: {{ selectedItem.relationship }}</td>\n          </tr>\n          <!-- <tr>\n            <td>Insurance Company</td>\n            <td>: {{ selectedItem.insurancecompany }}</td>\n          </tr> -->\n          <tr>\n            <td>Nature of Illness</td>\n            <td>: {{ selectedItem.NatureIllness }}</td>\n          </tr>\n          <tr>\n            <td>Doctor Name</td>\n            <td>: {{ selectedItem.nameDoctor }}</td>\n          </tr>\n          <tr>\n            <td>Amount</td>\n            <td>: LKR {{ selectedItem.amount | number : \'1.2-2\'}}</td>\n          </tr>\n          <tr>\n            <td>Receipt No</td>\n            <td>: {{ selectedItem.recieptNo }}</td>\n          </tr>\n        </table>\n      </div>\n\n      <div>\n        Receipt attachments:\n        <!-- receiptfile -->\n        <div *ngFor="let image of selectedItem.employeefile" class=\'receiptImgDiv\'>\n          <img [src]="image" imageViewer >\n        </div>\n      </div>\n\n\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/view-history-det/view-history-det.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], ViewHistoryDetPage);
    return ViewHistoryDetPage;
}());

//# sourceMappingURL=view-history-det.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_admin_home_home__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_admin_submission_submission__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_admin_chequesmng_chequesmng__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_admin_admin_history_admin_history__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_admin_chequecollected_chequecollected__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_admin_login_login__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_admin_home_mngr_home_mngr__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_client_pendingclaims_pendingclaims__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_client_history_history__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_client_client_dashboard_dashboard__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_client_patientdetails_patientdetails__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, events, toastCtrl) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_admin_login_login__["a" /* LoginPage */];
        this.toastCtrl = toastCtrl;
        this.initializeApp();
        var rootScope = {
            backButtonPressedOnceToExit: false
        };
        this.platform.registerBackButtonAction(function () {
            if (rootScope['backButtonPressedOnceToExit']) {
                _this.platform.exitApp();
            }
            else {
                rootScope['backButtonPressedOnceToExit'] = true;
                _this.toastCtrl.create({
                    message: "Press back button again to exit",
                    duration: 2000
                }).present();
                setTimeout(function () {
                    rootScope['backButtonPressedOnceToExit'] = false;
                }, 2000);
            }
            return false;
        }, 101);
        // used for an example of ngFor and navigation
        this.pages = [];
        events.subscribe('user:admin', function () {
            _this.pages = [
                { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_4__pages_admin_home_home__["a" /* HomePage */] },
                // { title: 'List', component: ListPage },
                { title: 'Pending Submissions', component: __WEBPACK_IMPORTED_MODULE_5__pages_admin_submission_submission__["a" /* SubmissionPage */] },
                { title: 'Cheque Ready Queue', component: __WEBPACK_IMPORTED_MODULE_6__pages_admin_chequesmng_chequesmng__["a" /* ChequesmngPage */] },
                { title: 'Collected Cheques', component: __WEBPACK_IMPORTED_MODULE_8__pages_admin_chequecollected_chequecollected__["a" /* ChequecollectedPage */] },
                { title: 'History', component: __WEBPACK_IMPORTED_MODULE_7__pages_admin_admin_history_admin_history__["a" /* AdminHistoryPage */] }
            ];
        });
        events.subscribe('user:manager', function () {
            _this.pages = [
                { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_10__pages_admin_home_mngr_home_mngr__["a" /* HomeMngrPage */] },
                { title: 'History', component: __WEBPACK_IMPORTED_MODULE_7__pages_admin_admin_history_admin_history__["a" /* AdminHistoryPage */] }
            ];
        });
        events.subscribe('user:employee', function () {
            _this.pages = [{ title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_13__pages_client_client_dashboard_dashboard__["a" /* DashboardPage */] },
                { title: 'New Request', component: __WEBPACK_IMPORTED_MODULE_14__pages_client_patientdetails_patientdetails__["a" /* PatientdetailsPage */] },
                { title: 'Pending Claims', component: __WEBPACK_IMPORTED_MODULE_11__pages_client_pendingclaims_pendingclaims__["a" /* PendingclaimsPage */] },
                { title: 'History', component: __WEBPACK_IMPORTED_MODULE_12__pages_client_history_history__["a" /* HistoryPage */] }
            ];
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.logout = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_admin_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-navbar color="dark">\n      <ion-toolbar>\n        <div>\n          <ion-avatar item-start class=\'centerAlign\'>\n            <img src="/assets/imgs/infor.png" height=30% width=30%>\n          </ion-avatar>\n          <div class="sidemenuText">Infor Medi Claim</div>\n        </div>\n      </ion-toolbar>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n  <ion-footer>\n    <button ion-button full color="danger" (click)="logout()">Log out</button>\n\n  </ion-footer>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kabeywansa/Desktop/inforMediClaim/src/pages/admin/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ })

},[363]);
//# sourceMappingURL=main.js.map