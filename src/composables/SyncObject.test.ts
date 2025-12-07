import { nextTick, ref } from "vue";
import { sync } from "./SyncObject";

describe('SyncObject', ()=> {
    test('sync', async () => {
        var inputA = ref<{[k:string]: any}>({});
        var inputB = ref<{[k:string]: any}>({});
        sync(inputA, inputB);

        console.log('A to B add');
        inputA.value['a'] = '1';
        await nextTick();
        expect(inputB.value).toEqual({'a': '1'});

        console.log('B to A add');
        inputB.value['b'] = '2';
        await nextTick();
        expect(inputA.value).toEqual({'a': '1', 'b': '2'});

        // A to B update
        inputA.value['a'] = '3';
        await nextTick();
        expect(inputB.value).toEqual({'a': '3', 'b': '2'});

        // B to A update
        inputB.value['b'] = '4';
        await nextTick();
        expect(inputA.value).toEqual({'a': '3', 'b': '4'});

        // A to B remove
        delete inputA.value['a'];
        await nextTick();
        expect(inputB.value).toEqual({'b': '4'});

        // B to A remove
        delete inputB.value['b'];
        await nextTick();
        expect(inputA.value).toEqual({});

        // cross same frame
        inputA.value['c'] = '5';
        inputB.value['d'] = '6';
        await nextTick();
        expect(inputA.value).toEqual({'c': '5'});
        expect(inputB.value).toEqual({'c': '5'});
    });
});