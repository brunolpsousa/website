export const lsParse = (key: string | undefined | null): string =>
  key?.length ? JSON.parse(key) : '';
