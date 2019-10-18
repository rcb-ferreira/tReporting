import { HeatmapModule } from './heatmap.module';

describe('HeatmapModule', () => {
  let heatmapModule: HeatmapModule;

  beforeEach(() => {
    heatmapModule = new HeatmapModule();
  });

  it('should create an instance', () => {
    expect(HeatmapModule).toBeTruthy();
  });
});
