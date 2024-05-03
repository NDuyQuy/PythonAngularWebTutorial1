import { Component,OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { flatMap } from 'rxjs';
import { flip, reference } from '@popperjs/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from '../add-edit/add-edit.component';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrl: './show-dep.component.css'
})
export class ShowDepComponent {
  constructor(private service:SharedService, private modalService: NgbModal){}
  DepList:any=[];

  dep:any=[];
  ngOnInit():void{
    this.refreshDepList();
  }
  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepList=data;
    });
  }

  addClick(){
    const modalRef: NgbModalRef = this.modalService.open(AddEditComponent);
    modalRef.componentInstance.ModalTitle = "Add Department";
    modalRef.componentInstance.InsertOrUpdate = true;
  }

  updClick(val:any){
    const modalRef: NgbModalRef = this.modalService.open(AddEditComponent);
    
    modalRef.componentInstance.dep = val;
    modalRef.componentInstance.ModalTitle = "Edit Department";
    modalRef.componentInstance.InsertOrUpdate = false;
  }

  delClick(val:any){
    const modalRef: NgbModalRef = this.modalService.open(AddEditComponent);
    modalRef.componentInstance.Id = val.DepartmentId;
    modalRef.componentInstance.dep = val;
    modalRef.componentInstance.ModalTitle = "Delete Department";
    modalRef.componentInstance.isDelete = true;
  }
}
