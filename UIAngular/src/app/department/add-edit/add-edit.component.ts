import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
  constructor(public activeModal:NgbActiveModal, private dataService: SharedService){}
  ModalTitle: string ="";
  InsertOrUpdate: boolean = false;
  isDelete: boolean = false;
  dep:any;
  Id:any; 
  addOrUpdateForm = new FormGroup({
    DepartmentId: new FormControl(''),
    DepartmentName: new FormControl('', Validators.required)
  });

  ngOnInit():void
  {
    this.setDepValue();
  }
  setDepValue(){
    if(this.InsertOrUpdate){
      this.addOrUpdateForm.get('DepartmentName')?.setValue(' ');
    }else{
      this.addOrUpdateForm.get('DepartmentId')?.setValue(this.dep.DepartmentId);
      this.addOrUpdateForm.get('DepartmentName')?.setValue(this.dep.DepartmentName);
    }
  }

  closeClick(){
    this.activeModal.close();
 }

 saveChange() {
    if (this.isDelete) {
      this.dataService.delDep(this.Id.toString()).subscribe(response => {
        console.log("Department deleted successfully!");
        alert(response.toString());
      });
      this.isDelete = false;
    } else {
      const formData = this.addOrUpdateForm.value;
      var val = {DepartmentId:formData.DepartmentId, DepartmentName: formData.DepartmentName};
      if (this.InsertOrUpdate) {
        this.dataService.addDep(formData).subscribe(response => {
          console.log("Department added successfully!");
          alert(response.toString());
        });
      } else {
        this.dataService.updDep(val).subscribe(response => {
          console.log("Department updated successfully!");
          alert(response.toString());
        });
      }
    }
    this.activeModal.close();
    location.reload();
  }

}
