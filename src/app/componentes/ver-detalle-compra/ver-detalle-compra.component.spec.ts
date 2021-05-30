import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleCompraComponent } from './ver-detalle-compra.component';

describe('VerDetalleCompraComponent', () => {
  let component: VerDetalleCompraComponent;
  let fixture: ComponentFixture<VerDetalleCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
