import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsComponent } from './editar-us.component';

describe('EditarUsComponent', () => {
  let component: EditarUsComponent;
  let fixture: ComponentFixture<EditarUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
