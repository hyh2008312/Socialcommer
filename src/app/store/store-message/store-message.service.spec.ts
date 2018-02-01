import { TestBed, inject } from '@angular/core/testing';

import { StoreMessageService } from './store-message.service';

describe('StoreMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreMessageService]
    });
  });

  it('should be created', inject([StoreMessageService], (service: StoreMessageService) => {
    expect(service).toBeTruthy();
  }));
});
