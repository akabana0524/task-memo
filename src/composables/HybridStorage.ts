import { useRealtimeDatabase } from "./RealtimeDatabase";
import _ from "lodash";
import { useLocalStorage } from "./LocalStorage";
import { sync } from "./SyncObject";

export type HybridStorageValue = { [k: string]: any };
export function useHybridStorage(path: string, initialValue: HybridStorageValue) {
    const { value: localStorageValue } = useLocalStorage("hybrid_storage." + path, initialValue);
    const { value: realtimeDatabaseValue } = useRealtimeDatabase(path, initialValue);
    sync(localStorageValue, realtimeDatabaseValue, {inputAName: 'localStorageValue', inputBName: 'realtimeDatabaseValue'});
    return { value: localStorageValue };
}