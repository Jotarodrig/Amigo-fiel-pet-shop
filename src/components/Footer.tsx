import { Link } from 'react-router-dom'

// Ano calculado uma única vez, fora do componente.
const ANO_ATUAL = new Date().getFullYear()

// Componente 4/14: rodapé do site.
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__interno">
        <p>🐾 Amigo Fiel Pet Shop — projeto acadêmico de Front-end Frameworks.</p>
        <nav className="footer__links">
          <Link to="/produtos">Produtos</Link>
          <Link to="/racas">Raças</Link>
          <Link to="/contato">Contato</Link>
        </nav>
        <small>© {ANO_ATUAL} Todos os direitos reservados (loja fictícia).</small>
      </div>
    </footer>
  )
}
