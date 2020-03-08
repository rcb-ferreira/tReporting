import { TrmDate } from './trm-date.pipe';

describe('Pipe: TRM Date', () => {
    let pipe: TrmDate;

    beforeEach(() => {
        pipe = new TrmDate();
    });

    it('should split string and return the first index of the array', () => {
        expect(pipe.transform('2018-12-03 18:44:05+00')).toBe('2018-12-03 18:44:05');
    });

    it('should return the string as it is', () => {
        expect(pipe.transform('2018-12-03 18:44:05+00')).toBe('2018-12-03 18:44:05');
    });
});
