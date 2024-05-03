import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { read } from '@popperjs/core';

@Component({
  selector: 'app-c-u-d-emp',
  templateUrl: './c-u-d-emp.component.html',
  styleUrl: './c-u-d-emp.component.css'
})
export class CUDEmpComponent {
  constructor(private dataService: SharedService,public activeModal: NgbActiveModal){}

  Tittle:string = "";
  Mode:number = 0;
  Emp:any;
  depList:any = [];
  baseImgUrl:string = this.dataService.API_BaseURL+"media/";

  public form = new FormGroup({
    EmployeeId:   new FormControl(''),
    EmployeeName: new FormControl('',Validators.required),
    Department:   new FormControl('',Validators.required),
    DateOfJoin:   new FormControl('',Validators.required),
    Img:          new FormControl('')
  });

  ngOnInit()
  {
    this.getDepList();
    this.setEmpVal();
  }

  getDepList():void{
    this.dataService.getDepList().subscribe(data=>{
      this.depList = data;
    });
  }
  setEmpVal():void{
    if(this.Mode==2){
      this.form.get('EmployeeId')?.setValue(this.Emp.EmployeeId);
      this.form.get('EmployeeName')?.setValue(this.Emp.EmployeeName);
      this.form.get('Department')?.setValue(this.Emp.Department);
      this.form.get('DateOfJoin')?.setValue(this.Emp.DateOfJoin);
      this.form.get('Img')?.setValue(this.Emp.Img);
    }
  }
  
  close(){
    this.activeModal.close();
  }

  SaveChange(){
    if(this.selectedImg != null){
      const dataFile:FormData = new FormData();
      dataFile.append('uploadedFile',this.selectedImg,this.selectedImg.name);
      this.form.get('Img')?.setValue(this.selectedImg.name.toString());
      this.dataService.uploadImg(dataFile).subscribe(res=>{
        console.warn(res);        
      });
    }

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

  serializeFormData(): any {
    const formData = this.form.value;
    return {
      EmployeeId:   formData.EmployeeId,
      EmployeeName: formData.EmployeeName,
      Department:   formData.Department,
      DateOfJoin:   formData.DateOfJoin,
      Img:          formData.Img
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

  public selectedImg:File | null = null;
  imageUrl: string|ArrayBuffer|null = null;
  onFileSelected(event:any){
    var selectedImg = event.target.files[0];
    this.selectedImg = selectedImg;
    this.previewImg(selectedImg);
  }

  previewImg(selectedImg:File): void{
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result;
    }
    if(selectedImg){
      reader.readAsDataURL(selectedImg);
    }
  }
  

}
