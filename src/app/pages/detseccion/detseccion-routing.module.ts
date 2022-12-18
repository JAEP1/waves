import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetseccionPage } from './detseccion.page';

const routes: Routes = [
  {
    path: '',
    component: DetseccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetseccionPageRoutingModule {}
