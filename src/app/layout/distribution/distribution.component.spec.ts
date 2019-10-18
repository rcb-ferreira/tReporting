import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DistributionComponent } from './distribution.component';
import { DistributionModule } from './distribution.module';

describe('DistributionComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DistributionModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(DistributionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
