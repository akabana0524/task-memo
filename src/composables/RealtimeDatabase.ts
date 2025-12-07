import { nextTick, ref, watch } from 'vue';
import { getDatabase, ref as dbRef, set as dbSet, remove as dbRemove, onValue } from "firebase/database";
import _ from 'lodash';
import { syncOneWay } from './SyncObject';
import { objectDiffExtract } from '../lib/object-diff-extract';

const db = getDatabase();
export type RealtimeDatabaseValue = { [k: string]: any };
export function useRealtimeDatabase(path: string, initialValue: RealtimeDatabaseValue) {
    console.debug('RealtimeDatabase use', { path, initialValue });
    async function update(key: string, value: any) {
        const refPath = path + "/" + key;
        console.debug('RealtimeDatabaseValue update', { refPath, value });
        return await dbSet(dbRef(db, refPath), value);
    }

    async function remove(key: string) {
        const refPath = path + "/" + key;
        console.debug('RealtimeDatabaseValue remove', { refPath });
        return await dbRemove(dbRef(db, refPath));
    }

    const onMemoryRef = ref<RealtimeDatabaseValue>(_.cloneDeep(initialValue));
    const onMemoryRefOld = ref<RealtimeDatabaseValue>({});
    const realtimeDatabaseRef = ref<RealtimeDatabaseValue>({});
    const unsyncOnMemoryRef = syncOneWay(realtimeDatabaseRef, onMemoryRef, {fromName: 'realtimeDatabaseRef', toName: 'onMemoryRef'});
    const unsyncOnMemoryRefOld = syncOneWay(realtimeDatabaseRef, onMemoryRefOld, {fromName: 'realtimeDatabaseRef', toName: 'onMemoryRefOld'});

    var _dbRef = dbRef(db, path);
    // ダウンロード
    onValue(_dbRef, (snapshot) => {
        const snapshotVal = _.cloneDeep(snapshot.val() || {});
        console.debug('RealtimeDatabase realtimeDatabaseRef load', { snapshotVal });
        onMemoryRefOld.value = snapshotVal;
        realtimeDatabaseRef.value = snapshotVal;
    });

    // アップロード
    watch(onMemoryRef, (value) => {
        const _value = _.cloneDeep(value);
        const _oldValue = _.cloneDeep(onMemoryRefOld.value);
        const { created, updated, deleted } = objectDiffExtract(_value, _oldValue);
        console.debug('RealtimeDatabase diff check', { _value, _oldValue, created, updated, deleted });
        created?.forEach(item => update(item.key, item.value));
        updated?.forEach(item => update(item.key, item.value));
        deleted?.forEach(item => remove(item.key));
        nextTick().then(() => {
            onMemoryRefOld.value = _value;
        });
    }, { deep: true });
    return {
        value: onMemoryRef,
        unsync: () => { unsyncOnMemoryRef(); unsyncOnMemoryRefOld(); }
    };
}