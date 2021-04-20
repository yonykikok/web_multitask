import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOfertasRealizadasComponent } from './ver-ofertas-realizadas.component';

describe('VerOfertasRealizadasComponent', () => {
  let component: VerOfertasRealizadasComponent;
  let fixture: ComponentFixture<VerOfertasRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOfertasRealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOfertasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
