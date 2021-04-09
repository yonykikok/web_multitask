import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalladoPublicacionComponent } from './detallado-publicacion.component';

describe('DetalladoPublicacionComponent', () => {
  let component: DetalladoPublicacionComponent;
  let fixture: ComponentFixture<DetalladoPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalladoPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalladoPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
