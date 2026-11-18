
import { useCarrinho } from '../context/CartContext'
import type { ItemCarrinho } from '../types'
import { formatarMoeda } from '../utils/formatar'
import { Trash2, Minus, Plus } from 'lucide-react'

interface CartItemProps {
  item: ItemCarrinho
}

// Componente 10/14: item do carrinho com controle de quantidade.
export function CartItem({ item }: CartItemProps) {
  const { alterarQuantidade, remover } = useCarrinho()
  const { produto, quantidade } = item

  return (
    <li className="carrinho__item">
      <div className="carrinho__produto-imagem">
        <img
          src={produto.imagem}
          alt={produto.nome}
        />
      </div>

      <div className="carrinho__info">
        <strong>{produto.nome}</strong>
        <small>{formatarMoeda(produto.preco)} cada</small>
      </div>

      <div className="carrinho__quantidade">
        <button
          type="button"
          aria-label={`Diminuir quantidade de ${produto.nome}`}
          onClick={() => alterarQuantidade(produto.id, quantidade - 1)}
        >
          <Minus size={15} />
        </button>

        <span aria-live="polite">{quantidade}</span>

        <button
          type="button"
          aria-label={`Aumentar quantidade de ${produto.nome}`}
          onClick={() => alterarQuantidade(produto.id, quantidade + 1)}
        >
          <Plus size={15} />
        </button>
      </div>

      <strong className="carrinho__subtotal">
        {formatarMoeda(produto.preco * quantidade)}
      </strong>

      <button
        type="button"
        className="carrinho__remover"
        aria-label={`Remover ${produto.nome}`}
        onClick={() => remover(produto.id)}
      >
        <Trash2 size={19} />
      </button>
    </li>
  )
}
