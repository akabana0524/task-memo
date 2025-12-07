import { Ref, watch } from "vue"
import { objectDiffExtract } from "../lib/object-diff-extract";
import _ from "lodash";

export function syncOneWay(from: Ref<{ [k: string]: any }>, to: Ref<{ [k: string]: any }>, debug?: { fromName?: string, toName?: string }) {
    return watch(from, (value) => {
        const _toValue = _.cloneDeep(to.value);
        const diff = objectDiffExtract(value, _toValue);
        const debugPrefix = 'SyncObject syncOneWay ' + debug?.fromName + ' -> ' + debug?.toName;
        diff.created?.
            forEach(item => {
                console.debug(debugPrefix + ' create', item);
                to.value[item.key] = item.value;
            });
        diff.updated?.
            forEach(item => {
                console.debug(debugPrefix + ' update', item);
                to.value[item.key] = item.value;
            });
        diff.deleted?.
            forEach(item => {
                console.debug(debugPrefix + ' delete', item);
                delete to.value[item.key];
            });
    }, { deep: true });
}
export function sync(inputA: Ref<{ [k: string]: any }>, inputB: Ref<{ [k: string]: any }>, debug?: { inputAName?: string, inputBName?: string }) {
    // A to B
    const unwatchAtoB = syncOneWay(inputA, inputB, {fromName:debug?.inputAName, toName: debug?.inputBName});
    // B to A
    const unwatchBtoA = syncOneWay(inputB, inputA, {fromName:debug?.inputBName, toName: debug?.inputAName});
    return () => {
        unwatchAtoB();
        unwatchBtoA();
    }
}