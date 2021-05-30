import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToSellRowComponent } from './product-to-sell-row.component';

describe('ProductToSellRowComponent', () => {
  let component: ProductToSellRowComponent;
  let fixture: ComponentFixture<ProductToSellRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductToSellRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToSellRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
