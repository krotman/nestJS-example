interface WithNames {
    names: { [index: string]: string };
}

export function allNames(parented: string, item: WithNames): string[];
export function allNames(item: WithNames): string[];
export function allNames(item: WithNames | string, child?: WithNames) {
    if (typeof item === 'string') {
        if (!child) {
            return [];
        }
        return Object.values(child.names).map(x => `${item}.${x}`);
    } else {
        return Object.values(item.names);
    }
}

export function normalizeString(str: string) {
    return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
}
