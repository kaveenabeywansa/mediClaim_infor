import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChequesmngPage } from './chequesmng';

@NgModule({
  declarations: [
    ChequesmngPage,
  ],
  imports: [
    IonicPageModule.forChild(ChequesmngPage),
  ],
})
export class ChequesmngPageModule {}
