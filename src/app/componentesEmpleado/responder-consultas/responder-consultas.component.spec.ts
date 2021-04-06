import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderConsultasComponent } from './responder-consultas.component';

describe('ResponderConsultasComponent', () => {
  let component: ResponderConsultasComponent;
  let fixture: ComponentFixture<ResponderConsultasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponderConsultasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
