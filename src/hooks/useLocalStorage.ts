import { useEffect, useState } from 'react'

// CUSTOM HOOK: igual ao useState, mas guarda o valor no localStorage,
// assim o carrinho e o login continuam após recarregar a página.
export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo ? (JSON.parse(salvo) as T) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // Se o armazenamento estiver bloqueado, o app continua funcionando em memória.
    }
  }, [chave, valor])

  return [valor, setValor] as const
}
