import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionEmpleadoComponent } from './reparacion-empleado.component';

describe('ReparacionEmpleadoComponent', () => {
  let component: ReparacionEmpleadoComponent;
  let fixture: ComponentFixture<ReparacionEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
