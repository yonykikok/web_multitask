import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionesClienteComponent } from './reparaciones-cliente.component';

describe('ReparacionesClienteComponent', () => {
  let component: ReparacionesClienteComponent;
  let fixture: ComponentFixture<ReparacionesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
