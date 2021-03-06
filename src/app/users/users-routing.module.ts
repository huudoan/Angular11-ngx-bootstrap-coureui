import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { DefaultLayoutComponent } from '../_components/default-layout/default-layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
     
      {path: '', component: ListComponent,
      data: {
        title: 'Users'
      }
    },
      {path: 'add', component: AddEditComponent},
      {path: 'edit/:id', component: AddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
