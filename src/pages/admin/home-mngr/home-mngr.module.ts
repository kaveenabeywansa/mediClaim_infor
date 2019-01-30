import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMngrPage } from './home-mngr';

@NgModule({
  declarations: [
    HomeMngrPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMngrPage),
  ],
})
export class HomeMngrPageModule {}
