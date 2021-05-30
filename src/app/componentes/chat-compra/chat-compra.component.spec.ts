import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCompraComponent } from './chat-compra.component';

describe('ChatCompraComponent', () => {
  let component: ChatCompraComponent;
  let fixture: ComponentFixture<ChatCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
