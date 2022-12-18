import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetseccionPageRoutingModule } from './detseccion-routing.module';

import { DetseccionPage } from './detseccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetseccionPageRoutingModule
  ],
  declarations: [DetseccionPage]
})
export class DetseccionPageModule {}
