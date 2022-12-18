import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatMenuModule,
    MatRippleModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
