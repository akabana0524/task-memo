import _ from "lodash";
import { ref, watch } from "vue";

export type LocalStorageValue = { [k: string]: any };
export function useLocalStorage(path: string, initialValue: LocalStorageValue) {
    const loadValue = localStorage.getItem(path);
    const value = ref<LocalStorageValue>(loadValue ? JSON.parse(loadValue) as LocalStorageValue : initialValue);
    watch(value, (newValue) => {
        const _value = _.cloneDeep(newValue);
        console.debug('LocalStorage save', _value);
        localStorage.setItem(path, JSON.stringify(_value));
    }, { deep: true });
    return { value };
}