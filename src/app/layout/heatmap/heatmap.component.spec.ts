import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeatmapComponent } from './heatmap.component';
import { HeatmapModule } from './heatmap.module';

describe('HeatmapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HeatmapModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HeatmapComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
