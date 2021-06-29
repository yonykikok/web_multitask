import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagoReparacionComponent } from './form-pago-reparacion.component';

describe('FormPagoReparacionComponent', () => {
  let component: FormPagoReparacionComponent;
  let fixture: ComponentFixture<FormPagoReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPagoReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPagoReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
