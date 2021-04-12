import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesClienteComponent } from './publicaciones-cliente.component';

describe('PublicacionesClienteComponent', () => {
  let component: PublicacionesClienteComponent;
  let fixture: ComponentFixture<PublicacionesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
