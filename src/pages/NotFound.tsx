import { Link } from 'react-router-dom'

// Página extra: rota não encontrada (404).
export function NotFound() {
  return (
    <div className="container container--estreito vazio">
      <h1>404 — Página não encontrada 🐾</h1>
      <p>O link que você tentou abrir não existe.</p>
      <Link to="/" className="botao">
        Voltar ao início
      </Link>
    </div>
  )
}
