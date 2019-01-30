import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHistoryPage } from './admin-history';

@NgModule({
  declarations: [
    AdminHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminHistoryPage),
  ],
})
export class AdminHistoryPageModule {}
