import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarConsultaAnonimaComponent } from './realizar-consulta-anonima.component';

describe('RealizarConsultaAnonimaComponent', () => {
  let component: RealizarConsultaAnonimaComponent;
  let fixture: ComponentFixture<RealizarConsultaAnonimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarConsultaAnonimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarConsultaAnonimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
