import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartItem } from '../components/CartItem'
import { useAuth } from '../context/AuthContext'
import { useCarrinho } from '../context/CartContext'
import { formatarMoeda } from '../utils/formatar'

// Página 4/6: carrinho. Os dados vêm do CartContext (useContext).
export function Carrinho() {
  const { itens, totalPreco, limpar } = useCarrinho()
  const { usuario } = useAuth()
  const navegar = useNavigate()
  const [finalizado, setFinalizado] = useState(false)

  const finalizar = () => {
    if (!usuario) {
      navegar('/login')
      return
    }
    limpar()
    setFinalizado(true)
  }

  if (finalizado) {
    return (
      <div className="container">
        <p className="sucesso" role="status">
          🎉 Pedido realizado, {usuario?.nome}! Obrigado pela compra (simulação).
        </p>
        <Link to="/produtos" className="botao">
          Continuar comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Seu carrinho</h1>

      {itens.length === 0 ? (
        <p className="vazio">
          Seu carrinho está vazio. <Link to="/produtos">Ver produtos</Link>
        </p>
      ) : (
        <>
          <ul className="carrinho">
            {itens.map((item) => (
              <CartItem key={item.produto.id} item={item} />
            ))}
          </ul>

          <div className="carrinho__resumo">
            <p>
              Total: <strong>{formatarMoeda(totalPreco)}</strong>
            </p>
            {!usuario && <small>Faça login para finalizar a compra.</small>}
            <div className="carrinho__acoes">
              <button type="button" className="botao botao--contorno" onClick={limpar}>
                Esvaziar
              </button>
              <button type="button" className="botao" onClick={finalizar}>
                {usuario ? 'Finalizar compra' : 'Entrar para finalizar'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
