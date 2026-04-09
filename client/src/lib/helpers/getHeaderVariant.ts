export type VariantType = 'primary' | 'secondary' | 'ghost';

const variantMap = new Map<VariantType, string[]>([
    ['primary', ['']],
    ['secondary', ['about']],
    ['ghost', ['portfolio', 'project']],
]);

export default function getHeaderVariant(path: string) {
    for (const [key, val] of variantMap) {
        if (val.some((route) => path.includes(route))) {
            return key;
        }
    }

    return 'ghost';
}
