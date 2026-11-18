import { Link } from 'react-router-dom'
import { DogDoDia } from '../components/DogDoDia'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { produtos } from '../data/produtos'

// Página 1/6: Home. Combina o Hero, destaques do catálogo e uma foto da API Dog CEO.
const destaques = produtos.slice(0, 4)

export function Home() {
  return (
    <>
      <Hero
        titulo="Tudo para o seu melhor amigo"
        subtitulo="Rações, brinquedos, acessórios e higiene para cães e gatos, com entrega para todo o Brasil."
      />

      <div className="container">
        <section className="secao">
          <div className="secao__cabecalho">
            <h2>Destaques da semana</h2>
            <Link to="/produtos">Ver todos →</Link>
          </div>
          <div className="grade">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </section>

        <section className="secao">
          <DogDoDia />
        </section>
      </div>
    </>
  )
}
