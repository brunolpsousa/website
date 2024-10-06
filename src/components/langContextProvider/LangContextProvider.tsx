import { langProvider } from '@utils';
import { createContext } from 'react';

export const LangContext = createContext<boolean>(false);

export default function LangContextComponent({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { isEn } = langProvider();
  return <LangContext.Provider value={isEn}>{children}</LangContext.Provider>;
}
