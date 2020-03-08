import { SecToMinPipe } from './sec-to-min.pipe';

describe('Pipe: Seconds to minutes', () => {
    let pipe: SecToMinPipe;

    beforeEach(() => {
        pipe = new SecToMinPipe();
    });

    it('it should covert string to number', () => {
        expect(pipe.transform('300')).toBe('05:00');
    });

    it('it should concatinate minutes and seconds with 0', () => {
        expect(pipe.transform(61)).toBe('01:01');
    });

    it('it should show hour', () => {
        expect(pipe.transform(3600)).toBe('01:00:00');
    });

    it('it shouldn\'t show hour', () => {
        expect(pipe.transform(3599  )).toBe('59:59');
    });
});
