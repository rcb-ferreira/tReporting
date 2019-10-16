import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CallComponent } from './call.component';
import { CallModule } from './call.module';

describe('CallComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CallModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CallComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
