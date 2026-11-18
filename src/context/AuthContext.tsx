import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Usuario } from '../types'

interface AuthContextValor {
  usuario: Usuario | null
  entrar: (usuario: Usuario) => void
  sair: () => void
}

const AuthContext = createContext<AuthContextValor | null>(null)

// Login simulado (sem backend): guarda o usuário no localStorage.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useLocalStorage<Usuario | null>('petshop:usuario', null)

  const entrar = useCallback((u: Usuario) => setUsuario(u), [setUsuario])
  const sair = useCallback(() => setUsuario(null), [setUsuario])

  const valor = useMemo(() => ({ usuario, entrar, sair }), [usuario, entrar, sair])

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValor {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth deve ser usado dentro de <AuthProvider>.')
  return contexto
}
