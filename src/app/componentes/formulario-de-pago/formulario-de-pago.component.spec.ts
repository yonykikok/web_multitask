import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDePagoComponent } from './formulario-de-pago.component';

describe('FormularioDePagoComponent', () => {
  let component: FormularioDePagoComponent;
  let fixture: ComponentFixture<FormularioDePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioDePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
