
import { ShoppingBag } from 'lucide-react'
import { useCarrinho } from '../context/CartContext'
import type { Produto } from '../types'
import { formatarMoeda } from '../utils/formatar'

interface ProductCardProps {
  produto: Produto
}

export function ProductCard({ produto }: ProductCardProps) {
  const { adicionar } = useCarrinho()

  return (
    <article className="card produto">
      <div className="produto__imagem">
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
        />
      </div>

      <span className="tag">
        {produto.animal === 'cachorro' ? 'Cães' : 'Gatos'}
      </span>

      <h3>{produto.nome}</h3>

      <p className="produto__descricao">{produto.descricao}</p>

      <div className="produto__rodape">
        <strong>{formatarMoeda(produto.preco)}</strong>

        <button
          type="button"
          className="botao produto__adicionar"
          onClick={() => adicionar(produto)}
          aria-label={`Adicionar ${produto.nome} ao carrinho`}
        >
          <ShoppingBag size={17} />
          Adicionar
        </button>
      </div>
    </article>
  )
}
