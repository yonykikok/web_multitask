import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalladoConsultaAnonimaComponent } from './detallado-consulta-anonima.component';

describe('DetalladoConsultaAnonimaComponent', () => {
  let component: DetalladoConsultaAnonimaComponent;
  let fixture: ComponentFixture<DetalladoConsultaAnonimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalladoConsultaAnonimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalladoConsultaAnonimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
