export function createCategory(name) {
    return { category: name, subcategories: [], id: `${Math.random()}-${Date.now}` };
}
