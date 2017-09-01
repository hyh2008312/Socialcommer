import { TestBed, inject } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewsService]
    });
  });

  it('should be created', inject([ReviewsService], (service: ReviewsService) => {
    expect(service).toBeTruthy();
  }));
});
