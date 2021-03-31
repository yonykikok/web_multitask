import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePersonalComponent } from './lista-de-personal.component';

describe('ListaDePersonalComponent', () => {
  let component: ListaDePersonalComponent;
  let fixture: ComponentFixture<ListaDePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
