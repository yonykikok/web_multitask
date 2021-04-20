import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarOfertaCompletaComponent } from './visualizar-oferta-completa.component';

describe('VisualizarOfertaCompletaComponent', () => {
  let component: VisualizarOfertaCompletaComponent;
  let fixture: ComponentFixture<VisualizarOfertaCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarOfertaCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarOfertaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
