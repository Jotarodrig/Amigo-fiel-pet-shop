
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'

interface HeroProps {
  titulo: string
  subtitulo: string
}

export function Hero({ titulo, subtitulo }: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero__interno">
        <div className="hero__texto">
          <h1>{titulo}</h1>
          <p>{subtitulo}</p>

          <div className="hero__acoes">
            <Link to="/produtos" className="botao">
              <ShoppingBag size={18} />
              Ver produtos
            </Link>

            <Link to="/racas" className="botao botao--contorno">
              <Heart size={18} />
              Conhecer raças
            </Link>
          </div>
        </div>

        <div className="hero__imagem">
          <img
            src="/images/banner-cao-gato.png"
            alt="Cães e gatos da loja Amigo Fiel"
          />
        </div>
      </div>
    </section>
  )
}
