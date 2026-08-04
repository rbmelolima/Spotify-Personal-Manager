export const chunk = <T>(items: T[], size: number): T[][] => {
  if (!Number.isInteger(size) || size < 1) throw new Error('O tamanho do lote deve ser positivo.');
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, (index + 1) * size),
  );
};

export const unique = <T>(items: T[]): T[] => [...new Set(items)];
