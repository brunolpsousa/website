export const lsParse = (key: string | undefined): string =>
  key?.length ? JSON.parse(key) : '';
