export const deleteUndefined = (obj: { [key: string]: unknown }) => {
  const newObj = { ...obj };

  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === undefined) delete newObj[key];
  });

  return newObj;
};
