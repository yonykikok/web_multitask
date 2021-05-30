import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputacionComponent } from './reputacion.component';

describe('ReputacionComponent', () => {
  let component: ReputacionComponent;
  let fixture: ComponentFixture<ReputacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReputacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReputacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
