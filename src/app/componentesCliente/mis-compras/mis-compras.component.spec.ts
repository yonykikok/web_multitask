import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisComprasComponent } from './mis-compras.component';

describe('MisComprasComponent', () => {
  let component: MisComprasComponent;
  let fixture: ComponentFixture<MisComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
