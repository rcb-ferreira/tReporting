import { DistributionModule } from './distribution.module';

describe('DistributionModule', () => {
  let distributionModule: DistributionModule;

  beforeEach(() => {
    distributionModule = new DistributionModule();
  });

  it('should create an instance', () => {
    expect(DistributionModule).toBeTruthy();
  });
});
