import _ from "lodash";

export type DiffType = 'CREATE' | 'DELETE' | 'UPDATE';
export interface Diff {
    created?: {
        key: string;
        value: any;
    }[];
    updated?: {
        key: string;
        value: any;
    }[];
    deleted?: {
        key: string;
        value: any;
    }[];
}

export function objectDiffExtract(value: { [k: string]: any }, oldValue: { [k: string]: any }): Diff {
    if(!value) {
        throw Error('value not null');
    }
    if(!oldValue) {
        throw Error('oldValue not null');
    }
    var valueKeys = Object.keys(value);
    var oldValueKeys = Object.keys(oldValue);
    var created = valueKeys.filter(key => !oldValueKeys.includes(key)).map(key => ({ key, value: value[key] }));
    var deleted = oldValueKeys.filter(key => !valueKeys.includes(key)).map(key => ({key, value:oldValue[key]}));
    var updated = valueKeys.filter(key => oldValueKeys.includes(key)).filter(key => {
        var item = value[key] as any;
        var oldItem = oldValue[key];
        return !_.eq(item, oldItem);
    }).map(key => ({ key, value: value[key] }));
    return {
        created: created.length > 0 ? created: undefined,
        updated: updated.length > 0 ? updated: undefined,
        deleted: deleted.length > 0 ? deleted: undefined
    };
}