import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  API_BaseURL = "http://127.0.0.1:8000/";
  EmployeeURL = this.API_BaseURL + "employee/";
  DepartmentURL = this.API_BaseURL+"department/"
  UploadImgURL = this.API_BaseURL + "SaveUploadImg";

  constructor(private http:HttpClient) { }
  // Department api call
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.DepartmentURL);
  }
  addDep(val:any){
    return this.http.post(this.DepartmentURL,val);
  }
  updDep(val:any){
    return this.http.put(this.DepartmentURL,val);
  }
  delDep(val:any){
    return this.http.delete(this.DepartmentURL+val);
  }

  //Employee api call
  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.EmployeeURL);
  }
  addEmp(val:any){
    return this.http.post(this.EmployeeURL,val);
  }
  updEmp(val:any){
    return this.http.put(this.EmployeeURL,val);
  }
  delEmp(val:any){
    return this.http.delete(this.EmployeeURL+val);
  }


  //Upload Img Api call
  uploadImg(val:any){
    return this.http.post(this.UploadImgURL,val);
  }
  
}
