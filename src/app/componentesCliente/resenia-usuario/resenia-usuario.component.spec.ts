import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaUsuarioComponent } from './resenia-usuario.component';

describe('ReseniaUsuarioComponent', () => {
  let component: ReseniaUsuarioComponent;
  let fixture: ComponentFixture<ReseniaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReseniaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
