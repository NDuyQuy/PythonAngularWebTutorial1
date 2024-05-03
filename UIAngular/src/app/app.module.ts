import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { AddEditComponent } from './department/add-edit/add-edit.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUDEmpComponent } from './employee/c-u-d-emp/c-u-d-emp.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    ShowDepComponent,
    AddEditComponent,
    ShowEmpComponent,
    CUDEmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
