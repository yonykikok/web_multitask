import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOfertasComponent } from './ver-ofertas.component';

describe('VerOfertasRealizadasComponent', () => {
  let component: VerOfertasComponent;
  let fixture: ComponentFixture<VerOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
