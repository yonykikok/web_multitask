import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToSellCardComponent } from './product-to-sell-card.component';

describe('ProductToSellCardComponent', () => {
  let component: ProductToSellCardComponent;
  let fixture: ComponentFixture<ProductToSellCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductToSellCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToSellCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
