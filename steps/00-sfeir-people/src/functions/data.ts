type CleanObject<T> = {
  [K in keyof T]: T[K] extends object ? CleanObject<T[K]> : T[K];
};

export const cleanObject = <T extends Record<string, any>>(obj: T): CleanObject<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key as keyof T] = typeof value === 'object' ? cleanObject(value) : value;
    }
    return acc;
  }, {} as CleanObject<T>);
};
