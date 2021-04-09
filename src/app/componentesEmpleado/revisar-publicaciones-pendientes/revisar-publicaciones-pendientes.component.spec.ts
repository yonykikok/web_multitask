import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarPublicacionesPendientesComponent } from './revisar-publicaciones-pendientes.component';

describe('RevisarPublicacionesPendientesComponent', () => {
  let component: RevisarPublicacionesPendientesComponent;
  let fixture: ComponentFixture<RevisarPublicacionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarPublicacionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarPublicacionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
