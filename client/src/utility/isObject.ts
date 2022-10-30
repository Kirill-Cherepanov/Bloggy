export const isObject = (item: unknown): item is Record<string, unknown> => {
  return !!item && typeof item === 'object' && !Array.isArray(item);
};
