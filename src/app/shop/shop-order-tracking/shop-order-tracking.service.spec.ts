import { TestBed, inject } from '@angular/core/testing';

import { ShopOrderTrackingService } from './shop-order-tracking.service';

describe('ShopOrderTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopOrderTrackingService]
    });
  });

  it('should be created', inject([ShopOrderTrackingService], (service: ShopOrderTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
