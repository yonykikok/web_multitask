import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasAdminComponent } from './estadisticas-admin.component';

describe('EstadisticasAdminComponent', () => {
  let component: EstadisticasAdminComponent;
  let fixture: ComponentFixture<EstadisticasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
