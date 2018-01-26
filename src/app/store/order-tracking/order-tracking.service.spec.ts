import { TestBed, inject } from '@angular/core/testing';

import { OrderTrackingService } from './order-tracking.service';

describe('OrderTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderTrackingService]
    });
  });

  it('should be created', inject([OrderTrackingService], (service: OrderTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
