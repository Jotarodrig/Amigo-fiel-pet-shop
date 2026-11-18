import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { ItemCarrinho, Produto } from '../types'

interface CartContextValor {
  itens: ItemCarrinho[]
  totalItens: number
  totalPreco: number
  adicionar: (produto: Produto) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  remover: (id: number) => void
  limpar: () => void
}

const CartContext = createContext<CartContextValor | null>(null)

// useContext (provider): compartilha o carrinho com todo o app.
export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useLocalStorage<ItemCarrinho[]>('petshop:carrinho', [])

  const adicionar = useCallback(
    (produto: Produto) => {
      setItens((atual) => {
        const existente = atual.find((i) => i.produto.id === produto.id)
        if (existente) {
          return atual.map((i) =>
            i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
          )
        }
        return [...atual, { produto, quantidade: 1 }]
      })
    },
    [setItens],
  )

  const alterarQuantidade = useCallback(
    (id: number, quantidade: number) => {
      setItens((atual) =>
        quantidade <= 0
          ? atual.filter((i) => i.produto.id !== id)
          : atual.map((i) => (i.produto.id === id ? { ...i, quantidade } : i)),
      )
    },
    [setItens],
  )

  const remover = useCallback(
    (id: number) => setItens((atual) => atual.filter((i) => i.produto.id !== id)),
    [setItens],
  )

  const limpar = useCallback(() => setItens([]), [setItens])

  // useMemo: só recalcula os totais quando a lista de itens muda.
  const { totalItens, totalPreco } = useMemo(
    () => ({
      totalItens: itens.reduce((soma, i) => soma + i.quantidade, 0),
      totalPreco: itens.reduce((soma, i) => soma + i.quantidade * i.produto.preco, 0),
    }),
    [itens],
  )

  const valor = useMemo(
    () => ({ itens, totalItens, totalPreco, adicionar, alterarQuantidade, remover, limpar }),
    [itens, totalItens, totalPreco, adicionar, alterarQuantidade, remover, limpar],
  )

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>
}

// Hook de consumo: useContext.
// eslint-disable-next-line react-refresh/only-export-components
export function useCarrinho(): CartContextValor {
  const contexto = useContext(CartContext)
  if (!contexto) throw new Error('useCarrinho deve ser usado dentro de <CartProvider>.')
  return contexto
}
