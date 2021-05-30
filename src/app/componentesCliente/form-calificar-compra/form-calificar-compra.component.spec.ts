import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalificarCompraComponent } from './form-calificar-compra.component';

describe('FormCalificarCompraComponent', () => {
  let component: FormCalificarCompraComponent;
  let fixture: ComponentFixture<FormCalificarCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCalificarCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalificarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
