import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPermutaComponent } from './chat-permuta.component';

describe('ChatPermutaComponent', () => {
  let component: ChatPermutaComponent;
  let fixture: ComponentFixture<ChatPermutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPermutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPermutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
