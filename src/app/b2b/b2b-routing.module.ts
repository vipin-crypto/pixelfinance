import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { B2bComponent } from './b2b.component';

const routes: Routes = [
  {
    path: '', component: B2bComponent, children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2bRoutingModule { }
