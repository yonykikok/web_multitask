import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryWrapComponent } from './story-wrap.component';

describe('StoryWrapComponent', () => {
  let component: StoryWrapComponent;
  let fixture: ComponentFixture<StoryWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
