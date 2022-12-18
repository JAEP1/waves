import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeccionesPageRoutingModule } from './secciones-routing.module';
import {MatRippleModule} from '@angular/material/core';
import { SeccionesPage } from './secciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeccionesPageRoutingModule,
    MatRippleModule
  ],
  declarations: [SeccionesPage]
})
export class SeccionesPageModule {}
