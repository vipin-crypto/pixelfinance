import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { PaginationModule } from 'ngx-bootstrap';
import { AdminModalComponent } from './admin/admin-modal/admin-modal.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { MatSliderModule} from '@angular/material';
import {MatStepperModule} from '@angular/material';
 

@NgModule({
  declarations: [
    PagesComponent,
    AdminModalComponent,
    EditAdminComponent,  
  ],
  imports: [
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    PagesRoutingModule,
    MatSliderModule,
    MatStepperModule,
  
    PaginationModule.forRoot(),
  ],
})
export class PagesModule { }
