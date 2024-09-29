export const lsParse = (key: string | undefined) =>
  key?.length ? JSON.parse(key) : "";
