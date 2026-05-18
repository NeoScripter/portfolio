const BASE_URL = 'https://ilyaandreev.dev/api';

const cache = new Map<string, string[]>();

async function fetchEntries<
    T extends { data: { id: string; attr: { slug: string } }[] },
>(model: string): Promise<T> {
    const res = await fetch(`${BASE_URL}/${model}`);
    if (!res.ok) throw new Error(`Failed to fetch ${model}: ${res.status}`);

    const json: T = await res.json();

    return json;
}

export async function getSlugs(model: string): Promise<string[]> {
    if (cache.has(model)) return cache.get(model)!;

    const json = await fetchEntries(model);

    const slugs = json.data.map((item) => item.attr.slug);

    cache.set(model, slugs);

    return slugs;
}

export async function getIds(model: string): Promise<string[]> {
    if (cache.has(model)) return cache.get(model)!;

    const json = await fetchEntries(model);

    const id = json.data.map((item) => item.id);

    cache.set(model, id);

    return id;
}

