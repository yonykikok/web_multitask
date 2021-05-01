import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPermutasComponent } from './mis-permutas.component';

describe('MisPermutasComponent', () => {
  let component: MisPermutasComponent;
  let fixture: ComponentFixture<MisPermutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPermutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPermutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
