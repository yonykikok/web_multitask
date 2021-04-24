import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReparacionComponent } from './generar-reparacion.component';

describe('GenerarReparacionComponent', () => {
  let component: GenerarReparacionComponent;
  let fixture: ComponentFixture<GenerarReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
