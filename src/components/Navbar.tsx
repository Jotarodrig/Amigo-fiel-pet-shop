
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  PawPrint,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCarrinho } from '../context/CartContext'

const links = [
  { para: '/', rotulo: 'Início' },
  { para: '/produtos', rotulo: 'Produtos' },
  { para: '/racas', rotulo: 'Raças' },
  { para: '/contato', rotulo: 'Contato' },
]

export function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)

  const [temaEscuro, setTemaEscuro] = useState(
    () => localStorage.getItem('amigo-fiel-tema') === 'escuro'
  )

  const { totalItens } = useCarrinho()
  const { usuario, sair } = useAuth()

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-tema',
      temaEscuro ? 'escuro' : 'claro'
    )

    localStorage.setItem(
      'amigo-fiel-tema',
      temaEscuro ? 'escuro' : 'claro'
    )
  }, [temaEscuro])

  const fecharMenu = () => setMenuAberto(false)

  const alternarTema = () => {
    setTemaEscuro((temaAtual) => !temaAtual)
  }

  return (
    <header className="navbar">
      <div className="container navbar__interno">
        <Link to="/" className="navbar__logo" onClick={fecharMenu}>
          <PawPrint size={26} strokeWidth={2.5} />
          <span>Amigo Fiel</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuAberto}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`navbar__menu ${menuAberto ? 'navbar__menu--aberto' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              end={link.para === '/'}
              onClick={fecharMenu}
              className={({ isActive }) => (isActive ? 'ativo' : undefined)}
            >
              {link.rotulo}
            </NavLink>
          ))}

          <NavLink
            to="/carrinho"
            onClick={fecharMenu}
            className="navbar__carrinho"
          >
            <ShoppingCart size={19} />
            <span>Carrinho</span>
            <span className="badge">{totalItens}</span>
          </NavLink>

          <button
            type="button"
            className="navbar__tema"
            onClick={alternarTema}
            aria-label={temaEscuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={temaEscuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {temaEscuro ? <Sun size={20} /> : <Moon size={20} />}
            <span>{temaEscuro ? 'Tema claro' : 'Tema escuro'}</span>
          </button>

          {usuario ? (
            <button
              type="button"
              className="botao botao--contorno"
              onClick={() => {
                sair()
                fecharMenu()
              }}
            >
              Sair ({usuario.nome.split(' ')[0]})
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={fecharMenu}
              className="botao botao--contorno"
            >
              Entrar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
