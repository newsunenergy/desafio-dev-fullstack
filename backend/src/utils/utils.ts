export const Moth = <T extends string>(
  field: T,
  limit: number = 12,
): { orderBy: { [key in T]: 'desc' }; take: number } => {
  if (typeof field !== 'string' || field.trim() === '') {
    throw new Error('Field must be a non-empty string.');
  }

  if (typeof limit !== 'number' || limit <= 0) {
    throw new Error('Limit must be a positive number.');
  }

  return {
    orderBy: { [field]: 'desc' } as { [key in T]: 'desc' },
    take: limit,
  };
};
