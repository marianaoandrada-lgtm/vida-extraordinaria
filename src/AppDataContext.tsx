import { createContext, useContext, type ReactNode } from 'react';
import { useAppData } from './useAppData';

// Contexto único porque a Store precisa ser a MESMA instância em toda a árvore —
// o FAB (em App.tsx) e a tela Hoje escrevem/leem os mesmos dados.
type AppDataValue = ReturnType<typeof useAppData>;

const AppDataContext = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const value = useAppData();
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppDataContext() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppDataContext deve ser usado dentro de <AppDataProvider>');
  return ctx;
}
