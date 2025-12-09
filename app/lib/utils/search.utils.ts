/**
 * Utilitaires pour la recherche et le filtrage
 */

/**
 * Filtre un tableau d'objets selon une recherche textuelle
 */
export function filterBySearch<T extends Record<string, unknown>>(
  items: T[],
  searchTerm: string,
  searchKeys: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) return items;

  const lowerSearch = searchTerm.toLowerCase();
  
  return items.filter(item => 
    searchKeys.some(key => {
      const value = item[key];
      return value && String(value).toLowerCase().includes(lowerSearch);
    })
  );
}

/**
 * Filtre une liste de chaînes selon une recherche
 */
export function filterStringList(items: string[], searchTerm: string): string[] {
  if (!searchTerm.trim()) return items;
  
  const lowerSearch = searchTerm.toLowerCase();
  return items.filter(item => item.toLowerCase().includes(lowerSearch));
}
