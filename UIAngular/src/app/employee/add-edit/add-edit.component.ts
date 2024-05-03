import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
  constructor(private dataService: SharedService,public activeModal: NgbActiveModal){}

  Tittle:string = "";
  Mode:number = 0;
  Emp:any;

  baseImgUrl:string = this.dataService.API_BaseURL+"media/";
  public form = new FormGroup({
    EmployeeId:   new FormControl(''),
    EmployeeName: new FormControl('',Validators.required),
    Department:   new FormControl('',Validators.required),
    DateOfJoin:   new FormControl('',Validators.required),
    Img:          new FormControl('',Validators.required)
  });

  close(){
    this.activeModal.close();
  }
  SaveChange(){
    switch(this.Mode)
    {
      case 1:{
        this.addEmp();
        break;
      }
      case 2:{
        this.editEmp();
        break;
      }
      case 3:{
        this.deleteEmp();
        break;
      }
      default: break;
    }
    this.activeModal.close();
    location.reload();
  }

  

  setEmpVal(){
    if(this.Mode==1){
      this.form.get('EmployeeId')?.setValue(this.Emp.EmployeeId);
      this.form.get('EmployeeName')?.setValue(this.Emp.EmployeeName);
      this.form.get('Department')?.setValue(this.Emp.Department);
      this.form.get('DateOfJoin')?.setValue(this.Emp.DateOfJoin);
      this.form.get('Img')?.setValue(this.baseImgUrl+this.Emp.Img);
    }
  }
  serializeFormData(): any {
    const formData = this.form.value;
    return {
      EmployeeId: formData.EmployeeId,
      EmployeeName: formData.EmployeeName,
      Department: formData.Department,
      DateOfJoin: formData.DateOfJoin,
      Img: formData.Img
    };
  }
  addEmp(){
    var data_serialized = this.serializeFormData();
    this.dataService.addEmp(data_serialized).subscribe(res=>{
      //console.log('Add Data Success');
      alert(res.toString());
    })
  }

  editEmp(){
    var data_serialized = this.serializeFormData();
    this.dataService.updEmp(data_serialized).subscribe(res=>{
      //console.log('Add Data Success');
      alert(res.toString());
    })
  }

  deleteEmp(){
    var id:number = this.Emp.EmployeeId;
    this.dataService.delEmp(id).subscribe(res=>{
      //console.log('Add Data Success');
      alert(res.toString());
    })
  }
}
