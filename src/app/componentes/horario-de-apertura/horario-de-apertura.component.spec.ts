import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioDeAperturaComponent } from './horario-de-apertura.component';

describe('HorarioDeAperturaComponent', () => {
  let component: HorarioDeAperturaComponent;
  let fixture: ComponentFixture<HorarioDeAperturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioDeAperturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioDeAperturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
