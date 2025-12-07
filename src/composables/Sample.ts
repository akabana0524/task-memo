import { useHybridStorage } from './HybridStorage';

export function useSample() {
    const { value } = useHybridStorage('sample', {});
    function addSample() {
        const key = crypto.randomUUID();
        const v = Math.random();
        console.debug('add sample', { key, v });
        value.value[key] = v;
    }
    return { value, addSample };
}