import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarMisArticulosComponent } from './seleccionar-mis-articulos.component';

describe('SeleccionarMisArticulosComponent', () => {
  let component: SeleccionarMisArticulosComponent;
  let fixture: ComponentFixture<SeleccionarMisArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarMisArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarMisArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
