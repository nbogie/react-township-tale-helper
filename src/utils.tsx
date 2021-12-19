import { useState } from "react";

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}


export function useCycler(arr: string[]) {
    const [nextFn,] = useState(() => genCycler(arr))
    return nextFn;
}

//TODO: use a generator fn instead. delegate to the arr.
function genCycler(arr: string[]): () => string {
    let ix = 0;

    function next() {
        const result = arr[ix];
        ix++;
        if (ix >= arr.length) {
            ix = 0;
        }
        return result;
    }
    return next;
}
