import { objectDiffExtract } from './object-diff-extract';

describe('object-diff-extract', () => {
    test('diff', () => {
        var oldValue = { a: '1', b: '2', c: '3' };
        var value = { b: '2', c: '4', d: '5' };
        const result = objectDiffExtract(value, oldValue);
        expect(result.created).toEqual([{ key: 'd', value: '5' }]);
        expect(result.updated).toEqual([{ key: 'c', value: '4' }]);
        expect(result.deleted).toEqual([{ key: 'a', value: '1' }]);
    });
});