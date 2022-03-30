import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { DefaultLayoutComponent } from '../_components/default-layout/default-layout.component';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: '', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
