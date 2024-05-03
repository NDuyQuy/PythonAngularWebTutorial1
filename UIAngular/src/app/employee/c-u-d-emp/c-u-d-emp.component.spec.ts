import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUDEmpComponent } from './c-u-d-emp.component';

describe('CUDEmpComponent', () => {
  let component: CUDEmpComponent;
  let fixture: ComponentFixture<CUDEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CUDEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CUDEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
