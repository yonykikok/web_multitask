import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImagenesComponentComponent } from './subir-imagenes-component.component';

describe('SubirImagenesComponentComponent', () => {
  let component: SubirImagenesComponentComponent;
  let fixture: ComponentFixture<SubirImagenesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirImagenesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirImagenesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
