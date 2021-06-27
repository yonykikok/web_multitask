import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarDatosComponent } from './dialog-modificar-datos.component';

describe('DialogModificarDatosComponent', () => {
  let component: DialogModificarDatosComponent;
  let fixture: ComponentFixture<DialogModificarDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogModificarDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
