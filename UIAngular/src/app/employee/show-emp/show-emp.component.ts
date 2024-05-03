import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CUDEmpComponent } from '../c-u-d-emp/c-u-d-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrl: './show-emp.component.css'
})
export class ShowEmpComponent {
  constructor(private dataService:SharedService, private modalService:NgbModal){}
  ngOnInit(){
    this.reloadEmpList();
  }
  empList:any = [];
  baseImgUrl:string = this.dataService.API_BaseURL+"media/";
  reloadEmpList():void{
    this.dataService.getEmpList().subscribe(data=>{
      this.empList = data;
    });
  }
  addClick(){
    const modalRef:NgbModalRef = this.modalService.open(CUDEmpComponent);//Open Modal
    //Set Instance Var Value
    modalRef.componentInstance.Tittle = "Add New Employee";
    modalRef.componentInstance.Mode = 1;
    modalRef.componentInstance.imageUrl = "";
  }
  updClick(val:any){
    const modalRef:NgbModalRef = this.modalService.open(CUDEmpComponent);

    modalRef.componentInstance.Tittle = "Update Employee Profile";
    modalRef.componentInstance.Mode = 2;
    modalRef.componentInstance.Emp = val;
    modalRef.componentInstance.imageUrl = this.baseImgUrl+val.Img.toString();
  }
  delClick(val:any){
    const modalRef:NgbModalRef = this.modalService.open(CUDEmpComponent);
    modalRef.componentInstance.Tittle = "Delete Employee";
    modalRef.componentInstance.Mode = 3;
    modalRef.componentInstance.Emp = val;
  }

  changeSort(event: any) {
    const sortBy = event.target.value;
    switch (sortBy) {
        case "0": // Sort By Id
            this.empList.sort((a: any, b: any) => a.EmployeeId - b.EmployeeId);
            break;
        case "1": // Sort By Name
            this.empList.sort((a: any, b: any) => a.EmployeeName.localeCompare(b.EmployeeName));
            break;
        case "2": // Sort By Department
            this.empList.sort((a: any, b: any) => a.Department.localeCompare(b.Department));
            break;
        case "3": // Sort By DateOfJoin
            this.empList.sort((a: any, b: any) => new Date(a.DateOfJoin).getTime() - new Date(b.DateOfJoin).getTime());
            break;
        default:
            break;
    }
  }


}
