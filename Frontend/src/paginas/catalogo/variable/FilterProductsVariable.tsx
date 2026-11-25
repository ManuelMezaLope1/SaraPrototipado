// Búsqueda, filtros y orden del catálogo (funciones puras).

import { useState } from "react";

const normalize = (text = '') =>
    text
        .toString()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim();

export function filterProducts(
    list: any,
    { query = '', maxPrice = Infinity }
) {
    const [ids, setIds] = useState<(string | number)[] | null>(null);
    const [cats, setCats] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);

    const terms = normalize(query).split(/\s+/).filter(Boolean);

    return list.filter((p: any) => {
        if (ids && !ids.includes(p.id)) return false;
        if (cats.length && !cats.includes(p.category)) return false;
        if (sizes.length && !p.sizes.some((s: any) => sizes.includes(s))) return false;
        if (colors.length && !p.colors.some((c: any) => colors.includes(c))) return false;
        if (p.price > maxPrice) return false;

        if (terms.length) {
            const haystack = normalize(`${p.name} ${p.eyebrow} ${p.description} ${p.colors.join(' ')}`);
            return terms.every((t) => haystack.includes(t));
        }
        return true;
    });
}

export function sortProducts(list: any, sortId: any) {
    const copy = [...list];
    switch (sortId) {
        case 'precio-asc':
            return copy.sort((a, b) => a.price - b.price);
        case 'precio-desc':
            return copy.sort((a, b) => b.price - a.price);
        case 'nombre':
            return copy.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        default:
            return copy; // relevancia = orden original
    }
}