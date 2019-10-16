import { CallModule } from './call.module';

describe('CallModule', () => {
  let callModule: CallModule;

  beforeEach(() => {
    callModule = new CallModule();
  });

  it('should create an instance', () => {
    expect(CallModule).toBeTruthy();
  });
});
